//edit individual listing
import React from "react";
import "./editlisting.css";
// import profilepic from '../assets//images/profilepic.jpeg';
// import bike from '../assets//images/bike.jpg';
import { Navbar } from "../../commoncomponents/Navbar/Navbar";
import book from "../../assets/images/book.webp";
import logo from "../../assets/images/logo.png";

import { Button, Input, Upload, Radio, ConfigProvider, Layout } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useAuth0 } from "@auth0/auth0-react";

import {
  Footer,
  Sider,
  Content,
  siderStyle,
  contentStyle,
} from "../globalstyles";

export function EditListing() {
  const { logout } = useAuth0();
  const [editing, setEditing] = React.useState(false);
  const [editingBio, setEditingBio] = React.useState(false);
  const [listingName, setListingName] = React.useState(
    "Not Without Us book (Original)"
  );
  const [bio, setBio] = React.useState(
    "book has browning on top part other than that very good condition."
  );

  function handleEdit() {
    setEditing(true);
  }

  function handleEditBio() {
    setEditingBio(true);
  }

  function handleSave() {
    setEditing(false);
  }

  function handleBioSave() {
    setEditingBio(false);
  }

  function handleChange(e) {
    setListingName(e.target.value);
  }

  function handleBioChange(e) {
    setBio(e.target.value);
  }

  const onChange = (e) => {
    console.log(`radio checked:${e.target.value}`);
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
    // position: 'absolute',
    backgroundColor: "#303841",
    position: "fixed",
  };
  return (
    <>
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
                      <div className="photo">
                        <img src={book} alt="book" />

                        <Upload action="/upload.do" listType="picture-card">
                          <div>
                            <PlusOutlined />
                          </div>
                        </Upload>
                      </div>
                      <h1>
                        {editing ? (
                          <div>
                            <Input
                              value={listingName}
                              onChange={handleChange}
                            />
                            <Button onClick={handleSave}>Save</Button>
                          </div>
                        ) : (
                          <div onClick={handleEdit}>{listingName}</div>
                        )}
                      </h1>
                    </div>
                    <Radio.Group onChange={onChange} defaultValue="a">
                      <Radio.Button value="a">To Give</Radio.Button>
                      <Radio.Button value="b">To Request</Radio.Button>
                    </Radio.Group>
                    <div className="filterHeader">Condition:</div>
                    <Radio.Group onChange={onChange} defaultValue="a">
                      <Radio.Button value="a">Brand new</Radio.Button>
                      <Radio.Button value="b">Like new</Radio.Button>
                      <Radio.Button value="c">Well used</Radio.Button>
                    </Radio.Group>
                    <div className="filterHeader">Bio:</div>
                    {editingBio ? (
                      <div>
                        <Input
                          value={bio}
                          onChange={handleBioChange}
                          style={{
                            width: 500,
                            height: 100,
                            whiteSpace: "normal",
                          }}
                        />
                        <Button onClick={handleBioSave}>Save</Button>
                      </div>
                    ) : (
                      <div onClick={handleEditBio}>{bio}</div>
                    )}
                    <div className="filterHeader">Status:</div>
                    <Radio.Group onChange={onChange} defaultValue="a">
                      <Radio.Button value="a">Available</Radio.Button>
                      <Radio.Button value="b">Taken</Radio.Button>
                    </Radio.Group>
                    <div className="filterHeader"></div>
                    <Button type="primary">Save</Button>
                    <Button>Cancel</Button>
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
