import React, { useState } from "react";
import { Form, Input, Card, Button, message } from "antd";

import { httpClient } from "util/Api";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Add = (props) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const url = props.url;

  const onFinish = (values) => {
    setLoading(true);
    httpClient.post(url, values).then(({ status, data }) => {
      if (status === 201) {
        message.success(data.message);
        props.history.push(`/${url}`);
        form.resetFields();
      } else {
        message.error("Ocorreu um erro");
      }
      setLoading(false);
    });
  };

  return (
    <Card className="gx-card" title="Adicionar novo registro">
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          name="name"
          label="Nome"
          rules={[
            {
              required: true,
              message: "Insira o nome do registro",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Salvar
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Add;
