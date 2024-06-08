import axios from "axios";
import { ChangeEvent, useState } from "react";
const ShorttoLong = () => {
  const [shorturl, setShortUrl] = useState("");
  const [originalUrl, setOriginalUrl] = useState("");

  const baseURL = "http://localhost:3000/v1/shorturl";

  async function GenerateOriginalURL() {
    const url = shorturl.split("/").slice(-1);
    const longurl = await axios.post(`${baseURL}/${url}`).then((response) => {
      return response.data.longurl;
    });
    setOriginalUrl(longurl);
  }

  function copyURL() {
    navigator.clipboard.writeText(originalUrl).then(() => {
      const btn = document.getElementById("copy-btn");
      if (btn) {
        btn.innerText = "Copied!";
      }
    });
  }

  function RedirectToURL() {
    window.location.href = `https://${originalUrl}`;
  }

  return (
    <>
      <div
        className=" d-flex flex-column"
        style={{ width: "300px", margin: "auto" }}
      >
        <label
          htmlFor="longurl"
          className=" text-white"
          style={{ fontSize: "1.2rem" }}
        >
          Enter your short URL
        </label>
        <input
          className=" my-2 rounded-3"
          style={{ height: "50px" }}
          type="text"
          name="shorturl"
          id="shorturl"
          value={shorturl}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setShortUrl(e.target.value)
          }
        />
        <button
          className=" text-white bg-success rounded-3 my-2"
          style={{ width: "200px", height: "50px", fontSize: "1.3rem" }}
          onClick={GenerateOriginalURL}
        >
          Generate
        </button>

        <input
          type="text"
          style={{ height: "50px" }}
          className=" my-2"
          id="originalUrl"
          value={originalUrl}
          contentEditable={false}
        />

        <button
          id="copy-btn"
          onClick={copyURL}
          className=" text-white bg-danger rounded-3 my-2"
          style={{ width: "200px", height: "50px", fontSize: "1.3rem" }}
        >
          Copy
        </button>
        <button
          onClick={RedirectToURL}
          className=" text-white bg-info rounded-3 my-2"
          style={{ width: "200px", height: "50px", fontSize: "1.3rem" }}
        >
          Open
        </button>
      </div>
    </>
  );
};

export default ShorttoLong;
