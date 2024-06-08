import express, { Express, Request, Response, Router } from "express";
import { v4 as uuidv4 } from "uuid";
import urldb from "../module/database";
import encodeBase62 from "../util/base62";
import UUIDFunction from "../util/UUID";
import DBqueries from "../module/queries";
import { DB } from "../types/route_type";
const urlrouter: Router = express.Router();
type DBtype = DB.DBquery;

urlrouter.post("/v1/longurl/:url", (req: Request, res: Response) => {
  try {
    if (!req.params.url) {
      new Error("Please enter your url");
    }
    const longurl = req.params.url;
    urldb.execute<DBtype[]>(
      DBqueries.checkLongURL,
      [longurl],
      (error, result: DBtype[]) => {
        if (error) {
          res.status(203).json({ message: error });
        }
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
                res.status(203).json({ message: error });
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
    res.status(203).json({ message: error });
  }
});

urlrouter.post("/v1/shorturl/:url", async (req: Request, res: Response) => {
  try {
    if (!req.params.url) {
      new Error("Please enter your url");
    }
    const shorturl = req.params.url;
    console.log(shorturl);
    urldb.query<DBtype[]>(
      DBqueries.findlongurl,
      [shorturl],
      (error, resolve) => {
        if (error) {
          res.send(error);
        }

        if (resolve.length > 0 && resolve) {
          res.status(201).json({ longurl: resolve[0].longurl });
        } else {
          res.status(203).json({ message: "No URL matches" });
        }
      }
    );
  } catch (error) {
    res.send(error);
  }
});

export default urlrouter;
