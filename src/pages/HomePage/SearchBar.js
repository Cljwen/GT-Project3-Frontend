import React from "react";
import { Input } from "antd";

export default function SearchBar() {
  const { Search } = Input;
  return (
    <Search
      placeholder="What are you looking for?"
      allowClear
      enterButton="Search"
      size="large"
      style={{ width: "90%", margin: "20px 20px" }}
      // onSearch={onSearch}
    />
  );
}
