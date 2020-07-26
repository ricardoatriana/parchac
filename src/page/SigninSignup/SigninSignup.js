import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUsers,
  faComment,
} from "@fortawesome/free-solid-svg-icons";

import BasicModal from "../../components/Modal/BasicModal";
import SignUpForm from "../../components/SignUpForm";
import SignInForm from "../../components/SignInForm";
import LogoParcha from "../../assets/png/logo.png";
//import ManosBlanca from "../../assets/png/jilyaBlanco.png";
import LogoBlanco from "../../assets/png/logo-white.png";
//import ManosNegra from "../../assets/png/jilyaNegro.png";

import "./SigninSignup.scss";

export default function SigninSignup(props) {
  const { setRefreshCheckLogin } = props;
  const [showModal, setShowModal] = useState(false); //este usestate esta en true entonces hace q se mantenga abierto el modal si se pone en false se apaga
  const [contentModal, setcontentModal] = useState(null);
  //vamos a crer una funcion q se encarga de abrir y añadir contenido al modal
  const openModal = (content) => {
    setShowModal(true);
    setcontentModal(content);
  };
  return (
    <>
      <Container className="signin-signup" fluid>
        <Row>
          <LeftComponent />
          <RightComponent
            openModal={openModal}
            setShowModal={setShowModal}
            setRefreshCheckLogin={setRefreshCheckLogin}
          />
        </Row>
      </Container>
      {/*El div es el children de BasicModal*/}
      <BasicModal show={showModal} setShow={setShowModal}>
        {/* El contentmodal es un estado y su valor sera lo q se tenga en la pagina */}
        {contentModal}
      </BasicModal>
    </>
  );
}

function LeftComponent() {
  return (
    <Col className="signin-signup__left" xs={6}>
      <img src={LogoParcha} alt="Parcha" />
      <div>
        <h2>
          <FontAwesomeIcon icon={faSearch} />
          Sigue lo que te interesa
        </h2>
        <h2>
          <FontAwesomeIcon icon={faUsers} />
          Enterate de lo que esta hablando la gente
        </h2>
        <h2>
          <FontAwesomeIcon icon={faComment} />
          Unete a la conversacion
        </h2>
      </div>
    </Col>
  );
}
function RightComponent(props) {
  const { openModal, setShowModal, setRefreshCheckLogin } = props;
  return (
    <Col className="signin-signup__right" xs={6}>
      <div>
        <img src={LogoBlanco} alt="Parcha" />
        <h2>Mira lo que esta pasando en el mundo en este momento</h2>
        <h3>Unete a Parcha hoy mismo</h3>
        <Button
          variant="primary"
          onClick={() => openModal(<SignUpForm setShowModal={setShowModal} />)} //el setShowModal es para q puede apagarse
        >
          Registrate
        </Button>
        <Button
          variant="outline-primary"
          onClick={() =>
            openModal(
              <SignInForm setRefreshCheckLogin={setRefreshCheckLogin} />
            )
          }
        >
          Iniciar Sesión
        </Button>
      </div>
    </Col>
  );
}
