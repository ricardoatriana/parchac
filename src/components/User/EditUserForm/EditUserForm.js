import React, { useState, useCallback } from "react";
import { Form, Button, Row, Col, Spinner } from "react-bootstrap";
import DatePicker from "react-datepicker";
import es from "date-fns/locale/es";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";

import { API_HOST } from "../../../utils/constant";
import { Camera } from "../../../utils/Icons";
import {
  uploadBannerApi,
  uploadAvatarApi,
  updateInfoApi,
} from "../../../api/user"; //se ejecuta en el onSubmit, esta es la q envia la nueva foto al servidor

import "./EditUserForm.scss";

export default function EditUserForm(props) {
  const { user, setShowModal } = props;
  const [formData, setFormData] = useState(initialValue(user)); //este es un estado para capturar la data al momento de la edicion
  const [bannerUrl, setBannerUrl] = useState(
    //este estado hace que cambie la imagen en el modal pero no se comunica con la BD
    user?.banner ? `${API_HOST}/obtenerBanner?id=${user.id}` : null // esto es un estadoen caso q userbanner exista trae el obtenetBanner (esta es la ruta del endpoint donde enxontramos el banner) sino null
  );
  const [bannerFile, setBannerFile] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(
    user?.banner ? `${API_HOST}/obtenerAvatar?id=${user.id}` : null
  );
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(false); //este estado es el q dice si el spinner es visible o no

  const onDropBanner = useCallback((acceptedFile) => {
    //es la variable donde guardamos el fichero se llama ondropbanner
    const file = acceptedFile[0];
    setBannerUrl(URL.createObjectURL(file));
    setBannerFile(file);
  });
  const {
    getRootProps: getRootBannerProps,
    getInputProps: getInputBannerProps,
  } = useDropzone({
    //esta es una funcion q le vamos a pasar un objeto q es la configuracion del hook de arriba
    accept: "image/jpeg, image/png",
    keyboard: true,
    multiple: false, //con esto solo puede subir 1 imagen
    onDrop: onDropBanner,
  });

  const onDropAvatar = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    setAvatarUrl(URL.createObjectURL(file));
    setAvatarFile(file);
  });
  const {
    getRootProps: getRootAvatarProps,
    getInputProps: getInputAvatarProps,
  } = useDropzone({
    //esta es una funcion q le vamos a pasar un objeto q es la configuracion del hook de arriba
    accept: "image/jpeg, image/png",
    keyboard: true,
    multiple: false, //con esto solo puede subir 1 imagen
    onDrop: onDropAvatar,
  });

  const onChange = (e) => {
    //esta funcion se encarga de actualizar la edicion de datos hecha. La e representa el item q se esta modificand por ejemplo nombre
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    /*console.log("Editando");
     console.log(formData);
    console.log(bannerFile);
    console.log(avatarFile);*/
    if (bannerFile) {
      //esta actualiza babnner en la base de datos
      await uploadBannerApi(bannerFile).catch(() => {
        toast.error("Error al subir el nuevo Banner");
      });
    }
    if (avatarFile) {
      await uploadAvatarApi(avatarFile).catch(() => {
        toast.error("Error al subir el nuevo Avatar");
      });
    }
    await updateInfoApi(formData)
      .then(() => {
        setShowModal(false);
      })
      .catch(() => {
        toast.error("Error al actualizar los datos del usuario");
      });
    setLoading(false);
    window.location.reload();
  };
  return (
    <div className="edit-user-form">
      <div
        className="banner"
        style={{ backgroundImage: `url('${bannerUrl}')` }}
        {...getRootBannerProps()} //
      >
        <input {...getInputBannerProps()} />
        <Camera />
      </div>
      <div
        className="avatar"
        style={{ backgroundImage: `url('${avatarUrl}')` }}
        {...getRootAvatarProps()} //
      >
        <input {...getInputAvatarProps()} />
        <Camera />
      </div>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Row>
            <Col>
              <Form.Control
                type="text"
                placeholder="Nombre"
                name="nombre"
                defaultValue={formData.nombre}
                onChange={onChange}
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Apellidos"
                name="apellido"
                defaultValue={formData.apellido}
                onChange={onChange}
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Form.Control
            as="textarea"
            row="3"
            placeholder="Agrega tu biografia"
            type="text"
            name="biografia"
            defaultValue={formData.biografia}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Sitio Web"
            name="sitioWeb"
            defaultValue={formData.sitioWeb}
            onChange={onChange}
          />
        </Form.Group>

        <Form.Group>
          <DatePicker
            placeholder="Fecha Nacimiento"
            locale={es}
            selected={new Date(formData.fechaNacimiento)}
            onChange={(value) =>
              setFormData({ ...formData, fechaNacimiento: value })
            }
          />
        </Form.Group>
        <Button className="btn-submit" variant="primary" type="submit">
          {loading && <Spinner animation="border" size="sm" />}Actualizar
        </Button>
      </Form>
    </div> //4 lineas arriba.Si loading es true etnoces carga spinner
  );
}

function initialValue(user) {
  //si user.nombre poner user.nombre de lo contrario "". Esta funcion inicializa el estado
  return {
    nombre: user.nombre || "",
    apellido: user.apellido || "",
    biografia: user.biografia || "",
    ubicacion: user.ubicacion || "",
    sitioWeb: user.sitioWeb || "",
    fechaNacimiento: user.fechaNacimiento || "",
  };
}
