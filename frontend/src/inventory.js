import React from "react";
import { Table, Button,message } from "antd";
import {AddInventory} from './addInventory'
import "./App.css";

export default class InventoryTable extends React.Component {
  constructor(props) {
    super(props);
    this.outerColumns = [
      { title: "Product SKU", dataIndex: "SKU", key: "SKU" },
      { title: "Total Quantity", dataIndex: "total", key: "total" },
    ];

    this.innerColumns = [
      { title: "Quantity", dataIndex: "quantity", key: "quantity" },
      { title: "Price", dataIndex: "price", key: "price" },
      { title: "Type", dataIndex: "type", key: "type" },
      { title: "Cause", dataIndex: "cause", key: "cause" },
      { title: "CreatedAt", dataIndex: "createdAt", key: "createdAt" },
      { title: "UpdatedAt", dataIndex: "updatedAt", key: "updatedAt" },
    ];
    this.state = {
      outerColumns: this.outerColumns,
      innerColumns: this.innerColumns,
      outerData: [],
      inventories: [],
      inventoryEnable: false
    };
  }

  componentDidMount() {
    fetch("http://localhost:4000/inventory/get")
      .then(async (res) => res.json())
      .then(
        async (result) => {
          this.setState({
            inventories: result,
          });

          this.setState({ outerData: result });
          this.state.outerData.forEach((data, i) => {
            data.key = i;
          });
        },
        (error) => {
          console.log(error);
          message.error("Server error in fetching Inventories")
        }
      );
  }

  toggleAddEnable(){
    this.setState({inventoryEnable: this.state.inventoryEnable ? false : true});
    this.componentDidMount()
  }

  render() {
    return (
      <div>
        {!this.state.inventoryEnable && <Table
          className="components-table-demo-nested"
          columns={this.state.outerColumns}
          expandable={{
            expandedRowRender: (record) => (
              <Table
                columns={this.state.innerColumns}
                dataSource={record.allRecords}
                pagination={false}
              />
            ),
          }}
          dataSource={this.state.outerData}
        />}
        
        {this.state.inventoryEnable ? <AddInventory/> : null}

        <Button type="primary" onClick={() => this.toggleAddEnable()}>{!this.state.inventoryEnable ? "Add Inventory" : "Back"}</Button>

      </div>
    );
  }
}
