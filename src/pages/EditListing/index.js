//edit individual listing
import React, { useState, useEffect } from "react";
import "./editlisting.css";
import { Navbar } from "../../commoncomponents/Navbar/Navbar";
import {
  Button,
  Input,
  Upload,
  Radio,
  ConfigProvider,
  Layout,
  Form,
  notification,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import { UploadWidget } from "./UploadWidget";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import {
  Footer,
  Sider,
  Content,
  siderStyle,
  contentStyle,
} from "../globalstyles";

export function EditListing() {
  const { logout } = useAuth0();
  const [formValues, setFormValues] = useState({});
  const { getAccessTokenSilently, user } = useAuth0();
  const [accessToken, setAccessToken] = useState(null);
   const [api, contextHolder] = notification.useNotification();
  let { user_id, listing_id } = useParams();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
    console.log(formValues);
  };

  const handleListingTypeChange = (e) => {
    setFormValues({ ...formValues, listing_type: e.target.value });
    console.log(formValues);
  };

  const handleConditionChange = (e) => {
    setFormValues({ ...formValues, condition: e.target.value });
    console.log(formValues);
  };

  const handleBackButtonClick = () => {
    navigate(-1);
  };

 const openSuccessNotification = (placement) => {
   api.info({
     message: `Yippee!`,
     description: "Edit listing successful!",
     placement,
     icon: (
       <SmileOutlined
         style={{
           color: "green",
         }}
       />
     ),
   });
 };
 const openFailureNotification = (placement) => {
   api.info({
     message: `Oh no!`,
     description: "Edit listing unsuccessful!",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:3000/${user_id}/listings/${listing_id}`,
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
    backgroundColor: "#303841",
    position: "fixed",
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
      .get(`http://localhost:3000/${user_id}/listings/${listing_id}`, configs)
      .then(function (response) {
        console.log(response.data);
        setFormValues(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [accessToken]);

  return (
    <>
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
            <Footer style={replicateFooterStyle}></Footer>
          </Sider>
          <Layout>
            <Content style={contentStyle}>
              <div className="content">
                <div className="userName">
                  <div className="userDescription">
                    <div className="profile">
                      <Form.Item label="Current Listing Photo" name="photo_url">
                        <img alt="" src={formValues.photo_url} width="150" />
                        <br></br>
                        <UploadWidget
                          setFormValues={setFormValues}
                          formValues={formValues}
                        />
                      </Form.Item>
                    </div>

                    <Form.Item
                      label="Item name"
                      name="item_name"
                      onChange={handleInputChange}
                    >
                      <Input placeholder={formValues.item_name} />
                    </Form.Item>

                    <Form.Item
                      label="Description"
                      name="description"
                      onChange={handleInputChange}
                    >
                      <Input placeholder={formValues.description} />
                    </Form.Item>

                    <Form.Item
                      label="Category"
                      name="category"
                      onChange={handleInputChange}
                    >
                      <Input placeholder={formValues.category} />
                    </Form.Item>
                    <div className="filterHeader">Listing type:</div>
                    <Radio.Group
                      onChange={handleListingTypeChange}
                      value={formValues.listing_type}
                    >
                      <Radio.Button value="Give">To Give</Radio.Button>
                      <Radio.Button value="Take">To Take</Radio.Button>
                    </Radio.Group>
                    <div className="filterHeader">Condition:</div>
                    <Radio.Group
                      onChange={handleConditionChange}
                      value={formValues.condition}
                    >
                      <Radio.Button value="Brand New">Brand new</Radio.Button>
                      <Radio.Button value="Like New">Like new</Radio.Button>
                      <Radio.Button value="Well Used">Well used</Radio.Button>
                    </Radio.Group>

                    {/* <div className="filterHeader">Status:</div>
                    <Radio.Group
                      onChange={handleStatusChange}
                      defaultValue={formValues.status}
                    >
                      <Radio.Button value="Available">Available</Radio.Button>
                      <Radio.Button value="Taken">Taken</Radio.Button>
                    </Radio.Group> */}
                    <div className="filterHeader"></div>
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
                  </div>
                </div>
              </div>
            </Content>
          </Layout>
        </Layout>
      </ConfigProvider>
    </>
  );
}

export default EditListing;
