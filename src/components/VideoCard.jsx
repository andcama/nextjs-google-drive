import { saveAs } from "file-saver";
import { CldVideoPlayer } from "next-cloudinary";
import { useState, useEffect } from "react";



const VideoCard = ({ asset }) => {
  const { public_id, filename } = asset;
  const [isLoading, setIsLoading] = useState(true);
  const [retries, setRetries] = useState(0);
  const [errorOcurred, setErrorOcurred] = useState(false);

  const dowloadOGVideo = () => {
    const vidSrc = asset.url
    saveAs(vidSrc, filename)
  }

  const handleVideoError = (err) => {
    if (err?.player?.videojs?.error()?.statusCode === 423) {
      if (!errorOcurred) {
        setErrorOcurred(true)
        setIsLoading(true)
        setRetries((prev) => prev + 1)
        console.log("Retrying video load...")
      }
    }
  }

  const onHandleMetaDataLoad = () => {
    setIsLoading(false)
    setErrorOcurred(false)
  }

  useEffect(() => {
    if (errorOcurred) {
      const intervalId = setInterval(() => {
        setRetries((prev) => prev + 1)
      }, 10000)

      return () => clearInterval(intervalId)
    }
  }, [errorOcurred])

  useEffect(() => {
    if (retries > 0 && !isLoading) {
      setIsLoading(false)
    }
  })

  return (
    <article className="card">
      <div className="title-container">
        <h4><span className="emoji">⏺</span>{filename}</h4>
        <h4>⫶</h4>
      </div>
      {isLoading && <p>Loading...</p>}

      <div className="video-container" style={{ visibility: isLoading ? "hidden" : "visible" }}>
        <CldVideoPlayer
          src={public_id}
          id={`${public_id}-${Math.random()}`}
          height="300"
          width="300"
          alt={filename}
          transformation={{
            width: 300,
            height: 300,
            crop: "fill",
            gravity: "auto",
          }}
          onMetadataLoad={onHandleMetaDataLoad}
          onError={handleVideoError}
          
        />
      </div>

      <div className="controls-container">
        <div className="control-container">
          <button onClick={dowloadOGVideo}>⇓ download original</button>
        </div>
      </div>
    </article>
  );
}

export default VideoCard;