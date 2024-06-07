import express, { Express, Request, Response, Router } from "express";

const urlrouter: Router = express.Router();

urlrouter.post("/v1/longurl/:url", (req: Request, res: Response) => {
  try {
    if (!req.params.url) {
      new Error("Please enter your url");
    }
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
