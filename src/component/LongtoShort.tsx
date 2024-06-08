import axios from "axios";
import { ChangeEvent, useState } from "react";

const LongtoShort = () => {
  const baseURL = "http://localhost:3000/v1/longurl";
  const [longurl, setLongURL] = useState("");
  const [shorturl, setShortURL] = useState("");

  async function GenerateShortURL() {
    const shortURL = await axios
      .post(`${baseURL}/${shorturl}`)
      .then((response) => {
        return response.data[0].longurl;
      });
    setShortURL(shortURL);
  }

  return (
    <>
      <div>
        <label htmlFor="longurl">Enter your Orginal URL</label>
        <input
          type="text"
          name="longurl"
          id="longurl"
          value={longurl}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setLongURL(e.target.value)
          }
        />
        <button onClick={GenerateShortURL}>Generate</button>

        <input type="text" value={shorturl} contentEditable={false} />
      </div>
    </>
  );
};

export default LongtoShort;
