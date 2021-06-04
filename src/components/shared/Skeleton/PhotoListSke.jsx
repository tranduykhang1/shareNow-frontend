import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";

const style = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: "-60px"
  },
  photoSke: {
    borderRadius: 10
  }
};

const PhotoListSke = () => {
  const data = [1, 1, 1,1];

  const renderPhotoList = data.map((data, index) => {
    return (
      <Skeleton
        animation="wave"
        className="photoItem"
        height={300}
        width={130}
        key={index}
        style={style.photoSke}
      />
    );
  });

  return <div style={style.container}>{renderPhotoList}</div>;
};

export default PhotoListSke;
