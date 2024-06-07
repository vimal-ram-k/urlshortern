import express, { Express, Request, Response, Router } from "express";
import { v4 as uuidv4 } from "uuid";
import urldb from "../module/database";

const urlrouter: Router = express.Router();

function generateUUID() {
  const UUID = uuidv4().split("-")[0];
  return UUID;
}

urlrouter.post("/v1/longurl/:url", (req: Request, res: Response) => {
  try {
    if (!req.params.url) {
      new Error("Please enter your url");
    }

    const query = "select * from urltable";
    urldb.query(query, (error, result) => {
      if (error) {
        console.log(error);
      }
      console.log(result);
    });

    const longurl = req.params.url;
    console.log(longurl);
    res.send("Received");
  } catch (error) {
    res.send(error);
  }
});

urlrouter.post("/v1/shorturl/:url", (req: Request, res: Response) => {
  try {
    if (!req.params.url) {
      new Error("Please enter your url");
    }
    const shorturl = req.params.url;
    console.log(shorturl);
    res.send("Received");
  } catch (error) {
    res.send(error);
  }
});

export default urlrouter;
