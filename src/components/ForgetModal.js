import { Formik,Form, Field} from "formik";
import * as Yup from "yup";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup,Label} from 'reactstrap';

function ForgetModal ({modal,toggle}){
    return(
        <Modal isOpen={modal} toggle={toggle} fade={true}>
            <ModalHeader>¿Olvido su contraseña?</ModalHeader>
            <ModalBody>
                <p className="fs-6 lh-sm">Ingrese su correo electronico registrado para recibir las instrucciones para recuperar su contraseña</p>
                <Formik
                initialValues={{
                    username:"",
                }}
                validationSchema={Yup.object().shape({
                    username: Yup.string()
                      .email("Ingrese un correo valido")
                      .required("Ingrese correo"),
                })}
                onSubmit={(values, { setSubmitting }) => {
                    const timeOut = setTimeout(() => {
                      console.log(values);
                      setSubmitting(false);
          
                      clearTimeout(timeOut);
                    }, 1000);
                }}>
                {({ errors, touched, handleChange, handleBlur, values }) => (
                    <Form>
                        <FormGroup className="fw-bold position-relative mb-4">
                            <Label for="username">Correo electronico</Label>
                            <Field type="email" className={errors.username && touched.username ? "form-control is-invalid" : "form-control"} name="username" id="username" placeholder="example@example.com"/>
                            <div className="invalid-tooltip end-0">{errors.username}</div>
                        </FormGroup>
                    </Form>
                )}
                </Formik>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={toggle}>Enviar instrucciones</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancelar</Button>
            </ModalFooter> 
        </Modal>
    );
}

export default ForgetModal;