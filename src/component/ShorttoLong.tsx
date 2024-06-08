import axios from "axios";
import { ChangeEvent, useState } from "react";

const ShorttoLong = () => {
  const [shorturl, setShortUrl] = useState("");
  const [originalUrl, setOriginalUrl] = useState("");

  const baseURL = "http://localhost:3000/v1/shorturl";

  async function GenerateOriginalURL() {
    const shortURL = await axios
      .post(`${baseURL}/${shorturl}`)
      .then((response) => {
        return response.data.shorturl;
      });
    setOriginalUrl(shortURL);
  }

  return (
    <>
      <div>
        <label htmlFor="longurl">Enter your short URL</label>
        <input
          type="text"
          name="shorturl"
          id="shorturl"
          value={shorturl}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setShortUrl(e.target.value)
          }
        />
        <button onClick={GenerateOriginalURL}>Generate</button>

        <input type="text" value={originalUrl} contentEditable={false} />
      </div>
    </>
  );
};

export default ShorttoLong;
