import React from "react";
import { Modal } from "react-bootstrap";
import LogoBlanco from "../../../assets/png/logo-white.png";

import "./BasicModal.scss";

export default function BasicModal(props) {
  //show nos dira si el modal esta visible o oculto, setShow para poder cerrar el modal desde adentro, y el children sera lo q el modal va a renderizar lo q vaa mostrar
  const { show, setShow, children } = props;

  return (
    <Modal
      className="basic-modal"
      show={show}
      onHide={() => setShow(false)}
      centered
      size="lg"
    >
      <Modal.Header>
        <Modal.Title>
          <img src={LogoBlanco} alt="Parcha" />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
}
