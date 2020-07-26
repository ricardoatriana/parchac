import React, { useState } from "react";
import { Row, Col, Button, Spinner, Form } from "react-bootstrap";
import { values, size } from "lodash"; //sirve para decirnos si tiene valores, y luego size q nos dice el tamañano de un array un objeto
import { toast } from "react-toastify";
import { isEmailValid } from "../../utils/validations";
import { signUpApi } from "../../api/auth";

import "./SignUpForm.scss";

export default function SignUpForm(props) {
  const { setShowModal } = props;
  const [formData, setFormData] = useState(initialFormValue()); //este es el estado que guarda los datos enviados en el form
  const [signUpLoading, setSignUpLoading] = useState(false); //esta relacionado con spinner, se pone en true luego de exito lleno form

  const onSubmit = (e) => {
    //e de evento , este evento prevee q cuando se envie el form se recargue
    e.preventDefault();
    //setShowModal(false); //est setShowModal es para cerrar el modal cuando se envie

    let validCount = 0;
    values(formData).some((value) => {
      value && validCount++; //si el formdata tiene valor le sumamos 1 a validCount
      return null;
    });

    if (validCount !== size(formData)) {
      toast.warning("Completa todos los campos del formulario");
    } else {
      if (!isEmailValid(formData.email)) {
        toast.warning("Email invalido");
      } else if (formData.clave !== formData.repeatClave) {
        toast.warning("Las contraseñas tienen que ser iguales");
      } else if (size(formData.clave) < 6) {
        toast.warning("La contraseña tiene que tener al menos 6 caracteres");
      } else {
        setSignUpLoading(true); //aqui se poe
        signUpApi(formData) //esta es la peticion a la BD
          .then((response) => {
            if (response.code) {
              toast.warning(response.message); // este error viene desde auth
            } else {
              toast.success("El registro ha sido correcto");
              setShowModal(false);
              setFormData(initialFormValue());
            }
          })
          .catch(() => {
            //en caso de q de error ponemos un .catch
            toast.error("Error del servidor, intentelo mas tarde");
          })
          .finally(() => {
            setSignUpLoading(false); //apaga el spinner
          });
      }
    }
  };
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //si control no viene acompañado de un Onchange no se le puede dar la propiedad value
  return (
    <div className="sign-up-form">
      <h2>Crea tu cuenta</h2>
      <Form onSubmit={onSubmit} onChange={onChange}>
        <Form.Group>
          <Row>
            <Col>
              <Form.Control
                type="text"
                placeholder="Nombre"
                name="nombre"
                defaultValue={formData.nombre}
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Apellidos"
                name="apellido"
                defaultValue={formData.apellido}
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="email"
            placeholder="Correo electronico"
            name="email"
            defaultValue={formData.email}
          />
        </Form.Group>
        <Form.Group>
          <Row>
            <Col>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                name="clave"
                defaultValue={formData.clave}
              />
            </Col>
            <Col>
              <Form.Control
                type="password"
                placeholder="Repetir contraseña"
                name="repeatClave"
                defaultValue={formData.repeatClave}
              />
            </Col>
          </Row>
        </Form.Group>

        <Button variant="primary" type="submit">
          {!signUpLoading ? "Registrase" : <Spinner animation="border" />}
        </Button>
      </Form>
    </div>
    //si singupload es false mostramos Registrase de lo contrario si es true spinner
  );
}

function initialFormValue() {
  return {
    nombre: "",
    apellido: "",
    email: "",
    clave: "",
    repeatClave: "",
  };
}
