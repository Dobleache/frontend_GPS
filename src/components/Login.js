import { Formik, Form, Field} from "formik";
import * as Yup from "yup";
import { Button, FormGroup, Label, Container, Row } from 'reactstrap';
import ForgetModal from '../components/ForgetModal';
import CreateProviderModal from '../components/CreateProviderModal';
import CreateModal from '../components/CreateModal';
import useModal from '../hooks/useModal';
import React, { Fragment, useState, useEffect } from 'react';
import axios from "axios";
import backend from "../api/backend" 


function Login () {
    const stylebtn = {
        backgroundColor: "#002e25",
        borderColor: "#002e25"
    }; 
    const styleform = {
        backgroundColor: "#008060",
        borderColor: "#008060",
        color: "white"
    };
    /*const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [modal2, setModal2] = useState(false);
    const toggle2 = () => setModal2(!modal);*/
    const [isShowingForget, toggleForget] = useModal();
    const [isShowingCreate, toggleCreate] = useModal();
    return (
        <Container className="border rounded-3 p-5 w-75" style={styleform}>
            <Formik
                initialValues={{
                    username:"",
                    password:"",
                }}
                validationSchema={Yup.object().shape({
                    username: Yup.string()
                      .email("Ingrese un correo valido")
                      .required("Ingrese correo"),
                      password: Yup.string()
                      .required("Ingrese su contraseña"),
                })}
                onSubmit={(values, { setSubmitting }) => {
                    const timeOut = setTimeout(() => {
                        console.log(values);  
                        //const data = JSON.stringify(values);
                        //console.log(data);   
                        const response = axios
                            .post(backend,values)
                            .catch((err)=> {
                                if (err && err.response);
                            })
                        setSubmitting(false);
                        clearTimeout(timeOut);
                    }, 1000);
                }}>
                {({ errors, touched, handleChange, handleBlur, values }) => (
                <Form method="GET" action="">
                    <FormGroup className="fw-bold position-relative">
                        <Label for="username">Nombre de Usuario</Label>
                        <Field type="email" className={errors.username && touched.username ? "form-control is-invalid" : "form-control"} name="username" id="username" placeholder="example@example.com"/>
                        <div className="invalid-tooltip end-0">{errors.username}</div>
                    </FormGroup>
                    <FormGroup className="fw-bold mt-2 position-relative">
                        <Label for="password">Contraseña</Label>
                        <Field type="password" className={errors.password && touched.password ? "form-control is-invalid" : "form-control"} name="password" id="password" placeholder=""/>
                        <div className="invalid-tooltip end-0">{errors.password}</div>
                    </FormGroup>
                    <Button block outline type="submit" className="w-100 fw-bold mt-4" style={stylebtn}>Ingresar</Button>
                </Form>
                )}
            </Formik>
            <Container className="w-100">
                <Row><Button onClick={ toggleForget } color="link" className="fw-bold text-center text-decoration-none mt-2" style={styleform}>¿Has olvidado tu contraseña?</Button></Row>
                <Row><Container className="border border-top border-2"></Container></Row>
                <Row><Button onClick={toggleCreate} className="w-100 fw-bold mt-2" style={stylebtn}>Crear cuenta</Button></Row>
            </Container>
            <ForgetModal modal={isShowingForget} toggle={toggleForget}/>
            {/*<CreateProviderModal modal={isShowingCreate} toggle={toggleCreate}/>*/}
            <CreateModal modal={isShowingCreate} toggle={toggleCreate}/>
        </Container> 
        );
}
export default Login;