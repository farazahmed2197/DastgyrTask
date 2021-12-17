import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
} from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

export const AddInventory = () => {
  const [componentSize, setComponentSize] = useState("default");

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return (
    <div>
      <Form
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
        <Form.Item label="SKU">
          <Input />
        </Form.Item>
        <Form.Item label="Quantity">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Price">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Type">
          <Select>
            <Select.Option value="purchase">Purchase</Select.Option>
            <Select.Option value="sales">Sales</Select.Option>
            <Select.Option value="damage">Damage</Select.Option>
            <Select.Option value="return">Return</Select.Option>
            <Select.Option value="stolen">Stolen</Select.Option>
          </Select>
        </Form.Item>
      </Form>
      <Button style={{"marginBottom": "10px"}} type="primary">Submit</Button>
    </div>
  );
};
