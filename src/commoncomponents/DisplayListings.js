//Cloudinary states
import React from "react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { Cloudinary, CloudinaryImage } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
// import { UploadWidget } from "./components/UploadWidget";
import { Card } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
const { Meta } = Card;

export function DisplayListings() {
  const [listingsReturned, setListingsReturned] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/")
      .then(function (response) {
        setListingsReturned(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);




  return (
    
    <>
      {listingsReturned.map(({ category, item_name, photo_url }, key) => (
        <Card
        key={photo_url}
          hoverable
          style={{
            width: 240,
          }}
          cover={
            <img src={photo_url} />
          }
        >
          <Meta title={item_name} description={category} />
        </Card>
      ))}
    </>
  );
}
