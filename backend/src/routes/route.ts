import express, { Express, Request, Response, Router } from "express";
import { v4 as uuidv4 } from "uuid";
import urldb from "../module/database";
import encodeBase62 from "../util/base62";

import { QueryError, RowDataPacket } from "mysql2";
import { HttpStatusCode } from "axios";
type urlFuncType = {
  generateUUID: () => number;
};

type DB = RowDataPacket & {
  id: number;
  longurl: string;
  shorturl: string;
};

type Queries = {
  checkLongURL: string;
  addLongURL: string;
  findlongurl: string;
};

const DBqueries: Queries = {
  checkLongURL: `select * from urltable where longurl = ?`,
  addLongURL: `insert into urltable (id , longurl , shorturl) values (? , ? , ?)`,
  findlongurl: `select longurl from urltable where shorturl = ?`,
};

const UUIDFunction: urlFuncType = {
  generateUUID() {
    const timestamp = Date.now(); // Get current timestamp in milliseconds
    const randomNum = Math.floor(Math.random() * 1000); // Generate a random number between 0 and 999
    return Number(`${timestamp}${randomNum}`); // Combine timestamp and random number
  },
};
const urlrouter: Router = express.Router();

urlrouter.post("/v1/longurl/:url", (req: Request, res: Response) => {
  try {
    if (!req.params.url) {
      new Error("Please enter your url");
    }
    const longurl = req.params.url;
    urldb.execute<DB[]>(
      DBqueries.checkLongURL,
      [longurl],
      (error, result: DB[]) => {
        if (error) {
          console.log(error);
        }
        console.log(result);
        if (result.length > 0 && result) {
          res
            .status(202)
            .json({ shorturl: `https://www.short.com/${result[0].shorturl}` });
        } else {
          const UUID = UUIDFunction.generateUUID();
          const shorturl = encodeBase62(UUID);

          urldb.query(
            DBqueries.addLongURL,
            [UUID, longurl, shorturl],
            (error, resolve) => {
              if (error) {
                console.log(error);
              }
              if (resolve) {
                res
                  .status(201)
                  .json({ shorturl: `https://www.short.com/${shorturl}` });
              }
            }
          );
        }
      }
    );
  } catch (error) {
    res.send(error);
  }
});

urlrouter.post("/v1/shorturl/:url", async (req: Request, res: Response) => {
  try {
    if (!req.params.url) {
      new Error("Please enter your url");
    }
    const shorturl = req.params.url;
    console.log(shorturl);
    urldb.query<DB[]>(DBqueries.findlongurl, [shorturl], (error, resolve) => {
      if (error) {
        res.send(error);
      }

      if (resolve.length > 0 && resolve) {
        res.status(201).json({ longurl: resolve[0].longurl });
      } else {
        res.status(203).json({ message: "No URL matches" });
      }
    });
  } catch (error) {
    res.send(error);
  }
});

export default urlrouter;
