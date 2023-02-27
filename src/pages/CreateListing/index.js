import React from "react";
import { useState, useEffect } from "react";
import {
  Form,
  Select,
  Avatar,
  Space,
  Image,
  Upload,
  notification,
  Layout,
  Button,
  Input,
  ConfigProvider,
  Row,
  Col,
  Card,
  Tag,
} from "antd";
import {
  Footer,
  Sider,
  Content,
  siderStyle,
  contentStyle,
  footerStyle,
  replicateFooterStyle,
} from "../globalstyles";

import {
  SmileOutlined,
  FrownOutlined,
  UserOutlined,
  // LeftOutlined,
  RollbackOutlined,
  TagOutlined,
} from "@ant-design/icons";

import TextArea from "antd/es/input/TextArea";
import { PlusOutlined, InboxOutlined } from "@ant-design/icons";
import { Navbar } from "../../commoncomponents/Navbar/Navbar";
import axios from "axios";
import styles from "./createlisting.module.css";

//Cloudinary states
import { UploadWidget } from "./UploadWidget";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function CreateListing() {
  const { Meta } = Card;
  const [form] = Form.useForm();
  const { original_id } = useParams();
  const navigate = useNavigate();

  const { getAccessTokenSilently, user } = useAuth0();
  const [accessToken, setAccessToken] = useState(null);

  const [formValues, setFormValues] = useState({
    user_id: original_id,
    photo_url: null,
    item_name: null,
    category: null,
    description: null,
    listing_type: null,
    condition: null,
  });

  const [api, contextHolder] = notification.useNotification();
  const openSuccessNotification = (placement) => {
    api.info({
      message: `Yippee!`,
      description: "Create listing successful!",
      placement,
      icon: (
        <SmileOutlined
          style={{
            color: "green",
          }}
        />
      ),
    });
    setTimeout(() => {
      navigate(-1);
    }, 2000);
  };
  const openFailureNotification = (placement) => {
    api.info({
      message: `Oh no!`,
      description: "Create listing unsuccessful!",
      placement,
      icon: (
        <FrownOutlined
          style={{
            color: "red",
          }}
        />
      ),
    });
  };

  useEffect(() => {
    if (user && !accessToken) {
      getAccessTokenSilently().then((jwt) => setAccessToken(jwt));
    }
  }, [user, accessToken]);
  console.log(accessToken);

  const configs = {};
  if (accessToken) configs.headers = { Authorization: `Bearer ${accessToken}` };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `http://localhost:3000/${original_id}/createlisting`,
        formValues,
        configs
      )
      .then(function (response) {
        console.log(response);
        openSuccessNotification("top");
      })
      .catch(function (error) {
        console.log(error);
        openFailureNotification("top");
      });
  };

  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
    console.log(formValues);
  };

  const handleListingTypeChange = (e) => {
    setFormValues({ ...formValues, listing_type: e });
  };

  const handleCategoryChange = (e) => {
    setFormValues({ ...formValues, category: e });
  };

  const handleConditionChange = (e) => {
    setFormValues({ ...formValues, condition: e });
  };

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  return (
    <div>
      {contextHolder}
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#ff7e55",
          },
        }}
      >
        <Layout>
          <Sider style={siderStyle} width={250}>
            <Navbar />
            <Footer style={replicateFooterStyle}>--</Footer>
          </Sider>

          <Layout>
            <Content style={contentStyle}>
              <>
                {contextHolder}

                <Row
                  style={{ marginLeft: 50, marginTop: 30, marginBottom: 125 }}
                >
                  <div className={styles.fill}>
                    <Col span={18} style={{ paddingLeft: 20 }}>
                      <br></br>
                      <UploadWidget
                        setFormValues={setFormValues}
                        formValues={formValues}
                      />
                      <br></br>
                      <br></br>
                      <Form form={form} layout="vertical">
                        <Form.Item
                          label="Item name"
                          required
                          tooltip="This is a required field"
                          onChange={handleInputChange}
                          name="item_name"
                        >
                          <Input placeholder="What's the name of this item?" />
                        </Form.Item>
                        <Form.Item
                          label="Listing type"
                          required
                          tooltip="This is a required field"
                        >
                          <Select
                            placeholder="Select a listing type"
                            onChange={handleListingTypeChange}
                          >
                            <Select.Option value="Give">Give</Select.Option>
                            <Select.Option value="Take">Take</Select.Option>
                          </Select>
                        </Form.Item>
                        <Form.Item
                          label="Category"
                          required
                          tooltip="This is a required field"
                        >
                          <Select
                            placeholder="Select a category"
                            onChange={handleCategoryChange}
                          >
                            <Select.Option value="Shoes">Shoes</Select.Option>
                            <Select.Option value="Appliances">
                              Appliances
                            </Select.Option>
                            <Select.Option value="Furniture">
                              Furniture
                            </Select.Option>
                            <Select.Option value="Clothes">
                              Clothes
                            </Select.Option>
                            <Select.Option value="Sports">Sports</Select.Option>
                            <Select.Option value="Games">Games</Select.Option>
                            <Select.Option value="Photography">
                              Photography
                            </Select.Option>
                          </Select>
                        </Form.Item>

                        <Form.Item
                          label="Condition"
                          required
                          tooltip="This is a required field"
                        >
                          <Select
                            placeholder="State the condition of the item"
                            onChange={handleConditionChange}
                          >
                            <Select.Option value="Brand New">
                              Brand New
                            </Select.Option>
                            <Select.Option value="Like New">
                              Like New
                            </Select.Option>
                            <Select.Option value="Lightly Used">
                              Lightly Used
                            </Select.Option>
                            <Select.Option value="Heavily Used">
                              Heavily Used
                            </Select.Option>
                          </Select>
                        </Form.Item>

                        <Form.Item
                          label="Description"
                          required
                          tooltip={{
                            title: "Be as descriptive as possible",
                          }}
                          onChange={handleInputChange}
                          name="description"
                        >
                          <TextArea
                            rows={4}
                            placeholder="Describe this item."
                          />
                        </Form.Item>

                        <Form.Item>
                          <Button
                            type="primary"
                            htmlType="submit"
                            onClick={handleSubmit}
                            style={{
                              marginRight: "10px",
                            }}
                          >
                            List item!
                          </Button>
                          <Button
                            type="link"
                            onClick={handleBackButtonClick}
                            style={{ color: "#ff7e55" }}
                          >
                            <RollbackOutlined />
                            Back
                          </Button>
                        </Form.Item>
                      </Form>
                    </Col>
                  </div>
                  <Col span={12} style={{ marginLeft: 30 }}>
                    <Space direction="vertical" size={8}>
                      <h1>Listing Preview</h1>
                      <Card
                        style={{
                          width: 300,
                          padding: "20px",
                          background: "#eeeeee",
                          justifyContent: "center",
                        }}
                        hoverable
                        cover={<Avatar size={128} icon={<UserOutlined />} />}
                      >
                        {" "}
                        {formValues.photo_url ? (
                          <Meta description={formValues.photo_url.slice(62)} />
                        ) : (
                          <p></p>
                        )}
                        {formValues.item_name ? (
                          <p className={styles.itemName}>
                            {formValues.item_name}
                          </p>
                        ) : (
                          <></>
                        )}
                        <br></br>
                        {formValues.listing_type ? (
                          <>
                            <TagOutlined style={{ color: "#ff7e55" }} />
                            <></> {formValues.listing_type}
                          </>
                        ) : (
                          <></>
                        )}
                        <br></br>
                        {formValues.category ? (
                          <Tag color="volcano">{formValues.category}</Tag>
                        ) : (
                          <></>
                        )}
                        {formValues.condition ? (
                          <Tag color="cyan">{formValues.condition}</Tag>
                        ) : (
                          <></>
                        )}
                        {formValues.description ? (
                          <p>Description: {formValues.description}</p>
                        ) : (
                          <></>
                        )}
                      </Card>
                    </Space>
                  </Col>
                </Row>
              </>
              <Footer style={footerStyle}>Copyright © Give & Take 2023</Footer>
            </Content>
          </Layout>
        </Layout>
      </ConfigProvider>
    </div>
  );
}
