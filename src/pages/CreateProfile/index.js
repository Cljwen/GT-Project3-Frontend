// val to populate
import { React, useState, useEffect } from "react";
import "./createprofile.css";
import {
  Sider,
  Footer,
  Content,
  siderStyle,
  contentStyle,
} from "../globalstyles.js";
import { Navbar } from "../../commoncomponents/Navbar/Navbar";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  TreeSelect,
  Upload,
  Select,
  Layout,
  notification,
} from "antd";
import { useAuth0 } from "@auth0/auth0-react";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import { UploadWidget } from "./UploadWidget";
import axios from "axios";
import { useParams, Link, Navigate, useNavigate } from "react-router-dom";

export function CreateProfile() {
  const { TextArea } = Input;
  const { Option } = Select;

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="65">+65</Option>
        <Option value="66">+66</Option>
      </Select>
    </Form.Item>
  );

  let { user_id } = useParams();
  const navigate = useNavigate();
  const { getAccessTokenSilently, user } = useAuth0();
  const [accessToken, setAccessToken] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [api, contextHolder] = notification.useNotification();
  const openSuccessNotification = (placement) => {
    api.info({
      message: `Yippee!`,
      description: "Create profile successful!",
      placement,
      icon: (
        <SmileOutlined
          style={{
            color: "green",
          }}
        />
      ),
    });
    axios
      .get(`http://localhost:3000/${user.email}`, configs)
      .then(function (response) {
        console.log(response);
        navigate(`/${response.data.id}/homepage`);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const openFailureNotification = (placement) => {
    api.info({
      message: `Oh no!`,
      description: "Create profile unsuccessful!",
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

  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
    console.log(formValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3000/createuser`, formValues, configs)
      .then(function (response) {
        console.log(response);
        openSuccessNotification("top");
      })
      .catch(function (error) {
        console.log(error);
        openFailureNotification("top");
      });
  };

  useEffect(() => {
    if (user) {
      setFormValues({
        email: user.email,
        last_name: user.family_name,
        first_name: user.given_name,
        username: user.nickname,
        profile_photo: user.picture,
      });
    }
  }, [user]);

  useEffect(() => {
    if (user && !accessToken) {
      getAccessTokenSilently().then((jwt) => setAccessToken(jwt));
    }
  }, [user, accessToken]);
  console.log(accessToken);


  const configs = {};
  if (accessToken) configs.headers = { Authorization: `Bearer ${accessToken}` };

  const footerStyle = {
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#303841",
    position: "fixed",
    bottom: 0,
    width: "100%",
  };

  const replicateFooterStyle = {
    left: 0,
    bottom: 0,
    width: "100%",
    // position: 'absolute',
    backgroundColor: "#303841",
    position: "fixed",
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
            <div>
              {user && (
                <Form
                  labelCol={{
                    span: 8,
                  }}
                  wrapperCol={{
                    span: 20,
                  }}
                  layout="horizontal"
                  style={{
                    maxWidth: 800,
                  }}
                >
                  <Form.Item label="Current Profile Photo" name="profile_photo">
                    <img alt="" src={formValues.profile_photo} width="200" />
                    <br></br>
                    <UploadWidget
                      setFormValues={setFormValues}
                      formValues={formValues}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Username"
                    name="username"
                    onChange={handleInputChange}
                    defaultValue={user.nickname}
                  >
                    <Input
                      placeholder={user.nickname}
                      // defaultValue={user.nickname}
                    />
                  </Form.Item>
                  <Form.Item
                    label="First Name"
                    name="first_name"
                    onChange={handleInputChange}
                  >
                    <Input placeholder={formValues.first_name} />
                  </Form.Item>
                  <Form.Item
                    label="Last Name"
                    name="last_name"
                    onChange={handleInputChange}
                  >
                    <Input placeholder={formValues.last_name} />
                  </Form.Item>
                  <Form.Item
                    label="Email"
                    name="email"
                    onChange={handleInputChange}
                  >
                    <Input placeholder={formValues.email} />
                  </Form.Item>

                  <Form.Item
                    name="phone_number"
                    label="Phone Number"
                    rules={[
                      {
                        required: true,
                        message: "Please input your phone number!",
                      },
                    ]}
                    onChange={handleInputChange}
                  >
                    <Input
                      addonBefore="+65"
                      placeholder={formValues.phone_number}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Address"
                    name="address"
                    onChange={handleInputChange}
                  >
                    <Input placeholder={formValues.address} />
                  </Form.Item>
                  <Form.Item
                    label="Postal Code"
                    name="postal_code"
                    onChange={handleInputChange}
                  >
                    <Input placeholder={formValues.postal_code} />
                  </Form.Item>
                  <Form.Item
                    label="Nearest MRT"
                    name="mrt"
                    onChange={handleInputChange}
                  >
                    <Input placeholder={formValues.mrt} />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      onClick={handleSubmit}
                    >
                      Save Changes
                    </Button>
                    <Link to={`/${user_id}/profile`}>Back to Profile</Link>
                  </Form.Item>
                </Form>
              )}
            </div>
          </Content>
          <Footer style={footerStyle}></Footer>
        </Layout>
      </Layout>
    </div>
  );
}

export default CreateProfile;
