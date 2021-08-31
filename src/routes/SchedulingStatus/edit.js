import React, { useState, useCallback, useEffect } from "react";
import { Form, Input, Card, Button, message } from "antd";
import { useIntl } from "react-intl";
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

const Edit = (props) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const url = props.url;
  const intl = useIntl();
  const onFinish = (values) => {
    setLoading(true);
    httpClient
      .put(url, { id: props.match.params.id, ...values })
      .then(({ status, data }) => {
        if (status === 200) {
          message.success(data.message);
          form.resetFields();
          props.history.push(`/${url}`);
        } else {
          message.error("Ocorreu um erro");
        }
        setLoading(false);
      });
  };

  const getRecord = useCallback(() => {
    httpClient
      .get(`${url}/${props.match.params.id}`)
      .then(({ status, data }) => {
        if (status === 200) {
          form.setFieldsValue({
            name: data.result.name,
            duration: data.result.duration,
          });
        } else {
          message.error("Ocorreu um erro");
        }
        setLoading(false);
      });
  }, [url, props, form]);

  useEffect(() => {
    getRecord();
  }, [getRecord]);

  return (
    <Card
      className="gx-card"
      title={`Editar ${intl.formatMessage({
        id: `routes.add.${url}`,
      })}`}
    >
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
              message: "Insira o título do status",
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

export default Edit;
