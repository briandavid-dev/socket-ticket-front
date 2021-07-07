import React, { useState, useContext } from "react";
import { Col, Button, Row, Typography, Divider } from "antd";
import { CloseCircleOutlined, DoubleRightOutlined } from "@ant-design/icons";
import useHideMenu from "../hooks/useHideMenu";
import { getUsuarioStorage } from "../helpers/getUsuarioStorage";
import { Redirect, useHistory } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";

const { Title, Text } = Typography;

const Escritorio = () => {
  useHideMenu(false);
  const history = useHistory();
  const { socket } = useContext(SocketContext);
  const [ticket, setTicket] = useState(null);
  const [usuario] = useState(getUsuarioStorage());

  const salir = () => {
    localStorage.clear();
    history.replace("/ingresar");
  };

  const siguienteTicket = () => {
    socket.emit(`siguiente-ticket`, usuario, (ticket) => {
      setTicket(ticket);
    });
  };

  if (!usuario.agente || !usuario.escritorio) {
    return <Redirect to="/ingresar" />;
  }

  return (
    <>
      <Row>
        <Col span={20}>
          <Title level={2}>{usuario.agente}</Title>
          <Text>Estas trabajando en el escritorio: </Text>
          <Text type="success">{usuario.escritorio}</Text>
        </Col>
        <Col span={4} align="right">
          <Button shape="round" type="danger" onClick={salir}>
            <CloseCircleOutlined />
            Salir
          </Button>
        </Col>
      </Row>
      <Divider></Divider>

      {ticket && (
        <Row>
          <Col>
            <Text>Estas atendiendo el ticket número: </Text>
            <Text style={{ fontSize: 30 }} type="danger">
              {ticket.numero}
            </Text>
          </Col>
        </Row>
      )}

      <Row>
        <Col offset={18} span={6} align="right">
          <Button
            onClick={siguienteTicket}
            shape="round"
            type="primary"
            icon={<DoubleRightOutlined />}
          >
            Siguiente
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default Escritorio;
