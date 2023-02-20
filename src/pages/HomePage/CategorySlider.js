import React from "react";
import { Button } from "antd";
import { Col, Row } from "antd";
import "./homepage.css";

export default function CategorySlider() {
  const categories = [
    "Sports & Equipment",
    "Home Appliances",
    "Furniture",
    "Clothes",
    "Video Games",
    "Photography",
    "View All Categories",
  ];
  return (
    <div>
      <h1 className="categories-title">Categories</h1>
      <Row gutter={[2, 2]} style={{ margin: "0 50px" }}>
        {categories.map((category) => (
          <Col span={3.8}>
            <Button size="large" style={{ width: 190 }}>
              {category}
            </Button>
          </Col>
        ))}
      </Row>
    </div>
  );
}
