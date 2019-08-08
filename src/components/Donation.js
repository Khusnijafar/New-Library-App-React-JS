import React, {Component} from 'react';
import {Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Col, Input, ModalFooter } from 'reactstrap';
import swal from 'sweetalert';
import { addBooks } from '../redux/actions/books';
import { connect } from 'react-redux'

class Donation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      title: '',
      image: '',
      selectedFile: '',
      writer: '',
      description: '',
      location: '',
      id_category: ''
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  onChangeFile = (e) => {
    console.log(e.target.file)
    this.setState({
      selectedFile: e.target.files[0],
      loaded: 0,
    })
  } 

  handleSubmit = async (e) => {
    e.preventDefault()
    const dataFile = new FormData()
    dataFile.append('image', this.state.selectedFile)
    dataFile.append('title', this.state.title)
    dataFile.append('writer', this.state.writer)
    dataFile.append('description', this.state.description)
    dataFile.append('location', this.state.location)
    dataFile.append('id_category', this.state.id_category)

    console.log(this.state);
    await this.props.dispatch(addBooks(dataFile))
      .then((res) => {
        console.log(res.data);
        swal({
          title: "Insert",
          text: "Insert Success",
          icon: "success",
          button: "oke",
        })
      })
      .catch(
        swal({
          title: "Insert",
          text: "Insert Failed",
          icon: "danger",
          button: "oke",
        })
      )
    window.location.reload()
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div>
        <div className="button-add">
          <Button onClick={this.toggle}>{this.props.buttonLabel}Donate</Button>
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className="{this.props.className} modal-lg">
          <Form onSubmit={this.handleSubmit}>
            <ModalHeader toggle={this.toggle}><b>Add Book</b></ModalHeader>
              <ModalBody>
                <FormGroup row>
                  <Label for="exampleEmail" sm={3} size="lg">Image</Label>
                    <Col sm={9}>
                      <Input type="file" name="file" id="file" placeholder="Image..." bsSize="lg" onChange={this.onChangeFile} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleEmail" sm={3} size="lg">Title</Label>
                    <Col sm={9}>
                      <Input type="text" name="title" id="title" placeholder="Title..." bsSize="lg" value={this.state.title} onChange={this.handleChange} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleEmail" sm={3} size="lg">Writer</Label>
                    <Col sm={9}>
                      <Input type="text" name="writer" id="writer" placeholder="Writer..." bsSize="lg" value={this.state.writer} onChange={this.handleChange} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleEmail" sm={3} size="lg">Description</Label>
                    <Col sm={9}>
                      <Input type="textarea" name="description" id="description" placeholder="Description..." bsSize="lg" value={this.state.description} onChange={this.handleChange} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleEmail" sm={3} size="lg">Location</Label>
                    <Col sm={9}>
                      <Input type="text" name="location" id="location" placeholder="Location..." bsSize="lg" value={this.state.location} onChange={this.handleChange} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleEmail" sm={3} size="lg">ID Category</Label>
                    <Col sm={9}>
                      <Input type="text" name="id_category" id="id_category" placeholder="ID Category..." bsSize="lg" value={this.state.id_category} onChange={this.handleChange} />
                    </Col>
                  </FormGroup>
                </ModalBody>
             <ModalFooter>
              <Button type="submit" color="primary" onClick={this.toggle}><span className="button-save">Save</span></Button>
             </ModalFooter>
            </Form>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => {
	return {
		data: state.data
	};
};

export default connect(mapStateToProps)(Donation);
