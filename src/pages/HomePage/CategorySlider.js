import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { Col, Row } from "antd";
import "./homepage.css";

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
  // const [isActive, setIsActive] = useState(false);

  return (
    <div className="homepage-categories">
      <p className="categories-title">Categories</p>
      <div>
        <Row gutter={[2, 2]}>
          {categories.map((category, index) => (
            <Col span={3.8} key={index}>
              <Button
                size="large"
                style={{ width: 180 }}
                onClick={() => {
                  handleCategoryChange(category);
                  // setIsActive(true);
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
