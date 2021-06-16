
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter,} from 'reactstrap';

function CreateModal ({modal,toggle}){
    return(
        <Modal isOpen={modal} toggle={toggle} fade={true}>
            <ModalHeader toggle={toggle}>¿Ofertante o cliente?</ModalHeader>
            <ModalBody>
                <Row>
                    <Col sm={6}>
                        <Button>Ofertante</Button>
                    </Col>
                    <Col sm={6}>
                        <p>Si deseas ofrecer tus servicios !Esta es tu opcion!</p>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <Button>Ofertante</Button>
                    </Col>
                    <Col sm={6}>
                        <p>Si deseas ofrecer tus servicios !Esta es tu opcion!</p>
                    </Col>
                </Row>
            </ModalBody>
        </Modal>
    );
}

export default CreateModal;