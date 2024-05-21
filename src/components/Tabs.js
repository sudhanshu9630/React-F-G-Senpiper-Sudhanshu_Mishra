import { useState } from "react";
import Form from "./Form";
import Table from "./Table";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("form");

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container">
      <div className="header">
        <div className="tabs">
          <div
            className={activeTab === "form" ? "tab active-tab" : "tab"}
            onClick={() => toggleTab("form")}
          >
            <p>Form</p>
          </div>
          <div
            className={activeTab === "table" ? "tab active-tab" : "tab"}
            onClick={() => toggleTab("table")}
          >
            <p>Table</p>
          </div>
        </div>
        <div className={activeTab === "table" ? "logo logo-table" : "logo"}>
          <h1>F&G</h1>
        </div>
      </div>

      <div className="tab-contents">
        <div
          className={
            activeTab === "form" ? "content active-content" : "content"
          }
        >
          <Form />
        </div>
        <div
          className={
            activeTab === "table" ? "content active-content" : "content"
          }
        >
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Tabs;
