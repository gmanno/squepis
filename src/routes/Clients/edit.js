import React, { useState, useCallback, useEffect } from "react";
import { Form, Input, Card, Button, message } from "antd";
import { useIntl } from "react-intl";
import { cpfMask, phoneMask } from "util/masks";

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
            email: data.result.email,
            cpf: data.result.cpf,
            phone: data.result.phone,
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

  const changeCpf = (e) => {
    form.setFieldsValue({ cpf: cpfMask(e.target.value) });
  };
  const changePhone = (e) => {
    form.setFieldsValue({ phone: phoneMask(e.target.value) });
  };

  return (
    <Card
      className="gx-card"
      title={`Adicionar novo ${intl.formatMessage({
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
              message: `Insira o nome do ${intl.formatMessage({
                id: `routes.add.${url}`,
              })}`,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: `Insira um e-mail válido`,
            },
            {
              required: true,
              message: `Insira o email do ${intl.formatMessage({
                id: `routes.add.${url}`,
              })}`,
            },
          ]}
        >
          <Input maxLength="120" />
        </Form.Item>
        <Form.Item
          name="cpf"
          label="CPF"
          rules={[
            {
              required: true,
              message: `Insira o cpf do ${intl.formatMessage({
                id: `routes.add.${url}`,
              })}`,
            },
          ]}
        >
          <Input maxLength="14" onChange={changeCpf} />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Telefone"
          rules={[
            {
              pattern: /\(\d{2}\)\s\d{4,5}-?\d{4}/g,
              message: "Telefone inválido",
            },
            {
              required: true,
              message: `Insira o telefone do ${intl.formatMessage({
                id: `routes.add.${url}`,
              })}`,
            },
          ]}
        >
          <Input maxLength="15" onChange={changePhone} />
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
