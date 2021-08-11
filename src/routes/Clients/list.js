import React, { useEffect, useState, useCallback } from "react";
import IntlMessages from "util/IntlMessages";
import { useIntl } from "react-intl";

import { Card, Table, Dropdown, Menu, Modal, message, Button } from "antd";
import { httpClient } from "util/Api";
import { Link } from "react-router-dom";

const confirm = Modal.confirm;

const List = (props) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const intl = useIntl();

  const url = props.url;

  const onDelete = (key, e) => {
    e.preventDefault();

    const reg = records.filter((item) => item.id === key)[0];
    const registros = records.filter((item) => item.id !== key);
    confirm({
      title: intl.formatMessage({ id: "button.delete.confirm" }),
      content: reg.title,
      okText: "Sim",
      okType: "danger",
      cancelText: "Não",
      onOk() {
        httpClient
          .delete(`${url}/${reg.id}`)
          .then(({ status, data }) => {
            if (status === 200) {
              setRecords(registros);
              message.success(data.message);
            } else {
              message.error(data.message);
            }
          })
          .catch(function (error) {
            message.error("Ocorreu em erro.");
          });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  const submenus = (rec) => {
    return (
      <Menu>
        <Menu.Item>
          <Link to={`${url}/edit/${rec.id}`}>
            <i className="icon icon-edit" />
            <span style={{ paddingLeft: "5px" }}>Editar</span>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <i className="icon icon-trash" />
          <span
            style={{ paddingLeft: "5px" }}
            onClick={(e) => {
              onDelete(rec.id, e);
            }}
          >
            <IntlMessages id="button.delete" />
          </span>
        </Menu.Item>
      </Menu>
    );
  };
  const columns = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "CPF",
      dataIndex: "cpf",
      key: "cpf",
      sorter: (a, b) => a.cpf.localeCompare(b.cpf),
    },
    {
      title: "Telefone",
      dataIndex: "phone",
      key: "phone",
      sorter: (a, b) => a.phone.localeCompare(b.phone),
    },

    {
      title: "Ações",
      render: (text, record) => (
        <div>
          <Dropdown overlay={submenus(record)}>
            <span className="gx-link ant-dropdown-link">
              <IntlMessages id="table.actions" />
              <span
                className="icon icon-menu-down"
                style={{ paddingLeft: "5px" }}
              />
            </span>
          </Dropdown>
        </div>
      ),
    },
  ];

  const list = useCallback ( () => {
    httpClient.get(url).then(({ status, data }) => {
      if (status === 200) {
        setRecords(data);
      } else {
        message.error("Ocorreu um erro");
      }
      setLoading(false);
    })
  },[url]);

  useEffect(() => {
    list();
  }, [list]);

  return (
    <Card
      className="gx-card"
      title={
        <h2 className="title gx-mb-4">
          <IntlMessages id={`sidebar.${url}`} />
        </h2>
      }
      extra={
        <p className="gx-text-primary gx-mb-0 gx-pointer">
          <Link to={`${url}/add`}>
            <Button type="primary">Adicionar</Button>
          </Link>
        </p>
      }
    >
      <Table
        className="gx-table-responsive"
        columns={columns}
        dataSource={records}
        loading={loading}
        rowKey="id"
        bordered
      />
    </Card>
  );
};

export default List;
