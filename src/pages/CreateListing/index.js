import React from 'react';
import { useState, useEffect } from 'react';
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
  Col
} from 'antd';
import { Footer, Sider, Content, siderStyle, contentStyle } from '../globalstyles';

import { SmileOutlined, FrownOutlined, UserOutlined, LeftOutlined } from '@ant-design/icons';

import TextArea from 'antd/es/input/TextArea';
import { PlusOutlined, InboxOutlined } from '@ant-design/icons';
import { Navbar } from '../../commoncomponents/Navbar/Navbar';
import axios from 'axios';
import './createlisting.css';

//Cloudinary states
import { UploadWidget } from './UploadWidget';
import { useParams, useNavigate } from 'react-router-dom';

export default function CreateListing() {
  const [form] = Form.useForm();
  const { user_id } = useParams();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    user_id: user_id,
    photo_url: null,
    item_name: null,
    category: null,
    description: null,
    listing_type: null,
    condition: null
  });

  const [api, contextHolder] = notification.useNotification();
  const openSuccessNotification = (placement) => {
    api.info({
      message: `Yippee!`,
      description: 'Create listing successful!',
      placement,
      icon: (
        <SmileOutlined
          style={{
            color: 'green'
          }}
        />
      )
    });
  };
  const openFailureNotification = (placement) => {
    api.info({
      message: `Oh no!`,
      description: 'Create listing unsuccessful!',
      placement,
      icon: (
        <FrownOutlined
          style={{
            color: 'red'
          }}
        />
      )
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3000/${user_id}/createlisting`, formValues)
      .then(function (response) {
        console.log(response);
        openSuccessNotification('top');
      })
      .catch(function (error) {
        console.log(error);
        openFailureNotification('top');
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

  const footerStyle = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#303841',
    position: 'fixed',
    bottom: 0,
    width: '100%'
  };

  const replicateFooterStyle = {
    left: 0,
    bottom: 0,
    width: '100%',
    // position: 'absolute',
    backgroundColor: '#303841',
    position: 'fixed'
  };

  return (
    <div>
      {contextHolder}
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#ff7e55'
          }
        }}>
        <Layout>
          <Sider style={siderStyle} width={250}>
            <Navbar />
            <Footer style={replicateFooterStyle}></Footer>
          </Sider>

          <Layout>
            <Content style={contentStyle}>
              <>
                {contextHolder}

                <Row style={{ margin: 50 }}>
                  <Col span={12} style={{ padding: 20 }}>
                    <Button type="link" onClick={handleBackButtonClick}>
                      {'< '}Back
                    </Button>
                    <br></br>
                    <UploadWidget setFormValues={setFormValues} formValues={formValues} />
                    <br></br>
                    <br></br>
                    <Form form={form} layout="vertical">
                      <Form.Item
                        label="Item name"
                        required
                        tooltip="This is a required field"
                        onChange={handleInputChange}
                        name="item_name">
                        <Input placeholder="What's the name of this item?" />
                      </Form.Item>
                      <Form.Item label="Listing type" required tooltip="This is a required field">
                        <Select
                          placeholder="Select a listing type"
                          onChange={handleListingTypeChange}>
                          <Select.Option value="Give">Give</Select.Option>
                          <Select.Option value="Take">Take</Select.Option>
                        </Select>
                      </Form.Item>
                      <Form.Item label="Category" required tooltip="This is a required field">
                        <Select placeholder="Select a category" onChange={handleCategoryChange}>
                          <Select.Option value="Shoes">Shoes</Select.Option>
                          <Select.Option value="Books">Books</Select.Option>
                          <Select.Option value="Clothes">Clothes</Select.Option>
                        </Select>
                      </Form.Item>

                      <Form.Item label="Condition" required tooltip="This is a required field">
                        <Select
                          placeholder="State the condition of the item"
                          onChange={handleConditionChange}>
                          <Select.Option value="Brand New">Brand New</Select.Option>
                          <Select.Option value="Like New">Like New</Select.Option>
                          <Select.Option value="Lightly Used">Lightly Used</Select.Option>
                          <Select.Option value="Heavily Used">Heavily Used</Select.Option>
                        </Select>
                      </Form.Item>

                      <Form.Item
                        label="Description"
                        required
                        tooltip={{
                          title: 'Be as descriptive as possible'
                        }}
                        onChange={handleInputChange}
                        name="description">
                        <TextArea rows={4} placeholder="Describe this item." />
                      </Form.Item>

                      <Form.Item>
                        <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                          List item!
                        </Button>
                      </Form.Item>
                    </Form>
                  </Col>
                  <Col span={12} style={{ padding: 20 }}>
                    <Space direction="vertical" size={8}>
                      <p>Listing Preview</p>
                      <Space wrap size={16}>
                        <Avatar size={128} icon={<UserOutlined />} />
                        {formValues.photo_url ? (
                          <p>Photo name: {formValues.photo_url.slice(62)}</p>
                        ) : (
                          <p>Photo name: </p>
                        )}
                      </Space>
                      {formValues.item_name ? (
                        <p>Item name: {formValues.item_name}</p>
                      ) : (
                        <p>Item name: </p>
                      )}
                      {formValues.listing_type ? (
                        <p>Listing type: {formValues.listing_type}</p>
                      ) : (
                        <p>Listing type: </p>
                      )}
                      {formValues.category ? (
                        <p>Category: {formValues.category}</p>
                      ) : (
                        <p>Category: </p>
                      )}
                      {formValues.condition ? (
                        <p>Condition: {formValues.condition}</p>
                      ) : (
                        <p>Condition: </p>
                      )}
                      {formValues.description ? (
                        <p>Description: {formValues.description}</p>
                      ) : (
                        <p>Description: </p>
                      )}
                    </Space>
                  </Col>
                </Row>
              </>
              <Footer style={footerStyle}> </Footer>
            </Content>
          </Layout>
        </Layout>
      </ConfigProvider>
    </div>
  );
}
