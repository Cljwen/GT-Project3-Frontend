import React from "react";
import { Carousel, Card } from "antd";
import { LeftCircleTwoTone, RightCircleTwoTone } from "@ant-design/icons";
import "./homepage.css";

export default function CarouselBanner() {
  const { Meta } = Card;

  return (
    <Carousel
      slidesToShow={3}
      arrows={true}
      prevArrow={<LeftCircleTwoTone twoToneColor="ff7e55" />}
      nextArrow={<RightCircleTwoTone twoToneColor="ff7e55" />}
      style={{ margin: "20px 50px" }}
    >
      <Card
        style={{ width: 500 }}
        hoverable
        cover={
          <img
            alt="example"
            src="https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
          />
        }
      >
        <Meta title="Welfare organisation - promotional banner #1." />
      </Card>
      <Card
        hoverable
        style={{ width: 500 }}
        cover={
          <img
            alt="example"
            src="https://images.unsplash.com/photo-1585822797375-2a38044b8499?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1744&q=80"
          />
        }
      >
        <Meta title="Welfare organisation - promotional banner #2." />
      </Card>
      <Card
        hoverable
        style={{ width: 500 }}
        cover={
          <img
            alt="example"
            src="https://images.unsplash.com/photo-1558770147-d2a384e1ad85?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1734&q=80"
          />
        }
      >
        <Meta title="Welfare organisation - promotional banner #3." />
      </Card>
      <Card
        hoverable
        style={{ width: 500 }}
        cover={
          <img
            alt="example"
            src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
          />
        }
      >
        <Meta title="Welfare organisation - promotional banner #4." />
      </Card>
      <Card
        hoverable
        style={{ width: 500 }}
        cover={
          <img
            alt="example"
            src="https://images.unsplash.com/photo-1502781252888-9143ba7f074e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
          />
        }
      >
        <Meta title="Welfare organisation - promotional banner #5." />
      </Card>
    </Carousel>
  );
}
