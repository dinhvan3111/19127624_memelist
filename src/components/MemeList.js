import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import React from "react";

const MemeList = ({ imgList }) => {
  return (
    <ImageList cols={4} gap={8}>
      {imgList.map((item) => (
        <ImageListItem key={item.id}>
          <img
            title={item.name}
            src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
            alt={item.name}
            loading="lazy"
            style={{ objectFit: "cover", borderRadius: "8px" }}
          />
          <ImageListItemBar title={item.name} />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default MemeList;
