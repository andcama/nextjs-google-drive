import { CldImage } from "next-cloudinary";
import { useState } from "react";
import {saveAs} from 'file-saver'

const ImageCard = ({ asset }) => {

  const { public_id, filename } = asset

  const [removeBackground, setRemoveBackground] = useState(false)
  const [grayscale, setGrayscale] = useState(false)
  const [prompt, setPrompt] = useState("")

  const downloadImage = () => {
    const imgSrc=document.getElementById(public_id).src
    saveAs(imgSrc,filename)
  }

  console.log(filename)
  return (
    <article className="card">
      <div className="title-container">
        <h4><span className="emoji"> ᝰ </span>{filename}</h4>
        <h4>⫶</h4>
      </div>
      <CldImage src={public_id} width="300" height="300" id={public_id} alt={filename} replaceBackground={prompt} grayscale={grayscale} removeBackground={removeBackground} crop={{ type: "auto", source: true }} />
      <div className="controls-container">
        <div className="control-container">
          <input type="checkbox" id="background" name="background" onChange={() => setRemoveBackground(!removeBackground)} />
          <label htmlFor="background">no background</label>
        </div>

        <div className="control-container">
          <input type="checkbox" id="greyscale" name="greyscale" onChange={()=> setGrayscale(!grayscale)} />
          <label htmlFor="greyscale">greyscale</label>
        </div>

        <button onClick={downloadImage}>⇓ Download</button>
      </div>
      <input type="text" value={prompt} placeholder="Start typing to change background " onChange={(e) => setPrompt(e.target.value)}/>
    </article>
  );
}

export default ImageCard;