import { Formik,Form, Field,} from "formik";
import * as Yup from "yup";
import { checkRut, prettifyRut,} from "react-rut-formatter";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup,Label,FormText,Row,Col} from 'reactstrap';


function CreateProviderModal ({modal,toggle}){
    const stylebtn = {
        backgroundColor: "#002e25",
        borderColor: "#002e25"
    }; 
    const styleBorder = {
        borderColor: "#616160"
    }; 
    const styleBorderColor = {
        color: "#616160"
    }; 

    return(
        <Modal isOpen={modal} toggle={toggle} fade={true} size="lg">
            <ModalHeader>Crear usuario ofertante</ModalHeader>
            <ModalBody>
                <Formik
                initialValues={{
                    firstname:"",
                    lastname:"",
                    phone:"",
                    date:"",
                    username:"",
                    rut:"",
                    password:"",
                    repassword:"",
                }}
                validationSchema={Yup.object().shape({
                    firstname: Yup.string()
                        .max(50)
                        .matches(/^[A-Za-z ]*$/, 'Ingrese un nombre valido')
                        .required("Ingrese un nombre"),
                    lastname: Yup.string()
                        .max(50)
                        .matches(/^[A-Za-z ]*$/, 'Ingrese un nombre valido')
                        .required("Ingrese un nombre"),
                    phone: Yup.number()
                        .min(8,"Numero de telefono invalido")
                        .required("Ingrese un numero de telefono"),
                    username: Yup.string()
                        .email("Ingrese un correo valido")
                        .required("Ingrese correo"),
                    rut: Yup.string()
                        .test('test-name', "Rut ingresado no existe",function(value){
                            return checkRut(value);
                        })
                        .required("Ingrese su rut"),
                    password: Yup.string()
                        .matches(/(?=,*[a-z])/,"Se requiere al menos un caracter en minuscula")
                        .matches(/(?=,*[A-Z])/,"Se requiere al menos un caracter en mayuscula")
                        .matches(/(?=,*[0-9])/,"Se requiere al menos un numero")
                        .min(6,"Minimo 6 caracteres")
                        .required("Ingrese su contraseña"),
                    repassword: Yup.string()
                        .oneOf([Yup.ref('password')],"Las contraseñas no coinciden")
                        .required("Ingrese su contraseña"),

                })}
                onSubmit={(values, { setSubmitting }) => {
                    const timeOut = setTimeout(() => {
                      console.log(values);
                      setSubmitting(false);
                      clearTimeout(timeOut);
                    }, 1000);
                }}>
                {({ errors, touched, handleChange, handleBlur, values, setFieldValue }) => (
                    <Form className="mx-3">
                        <p className="mb-1" style={styleBorderColor}>Datos personales</p>
                        <Row className="border border-bottom-0 rounded-top" style={styleBorder}>
                            <Col xs={6}>
                                <FormGroup className=" position-relative mb-4">
                                    <Label for="firstname">Nombre</Label>
                                    <Field type="text" className={errors.firstname && touched.firstname ? "form-control is-invalid" : "form-control"} name="firstname" id="firstname" placeholder="Pedro"/>
                                    <div className="invalid-tooltip end-0">{errors.firstname}</div>
                                </FormGroup>
                            </Col>
                            <Col xs={6}>
                                <FormGroup className=" position-relative mb-4">
                                    <Label for="lastname">Apellido</Label>
                                    <Field type="text" className={errors.lastname && touched.lastname ? "form-control is-invalid" : "form-control"} name="lastname" id="lastname" placeholder="Fuentes"/>
                                    <div className="invalid-tooltip end-0">{errors.lastname}</div>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="border border-top-0 rounded-bottom" style={styleBorder}>
                            <Col xs={4}>
                                <FormGroup className=" position-relative mb-4">
                                    <Label for="rut">Rut</Label>
                                    <Field 
                                        type="text" 
                                        className={errors.rut && touched.rut ? "form-control is-invalid" : "form-control"} 
                                        value={values.rut}
                                        onChange={handleChange}
                                        onBlur={(event) => {
                                            const formatted = prettifyRut(values.rut);
                                            setFieldValue("rut", formatted);
                                            handleBlur(event);
                                            }}
                                        name="rut" 
                                        id="rut" 
                                        placeholder="12.345.678-9"/>
                                    <div className="invalid-tooltip end-0">{errors.rut}</div>
                                </FormGroup>
                            </Col>
                            <Col xs={4}>
                                <FormGroup className=" position-relative mb-4">
                                    <Label for="phone">Numero de telefono</Label>
                                    <Field type="text" className={errors.phone && touched.phone ? "form-control is-invalid" : "form-control"} name="phone" id="phone" placeholder="95234122"/>
                                    <div className="invalid-tooltip end-0">{errors.phone}</div>
                                </FormGroup>
                            </Col>
                            <Col xs={4}>
                                <FormGroup className=" position-relative mb-4">
                                    <Label for="date">Fecha de nacimiento</Label>
                                    <Field type="date" className={errors.date && touched.date ? "form-control is-invalid" : "form-control"} name="date" id="date" placeholder="25/05/1998"/>
                                    <div className="invalid-tooltip end-0">{errors.date}</div>
                                </FormGroup>
                            </Col>
                        </Row>
                        <p className="mb-1" style={styleBorderColor}>Direccion</p>
                        <Row className="border rounded" style={styleBorder}>
                            <Col xs={6}>
                                <FormGroup className=" position-relative mb-4">
                                    <Label for="street">Calle</Label>
                                    <Field type="text" className={errors.street && touched.street ? "form-control is-invalid" : "form-control"} name="street" id="street" placeholder="Calle 2"/>
                                    <div className="invalid-tooltip end-0">{errors.street}</div>
                                </FormGroup>
                            </Col>
                            <Col xs={3}>
                                <FormGroup className=" position-relative mb-4">
                                    <Label for="region">Region</Label>
                                    <Field as="select" className={errors.region && touched.region ? "form-control is-invalid" : "form-control"} name="region" id="region">
                                        <option defaultValue value="0">Seleccione region</option>
                                        <option value="1">Biobio</option>
                                        <option value="2">Santiago</option>
                                    </Field>
                                    <div className="invalid-tooltip end-0">{errors.street}</div>
                                </FormGroup>
                            </Col>
                            <Col xs={3}>
                                <FormGroup className=" position-relative mb-4">
                                    <Label for="comuna">Comuna</Label>
                                    <Field as="select" className={errors.comuna && touched.comuna ? "form-control is-invalid" : "form-control"} name="comuna" id="comuna">
                                        <option defaultValue value="0">Seleccione comuna</option>
                                        <option value="1">Concepcion</option>
                                        <option value="2">Otra</option>
                                    </Field>
                                    <div className="invalid-tooltip end-0">{errors.street}</div>
                                </FormGroup>
                            </Col>
                        </Row>
                        <p className="mb-1" style={styleBorderColor}>Actividad principal</p>
                        <Row className="border rounded" style={styleBorder}>
                            <Col xs={6}>
                                <FormGroup className=" position-relative mb-4">
                                    <Label for="area">Área</Label>
                                    <Field as="select" className={errors.area && touched.area ? "form-control is-invalid" : "form-control"} name="area" id="area">
                                        <option defaultValue value="0">Seleccione area</option>
                                        <option value="1">Agricultura</option>
                                        <option value="2">Industria</option>
                                    </Field>
                                    <div className="invalid-tooltip end-0">{errors.street}</div>
                                </FormGroup>
                            </Col>
                            <Col xs={6}>
                                <FormGroup className=" position-relative mb-4">
                                    <Label for="activity">Actividad</Label>
                                    <Field as="select" className={errors.activity && touched.activity ? "form-control is-invalid" : "form-control"} name="activity" id="activity">
                                        <option defaultValue value="0">Seleccione actividad</option>
                                        <option value="1">Cultivo</option>
                                        <option value="2">Otra</option>
                                    </Field>
                                    <div className="invalid-tooltip end-0">{errors.street}</div>
                                </FormGroup>
                            </Col>
                        </Row>
                        <p className="mb-1" style={styleBorderColor}>Datos de la cuenta</p>
                        <Row className="border border-bottom-0 rounded-top" style={styleBorder}>
                            <Col xs={6}>
                                <FormGroup className=" position-relative mb-4">
                                    <Label for="username">Correo electronico</Label>
                                    <Field type="email" className={errors.username && touched.username ? "form-control is-invalid" : "form-control"} name="username" id="username" placeholder="example@example.com"/>
                                    <div className="invalid-tooltip end-0">{errors.username}</div>
                                </FormGroup>
                            </Col>
                            <Col xs={6}>
                                <FormGroup className=" position-relative mb-4">
                                    <Label for="reusername">Repita correo electronico</Label>
                                    <Field type="email" className={errors.reusername && touched.reusername ? "form-control is-invalid" : "form-control"} name="reusername" id="reusername" placeholder="example@example.com"/>
                                    <div className="invalid-tooltip end-0">{errors.reusername}</div>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="border border-top-0 rounded-bottom" style={styleBorder}>
                            <Col xs={6}>
                                <FormGroup className=" mt-2 position-relative">
                                    <Label for="password">Contraseña</Label>
                                    <Field type="password" className={errors.password && touched.password ? "form-control is-invalid" : "form-control"} name="password" id="password" placeholder=""/>
                                    <div className="invalid-tooltip end-0">{errors.password}</div>
                                    <FormText className="fw-normal">Debe tener mas de 6 caracteres<br/>
                                    Debe tener al menos un caracter en mayuscula y uno en minuscula<br/>
                                    Debe tener al menos un numero
                                    </FormText>
                                </FormGroup>
                            </Col>
                            <Col xs={6}>
                                <FormGroup className=" mt-2 position-relative">
                                    <Label for="repassword">Repita contraseña</Label>
                                    <Field type="password" className={errors.repassword && touched.repassword ? "form-control is-invalid" : "form-control"} name="repassword" id="repassword" placeholder=""/>
                                    <div className="invalid-tooltip end-0">{errors.repassword}</div>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Button block outline type="submit" className="w-100  mt-4" style={stylebtn}>Crear cuenta</Button>
                    </Form>
                )}
                </Formik>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={toggle}>Cancelar</Button>
            </ModalFooter> 
        </Modal>
    );
}

export default CreateProviderModal;