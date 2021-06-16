import React, { Component } from 'react';
import { Container} from 'reactstrap';

class Footbar extends Component {
    state = {  }
    render() {
        const style = {
            backgroundColor: "#002e25",
            heigth: "100px",
        }; 
        return ( 
            <Container style={style} className="w-100">

            </Container>
         );
    }
}
 
export default Footbar;