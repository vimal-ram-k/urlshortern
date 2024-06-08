import axios from "axios";
import { ChangeEvent, useState } from "react";

const LongtoShort = () => {
  const baseURL = "http://localhost:3000/v1/longurl";
  const [longurl, setLongURL] = useState("");
  const [shorturl, setShortURL] = useState("");

  async function GenerateShortURL() {
    const shortURL = await axios
      .post(`${baseURL}/${longurl}`)
      .then((response) => {
        return response.data.shorturl;
      });
    setShortURL(shortURL);
  }

  function copyURL() {
    navigator.clipboard.writeText(shorturl).then(() => {
      const btn = document.getElementById("copy-btn2");
      if (btn) {
        btn.innerText = "Copied!";
      }
    });
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
          Enter your Orginal URL
        </label>
        <input
          type="text"
          className=" my-2 rounded-3"
          name="longurl"
          id="longurl"
          style={{ height: "50px" }}
          value={longurl}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setLongURL(e.target.value)
          }
        />
        <button
          onClick={GenerateShortURL}
          className=" text-warning bg-success rounded-3 my-2"
          style={{ width: "200px", height: "50px", fontSize: "1.3rem" }}
        >
          Generate URL
        </button>

        <input
          type="text"
          className=" my-2"
          value={shorturl}
          style={{ height: "50px" }}
          contentEditable={false}
        />

        <button
          id="copy-btn2"
          className=" text-white bg-danger rounded-3 my-2"
          style={{ width: "200px", height: "50px", fontSize: "1.3rem" }}
          onClick={copyURL}
        >
          Copy
        </button>
      </div>
    </>
  );
};

export default LongtoShort;
