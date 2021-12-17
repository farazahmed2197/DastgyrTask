import React, { useState } from "react";
import { Form, Input, Button, Select, InputNumber, message } from "antd";

export const AddInventory = () => {
  const [componentSize, setComponentSize] = useState("default");
  const [form] = Form.useForm();

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const addInventoryInDb = () => {
    const formValues = form.getFieldsValue();
    const body = {
      sku: formValues.sku,
      quantity: formValues.quantity,
      price: formValues.price,
      type: formValues.type,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    fetch("http://localhost:4000/inventory/add", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.error) message.error(("Error: " , data.message));
        else {
          message.success("Inventory record added!");
          form.resetFields();
        }
      })
      .catch((error) => message.error("Something went wrong"));
  };

  return (
    <div>
      <Form
        form={form}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >
        <Form.Item label="SKU" name="sku" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Quantity"
          name="quantity"
          rules={[{ required: true }, { type: "number" }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true }, { type: "number" }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item label="Type" name="type" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="purchase">Purchase</Select.Option>
            <Select.Option value="sales">Sales</Select.Option>
            <Select.Option value="damage">Damage</Select.Option>
            <Select.Option value="return">Return</Select.Option>
            <Select.Option value="stolen">Stolen</Select.Option>
          </Select>
        </Form.Item>
      </Form>
      <Button
        style={{ marginBottom: "10px" }}
        type="primary"
        onClick={addInventoryInDb}
      >
        Submit
      </Button>
    </div>
  );
};
