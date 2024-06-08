import axios, { HttpStatusCode } from "axios";
import { ChangeEvent, useState } from "react";

const ShorttoLong = () => {
  const [shorturl, setShortUrl] = useState("");
  const [originalUrl, setOriginalUrl] = useState("");
  const [error, seterror] = useState<string>("");

  const baseURL = "http://localhost:3000/v1/shorturl";

  async function GenerateOriginalURL() {
    const url = shorturl.split("/").slice(-1);
    const response = await axios.post(`${baseURL}/${url}`);
    if (response.status === 203) {
      seterror("Short URL not found");
      setOriginalUrl("");
    } else {
      seterror("");
      setOriginalUrl(response.data.longurl);
    }
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
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setShortUrl(e.target.value);
            setOriginalUrl("");
          }}
        />
        <button onClick={GenerateOriginalURL}>Generate</button>

        <input type="text" value={originalUrl} contentEditable={false} />
        <p>{error}</p>
      </div>
    </>
  );
};

export default ShorttoLong;
