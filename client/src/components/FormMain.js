import React, { Component } from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button  from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import '../App.css';

export default class FormMain extends Component {
  constructor() {
    super();
    this.state = {
      isSubscribeSuccessful: null
    }
  }
 
  handleClose = () => {
    this.setState({isSubscribeSuccessful: false});
    document.getElementById("main-form").reset();
    return;
  }
  handleSubmit = (event) => {
    event.preventDefault();


    const data = new FormData(event.target);
    let dataObj = {};

    for (var pair of data.entries()) {
      dataObj[pair[0]] = pair[1];
    }


    axios.post('/api/sendformdata',dataObj,{
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
      .then((res) => {
        if (res.status === 200) {
         this.setState({isSubscribeSuccessful: true});
         return; 
        }
        else {
          this.setState({isSubscribeSuccessful: false})
          return;
        }
      })
      .catch((err) => {
        this.setState({isSubscribeSuccessful: false})
        console.error("ERROR", err);
      });
     
  }

    render() {
        return (
    
                <div className="App">
       <header>
         <h1 className="title">Church Connect</h1>
       </header> 
       {/*Modal for isSubscribeSuccessful*/}
       <Modal show={this.state.isSubscribeSuccessful} onHide={this.handleClose} centered>
              <Modal.Header>
                <Modal.Header>
                  Thank you for signing up!
                </Modal.Header>
                <Button variant="primary" onClick={this.handleClose}>
                    Close
                </Button>
              </Modal.Header>

            </Modal>
     <div className="Modal" > 
        <Form onSubmit={this.handleSubmit} id="main-form">
          <Form.Label className="form-label">Full Name</Form.Label>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridFirstName">
                <Form.Control name="first" className="form-control" type="text" placeholder="First" required/>

              </Form.Group>
   
              <Form.Group as={Col} controlId="formGridLastName">
                <Form.Control  name="last" className="form-control" type="text" placeholder="Last" required />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group className="col-md-6" as={Col} controlId="formGridCellNumber">
                <Form.Control  name="number" className="form-control" type="tel" placeholder="Cell Number" required />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridEmail" >
                <Form.Control name="email" type="email" placeholder="Email" required />
              </Form.Group>
            </Form.Row>
            

          <Form.Label className="form-label">Address</Form.Label>
            <Form.Group controlId="formGridAddress1">
              <Form.Control name="address1" className="form-control" type="text" placeholder="Address Line 1" required />
            </Form.Group>

  
            <Form.Group  controlId="formGridAddress2">
              <Form.Control name="address2" className="form-control"type="text" placeholder="Address Line 2"/>
            </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Control name="city" className="form-control" type="text" placeholder="City" required />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Control name="zip" placeholder="Zip" required />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Control name="state" className="form-control" placeholder="State" id="state" required />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCountry">
              <Form.Control name="country" className="form-control" placeholder="Country" required />
            </Form.Group>
          </Form.Row>
    
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Check type="switch" name="churchmin" defaultChecked id="church-ministries" label="Church Ministries" />
      
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Check type="switch" name="fammin" defaultChecked id="family-ministries" label="Family Ministries"/>
            </Form.Group>
      
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Check type="switch" name="singmin" defaultChecked id="single-minstries" label="Single Ministries" />
      
            </Form.Group>
            <Form.Group  as={Col}>
              <Form.Check type="switch" name="coupmin" defaultChecked id="couples-ministries" label="Couples Minstries" />
            </Form.Group>
      
          </Form.Row>
          <Form.Group>
            <Form.Check type="switch" name="lifehope" defaultChecked id="life-hope-centers" label="Life Hope Centers" />
          </Form.Group>
          <Form.Group>
            <Form.Check 
              required
              label="Agree to terms and conditions"
              feedback="You must agree before submitting"
            />
          </Form.Group>
          
         
        <Button className="submit-button col-md-12" id="submit-button-sign-up"  type="submit">
          Sign Up
        </Button>
      </Form>
      </div>
    </div>
        )
    }
}
