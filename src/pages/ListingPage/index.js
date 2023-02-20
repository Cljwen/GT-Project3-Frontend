// specific listing
import React from "react";
import { useState, useEffect } from "react";
import { Card, Carousel, Image, Avatar } from "antd";
import { Layout, Button, Input, Row, Col } from "antd";
import {
  LikeOutlined,
  WhatsAppOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

export default function ListingDisplay() {
  const { Search } = Input;
  const { Meta } = Card;

  const [listingName, setListingName] = useState("Used Canon 24GB Camera");
  const [description, setDescription] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla consectetur varius nunc, sed tempor dui volutpat fringilla. Vivamus a tortor nunc. "
  );
  const [condition, setCondition] = useState("Like New");

  return (
    <div>
      <Row>
        <Col span={20}>
          <Search
            placeholder="What are you looking for?"
            allowClear
            enterButton="Search"
            size="large"
            style={{ margin: "20px 0px" }}
            // onSearch={onSearch}
          />
        </Col>

        <Col span={4}>
          <Button
            size="large"
            type="primary"
            style={{
              color: "white",
              margin: "20px 0px",
            }}
          >
            Create Listing
          </Button>
        </Col>
      </Row>
      <div>
        <Image.PreviewGroup>
          <Carousel dotPosition="bottom" infinite={false} slidesToShow={1}>
            <Image
              width={500}
              src="https://images.unsplash.com/photo-1568840568548-478236d70df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
            />

            <Image
              width={500}
              alt="camera"
              src="https://images.unsplash.com/photo-1548500853-17a234cbd378?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            />
          </Carousel>
        </Image.PreviewGroup>
        <Row gutter={100}>
          <Col>
            <Card>
              <Meta
                avatar={
                  <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" />
                }
                title="PERSON-USERNAME"
                description={
                  <>
                    <b>
                      <EnvironmentOutlined /> Bishan
                    </b>
                    <br />
                    <Button type="primary">
                      <WhatsAppOutlined />
                      Chat Now
                    </Button>
                    <Button type="default">
                      <LikeOutlined />
                      Like Listing
                    </Button>
                  </>
                }
              />
            </Card>
          </Col>
          <Col>
            <h2>{listingName}</h2>
            <p>{description}</p>
            <p>{condition}</p>
          </Col>
        </Row>
      </div>
    </div>
  );
}
