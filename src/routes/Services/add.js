import React, { useEffect, useState } from "react";
import { Form, Input, Card, Button, message, Row, Col } from "antd";

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
  const [vehicles, setVehicles] = useState(null);
  const url = props.url;

  const getVehiclesTypes = () => {
    setLoading(true);
    httpClient.get(`vehicles_categories`).then(({ status, data }) => {
      if (status === 200) {
        let content = [];
        data.forEach(({ name, id }, i) => {
          content.push(
            <>
              <Col lg={24} md={24} sm={24} xs={24}>
                <h4>{name}:</h4>
              </Col>
              <Col lg={12} md={12} sm={12} xs={12}>
                <Form.Item
                  name={["service_price", id, "duration"]}
                  label="Duração"
                  rules={[
                    {
                      required: true,
                      message: "Insira a duração do serviço em minutos",
                    },
                  ]}
                >
                  <Input placeholder="duração" />
                </Form.Item>
              </Col>
              <Col lg={12} md={12} sm={12} xs={12}>
                <Form.Item
                  label="Preço"
                  name={["service_price", id, "value"]}
                  rules={[
                    {
                      required: true,
                      message: "Insira o preço",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </>
          );
        });
        setVehicles(content);
      } else {
        message.error("Ocorreu um erro");
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    getVehiclesTypes();
  }, []);

  const onFinish = (values) => {
    setLoading(true);
    let prices = []
    Object.keys(values.service_price).forEach(id=>{
      prices.push( {
        vehicleCategoryId: id,
        ...values.service_price[id]
      });
    })
     
     
    // console.log(prices)
    httpClient.post(url, {...values, service_price: prices}).then(({ status, data }) => {
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
    <Card className="gx-card" title="Adicionar novo serviço">
      <Form
        {...formItemLayout}
        form={form}
        layout="inline"
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Col lg={24} md={24} sm={24} xs={24}>
          <Form.Item
            name="name"
            label="Nome"
            rules={[
              {
                required: true,
                message: "Insira o nome do serviço",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>

        {vehicles}
        <Col lg={24} md={24} sm={24} xs={24}>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Salvar
            </Button>
          </Form.Item>
        </Col>
      </Form>
    </Card>
  );
};

export default Add;
