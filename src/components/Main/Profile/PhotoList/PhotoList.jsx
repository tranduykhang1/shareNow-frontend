import { withStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
// import { ImageGroup, Image } from "react-fullscreen-image";

import style from "./Style";

const images = [
  "https://picsum.photos/200/300",
  "https://picsum.photos/200/300?random=2",
  "https://picsum.photos/200/300?random=2",
  "https://picsum.photos/200/300?random=2",
  "https://picsum.photos/200/300?random=2",
  "https://picsum.photos/200/300?random=2",
  "https://picsum.photos/200/300?random=2",
];

const PhotoList = (props) => {
  const { classes } = props;
  const [isFull, setIsFull] = useState(false);
  const [imgSrc, setImgSrc] = useState();

  const fullScreenMode = (src) => {
    setImgSrc(src);
    setIsFull(!isFull);
  };

  const renderPhoto = images.map((img, i) => {
    return (
      <img
        src={img}
        key={i}
        alt=""
        className="photoItem"
        onClick={() => fullScreenMode(img)}
      />
    );
  });
  return (
    <>
      {renderPhoto}
      {isFull && (
        <div className={classes.fullscreenWrapper} onClick={() => setIsFull(false)}>
          <img src={imgSrc} alt="Image" className={classes.fullscreenImg} />
        </div>
      )}
    </>
  );
};

export default withStyles(style)(PhotoList);
