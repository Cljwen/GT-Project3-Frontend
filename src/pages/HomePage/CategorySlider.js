import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { Col, Row } from "antd";
import "./homepage.css";
import { color } from "@cloudinary/url-gen/qualifiers/background";

export const categories = [
  "Sports",
  "Appliances",
  "Furniture",
  "Clothes",
  "Shoes",
  "Games",
  "Photography",
  "View All Categories",
];

export default function CategorySlider({ handleCategoryChange }) {
  const [isActive, setIsActive] = useState();

  const buttonEnabled = (index) => {
    setIsActive(index);
  };

  return (
    <div className="homepage-categories">
      <p className="categories-title">Categories</p>
      <div>
        <Row gutter={[2, 2]}>
          {categories.map((category, index) => (
            <Col span={3.8} key={index}>
              <Button
                size="large"
                style={
                  isActive === index
                    ? { color: "#ff7e55", width: 180 }
                    : { width: 180 }
                }
                onClick={() => {
                  handleCategoryChange(category);
                  buttonEnabled(index);
                }}
                value={category}
              >
                {category}
              </Button>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
