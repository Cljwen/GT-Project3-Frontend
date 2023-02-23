// users can edit the details of their profile on this page
import { React, useState, useEffect } from 'react';
import './editprofile.css';
import { Navbar } from '../../commoncomponents/Navbar/Navbar';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, TreeSelect, Upload, Select, Layout, notification } from 'antd';
import { useAuth0 } from '@auth0/auth0-react';

import {
  Footer,
  Sider,
  Content,
  siderStyle,
  contentStyle,
  footerStyle,
  replicateFooterStyle
} from '../globalstyles';
import { useNavigate } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import './editprofile.css';
import axios from 'axios';
import { UploadWidget } from './UploadWidget';
import { SmileOutlined, FrownOutlined } from '@ant-design/icons';

export function EditProfile() {
  const { TextArea } = Input;
  const { Option } = Select;
  const navigate = useNavigate();

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option defaultValue="65">+65</Option>
      </Select>
    </Form.Item>
  );

  const { getAccessTokenSilently, user } = useAuth0();
  const [accessToken, setAccessToken] = useState(null);
  const [formValues, setFormValues] = useState({});
  let { user_id } = useParams();
  const [api, contextHolder] = notification.useNotification();
  const openSuccessNotification = (placement) => {
    api.info({
      message: `Yippee!`,
      description: 'Edit profile successful!',
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
      description: 'Edit profile unsuccessful!',
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

  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
    console.log(formValues);
  };

  useEffect(() => {
    if (user && !accessToken) {
      getAccessTokenSilently().then((jwt) => setAccessToken(jwt));
    }
  }, [user]);

  const configs = {};
  if (accessToken) configs.headers = { Authorization: `Bearer ${accessToken}` };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/${user_id}/editprofile`, configs)
      .then(function (response) {
        setFormValues(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [accessToken]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/${user_id}/settings`, formValues, configs)
      .then(function (response) {
        console.log(response);
        openSuccessNotification('top');
      })
      .catch(function (error) {
        console.log(error);
        openFailureNotification('top');
      });
  };

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  return (
    <div>
      {contextHolder}
      <Layout>
        <Sider width={300} style={siderStyle}>
          <Navbar />
          <Footer style={replicateFooterStyle}> </Footer>
        </Sider>
        <Layout>
          <Content style={contentStyle}>
            <div className="container">
              <div className="content">
                <Form
                  labelCol={{
                    span: 8
                  }}
                  wrapperCol={{
                    span: 20
                  }}
                  layout="horizontal"
                  // onValuesChange={onFormLayoutChange}
                  // disabled={componentDisabled}
                  style={{
                    maxWidth: 800
                  }}>
                  <Form.Item label="Current Profile Photo" name="profile_photo">
                    <img alt="" src={formValues.profile_photo} width="200" />
                    <br></br>
                    <UploadWidget setFormValues={setFormValues} formValues={formValues} />
                  </Form.Item>
                  <Form.Item label="Username" name="username" onChange={handleInputChange}>
                    <Input placeholder={formValues.username} />
                  </Form.Item>
                  <Form.Item label="First Name" name="first_name" onChange={handleInputChange}>
                    <Input placeholder={formValues.first_name} />
                  </Form.Item>
                  <Form.Item label="Last Name" name="last_name" onChange={handleInputChange}>
                    <Input placeholder={formValues.last_name} />
                  </Form.Item>
                  <Form.Item label="Email" name="email" onChange={handleInputChange}>
                    <Input placeholder={formValues.email} />
                  </Form.Item>

                  <Form.Item
                    name="phone_number"
                    label="Phone Number"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your phone number!'
                      }
                    ]}
                    onChange={handleInputChange}>
                    <Input addonBefore="+65" placeholder={formValues.phone_number} />
                  </Form.Item>
                  <Form.Item label="Address" name="address" onChange={handleInputChange}>
                    <Input placeholder={formValues.address} />
                  </Form.Item>
                  <Form.Item label="Postal Code" name="postal_code" onChange={handleInputChange}>
                    <Input placeholder={formValues.postal_code} />
                  </Form.Item>
                  <Form.Item label="Nearest MRT" name="mrt" onChange={handleInputChange}>
                    <Input placeholder={formValues.mrt} />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ backgroundColor: 'white', color: '#ff7e55', marginRight: '20px' }}
                      onClick={handleSubmit}>
                      Save Changes
                    </Button>
                    <Link to={`/${user_id}/profile`}>Back to Profile</Link>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </Content>
          <Footer style={footerStyle}>Copyright G&T 2023</Footer>
        </Layout>
      </Layout>
    </div>
  );
}

export default EditProfile;
