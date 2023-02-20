import React, { useMemo } from "react";
import { Carousel, Card, Avatar, Button, Pagination } from "antd";
import {
  LikeOutlined,
  WhatsAppOutlined,
  EyeOutlined,
  FilterFilled,
  EnvironmentOutlined,
} from "@ant-design/icons";
import "./homepage.css";
import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const { Meta } = Card;

export default function ListingCards({ configs }) {
  const [listingsReturned, setListingsReturned] = useState([]);
  const [usersReturned, setUsersReturned] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const [incomingConfig, setIncomingConfig] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageListings, setPageListings] = useState([]);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setIncomingConfig(configs);
  }, [configs]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/listings`, incomingConfig)
      .then(function (response) {
        setListingsReturned(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get(`http://localhost:3000/users`, incomingConfig)
      .then(function (response) {
        setUsersReturned(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [incomingConfig]);

  useMemo(() => {
    for (const item of listingsReturned) {
      for (const item2 of usersReturned) {
        if (item.user_id === item2.id) {
          let tempObject = {};
          tempObject = { ...item, mrt: item2.mrt, username: item2.username, phone_number: item2.phone_number };
          setCombinedData((combinedData) => [...combinedData, tempObject]);
        }
      }
    }
  }, [listingsReturned, usersReturned]);

  useEffect(()=>{
      setPageListings(
        combinedData.slice(currentPage * 10 - 10, currentPage * 10)
      );
  },[combinedData, currentPage])

  return (
    <div className="all-listing">
      <Row>
        <Col span={22}>
          <h2>Listings You May Want</h2>
        </Col>
        <Col span={2} style={{ alignItems: "center", margin: "auto" }}>
          <Button type="default">
            <FilterFilled style={{ fontSize: "15px", color: "#ff7e55" }} /> Sort
            By
          </Button>
        </Col>
      </Row>
      <Pagination
        style={{ margin: "auto", padding: "20px 0px", width: 1400 }}
        defaultCurrent={1}
        total={combinedData.length}
        current={currentPage}
        onChange={onPageChange}
      />
      <Row gutter={[16, 24]}>
        {pageListings.map(
          ({ photo_url, item_name, mrt, username, id, user_id, phone_number }) => (
            <Col span={6} key={id}>
              <Card
                style={{ width: 300 }}
                hoverable
                cover={
                  <img
                    alt="example"
                    src={photo_url}
                    style={{ width: 300, height: 300, objectFit: "contain" }}
                  />
                }
                actions={[
                  <Link to={`http://localhost:3001/${user_id}/listings/${id}`}>
                    <EyeOutlined key="view" />
                  </Link>,
                  <a href={`https://wa.me/65${phone_number}`}><WhatsAppOutlined key="message" /></a>,
                  <LikeOutlined key="like" />,
                ]}
              >
                <Meta
                  avatar={
                    <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" />
                  }
                  title={item_name}
                  description={
                    <>
                      <b>
                        <EnvironmentOutlined /> {mrt}
                      </b>
                      <br />
                      Posted by {username}
                    </>
                  }
                />
              </Card>
            </Col>
          )
        )}
      </Row>
    </div>
  );
}
