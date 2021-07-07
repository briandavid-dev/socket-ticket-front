import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { Form, Input, Button, InputNumber, Typography, Divider } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import useHideMenu from "../hooks/useHideMenu";
import { getUsuarioStorage } from "../helpers/getUsuarioStorage";

const { Title, Text } = Typography;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};

const Ingresar = () => {
  useHideMenu(false);
  const [usuario] = useState(getUsuarioStorage());

  const history = useHistory();

  const onFinish = (values) => {
    const { agente, escritorio } = values;

    localStorage.setItem("agente", agente);
    localStorage.setItem("escritorio", escritorio);

    history.push("/escritorio");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  if (usuario.agente && usuario.escritorio) {
    return <Redirect to="/escritorio" />;
  }

  return (
    <>
      <Title level={2}>Ingresar</Title>
      <Text>Ingrese su nombre y su número de escritorio</Text>
      <Divider></Divider>

      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Agente"
          name="agente"
          rules={[{ required: true, message: "Please input agente!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Escritorio"
          name="escritorio"
          rules={[{ required: true, message: "Please input  escritorio!" }]}
        >
          <InputNumber min={1} max={99} />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" shape="round">
            <SaveOutlined />
            Ingresar
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Ingresar;
