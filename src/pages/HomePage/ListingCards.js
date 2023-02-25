import React, { useMemo } from 'react';
import { Card, Avatar, Button, Pagination, Dropdown, Space, Empty } from 'antd';
import {
  WhatsAppOutlined,
  EyeOutlined,
  FilterFilled,
  EnvironmentOutlined,
  TagOutlined
} from '@ant-design/icons';
import styles from './homepage.module.css';
import { Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CategorySlider from './CategorySlider';
const { Meta } = Card;

export default function ListingCards({ configs }) {
  const [listingsReturned, setListingsReturned] = useState([]);
  const [usersReturned, setUsersReturned] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const [incomingConfig, setIncomingConfig] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageListings, setPageListings] = useState([]);

  const [listingTypeFilter, setListingTypeFilter] = useState();
  const { original_id } = useParams();

  const items = [
    {
      key: '1',
      label: 'Give'
    },
    {
      key: '2',
      label: 'Take'
    }
  ];

  const onClick = ({ key }) => {
    console.log(`Click on item ${key}`);
    if (key === '1') {
      setListingTypeFilter('Give');
    } else {
      setListingTypeFilter('Take');
    }
  };

  const [category, setCategory] = useState();
  const navigate = useNavigate();

  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  const handleFilterRemoval = () => {
    setListingTypeFilter(null);
  };

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
        if (category && category !== 'View All Categories') {
          let filteredCategoryListings = response.data.filter((listing) => {
            return listing.category === category;
          });

          if (listingTypeFilter) {
            filteredCategoryListings = filteredCategoryListings.filter((listing) => {
              return listing.listing_type === listingTypeFilter;
            });
          }
          setListingsReturned(filteredCategoryListings);
          console.log(filteredCategoryListings);
        } else {
          let filteredCategoryListings = response.data;

          if (listingTypeFilter) {
            filteredCategoryListings = response.data.filter((listing) => {
              return listing.listing_type === listingTypeFilter;
            });
          }
          setListingsReturned(filteredCategoryListings);
          console.log(response.data);
        }
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
  }, [incomingConfig, category, listingTypeFilter]);

  useEffect(() => {
    setCombinedData([]);
    for (const item of listingsReturned) {
      for (const item2 of usersReturned) {
        if (item.user_id === item2.id) {
          let tempObject = {};
          tempObject = {
            ...item,
            mrt: item2.mrt,
            username: item2.username,
            phone_number: item2.phone_number,
            profile_photo: item2.profile_photo
          };
          setCombinedData((combinedData) => [...combinedData, tempObject]);
        }
      }
    }
  }, [listingsReturned, usersReturned]);

  useEffect(() => {
    setPageListings(combinedData.slice(currentPage * 10 - 10, currentPage * 10));
  }, [combinedData, currentPage]);

  return (
    <div>
      <CategorySlider
        category={category}
        handleCategoryChange={(value) => handleCategoryChange(value)}
      />

      <div className={styles.allListing}>
        <Row>
          <Col span={19}>
            <h2>Listings You May Want</h2>
          </Col>
          <Col span={5} style={{ alignItems: 'center', margin: 'auto' }}>
            <Dropdown
              menu={{
                items,
                onClick
              }}>
              <Button>
                <Space>
                  <FilterFilled style={{ fontSize: '15px', color: '#ff7e55' }} />
                  Filter By
                </Space>
              </Button>
            </Dropdown>
            <Button type="default" onClick={handleFilterRemoval}>
              Clear Filters
            </Button>
          </Col>
        </Row>
        <Pagination
          style={{ margin: 'auto', padding: '20px 0px', width: 1400 }}
          defaultCurrent={1}
          total={combinedData ? combinedData.length : 0}
          current={currentPage}
          onChange={onPageChange}
        />

        {pageListings.length ? (
          <Row gutter={[24, 24]}>
            {pageListings.map(
              ({
                photo_url,
                item_name,
                mrt,
                username,
                id,
                user_id,
                phone_number,
                profile_photo,
                listing_type
              }) => (
                <Col span={6} key={id}>
                  <Card
                    style={{ width: 280, marginRight: 20 }}
                    hoverable
                    cover={
                      <img
                        alt="example"
                        src={photo_url}
                        style={{
                          width: 280,
                          height: 300,
                          objectFit: 'contain'
                        }}
                      />
                    }
                    actions={[
                      <Link
                        to={`http://localhost:3001/${original_id}/listings/${user_id}/${id}`}
                      >
                        <EyeOutlined key="view" />
                      </Link>,
                      <a href={`https://wa.me/65${phone_number}`}>
                        <WhatsAppOutlined key="message" />
                      </a>
                    ]}>
                    <Meta
                      avatar={<Avatar src={profile_photo} />}
                      title={item_name}
                      description={
                        <>
                          <b>
                            <Row>
                              <Col span={8}>
                                {listing_type === 'Give' ? (
                                  <div className={styles.listingTypeIconColorTag}>
                                    <TagOutlined style={{ color: '#ff7e55' }} /> {listing_type}
                                  </div>
                                ) : (
                                  <div className={styles.listingTypeIconColorTag}>
                                    <TagOutlined style={{ color: '#ff7e55' }} /> {listing_type}
                                  </div>
                                )}
                              </Col>
                              <Col span={16}>
                                <EnvironmentOutlined /> {mrt}
                              </Col>
                            </Row>
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
        ) : (
          // <Empty />
          <>
            <div className={styles.loading}></div>
            <div className={styles.loadingText}>Loading...</div>
          </>
        )}
      </div>
    </div>
  );
}
