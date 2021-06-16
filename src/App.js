import Login from './components/Login';
import Footbar from './components/Footbar';
import { Container, Row, Col,Button } from 'reactstrap';

function App() {
  const stylebtn = {
    backgroundColor: "#002e25",
    borderColor: "#002e25"
  }; 
  const styletext = {
    color: "#002e25"
  };

  return (
    <Container fluid={true}>
      <Row className="min-vh-100">
        <Col xs="6" className="p-5 align-self-center d-flex justify-content-end">
          <Container className="w-75">
            <h1 style={styletext}>ALTIRO SERVICES</h1>
            <p className="fs-5" style={styletext}>
              Altiro service te ayudara a ofrecer tus<br/>
              servicios y/o a encontrar a un ofertante<br/>
              dispuesto a ayudarte
            </p>
            <Button className="w-75 fw-bold" style={stylebtn}>Entrar sin cuenta</Button>
          </Container>
        </Col>
        <Col xs="6" className="p-5 align-self-center">
          <Login/>
        </Col>
        <Footbar/>
      </Row>
    </Container>
  );
}

export default App;
