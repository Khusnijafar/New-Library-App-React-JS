import React, {Component} from 'react';
import Navbar from '../components/Navbar';
import {Jumbotron, Modal, Form, ModalHeader, ModalBody, FormGroup, Label, Col, Input, ModalFooter, Button} from 'reactstrap';
import '../css/BookDetail.css';
import swal from 'sweetalert';
import Api from '../axios/Api';
import { connect } from 'react-redux';
import moment from 'moment';
import Axios from 'axios';

class BookDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      id_params: props.match.params.id_book,
      modal: false,
      redirect: false,
      id_book: "",
      id_category: "",
      title: "",
      name_category: "",
      image: "",
      writer: "",
      description: "",
      status: "",
      location: "",
      updated_at: "",
      information: ''
    }
    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }

  componentWillMount() {
    // console.log(this.props.data);
    // console.log(this.state.id_params);
    if (this.props.data.length === 0) {
      this.props.history.push('/home')
    } else {
      let dataBook = this.props.data.find((item) => 
         Number(item.id_book) === Number(this.state.id_params)
      )
      // console.log(dataBook);
      this.setState({
        id_book: dataBook.id_book,
        id_category: dataBook.id_category,
        title: dataBook.title,
        name_category: dataBook.name_category,
        image: dataBook.image,
        writer: dataBook.writer,
        description: dataBook.description,
        status: dataBook.status,
        location: dataBook.location,  
        updated_at: dataBook.updated_at,
      })
    }
  }

  deleteBook() {
        swal({
            title: "Delete !",
            text: "Deleted Success !!",
            icon: "success",
            button: "oke"
        });
      this.setState.redirect = true;
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  borrowBook = (e) => {
    e.preventDefault()
    if (parseInt(this.props.id_user) === 41) {
      
    }
  }

  borrowBooks = async () => {
    let data = {
      card_number: localStorage.card_number,
      id_book: this.state.id_book,
      expired_date: moment().add(10, 'days').format('ll'),
      forfeit: 0,
      information: this.state.information
    }
    let headers = {'authorization':'khusni', 'Content-Type': 'application/json', 'x-access-token': `bearer ${localStorage.token}`, 'x-control-user': localStorage.id_user} 

    Axios.post(`https://library-app-backend.herokuapp.com/loanbooks/${data.id_book}`, data, {headers})
    .then((response) => {
      console.log(response);
      
      swal({
        title: "Borrow",
        text: "Borrow Book Success",
        icon: "success",
        button: "oke",
      })
      this.props.history.push('/home')
    })
    .catch((error) => {
      swal({
        title: "Borrow",
        text: "Borrow Book Failed",
        icon: "warning",
        button: "oke",
      })
    })
  }

  updateFinish = async (e) => {
    e.preventDefault();

    await Api.patch("/home" + this.state.id_params, {
      title: this.state.title,
      image: this.state.image,
      writer: this.state.writer,
      description: this.state.description,
      location: this.state.location,
      id_category: this.state.id_category,
      status: this.state.status
    })
      .then(response => 
        console.log(response.data)
      )
    swal({
      title: "Update",
      text: "Data has been updated",
      icon: "success",
      button: "oke",
    })
    this.props.history.push('/home')
  }

  deleteBook = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then(async (willDelete) => {
        if(willDelete) {
          await Api.delete('/home' + this.state.id_book)
            .then(response => 
              console.log(response.data)
            )
          this.props.history.push('/home')
          swal("Your data has been deleted", {
            icon: "success"
          })
        } else {

        }
      })
  }

  render() {
    return (
      <div>
        <Navbar />
        <Jumbotron className="header-book">
          {
            localStorage.token ?
          <div className="button-detail">
            <button onClick={this.toggle} className="btn btn-info"><h3>Edit</h3></button>
            <button onClick={() => this.deleteBook()} className="btn btn-danger"><h3>Delete</h3></button>
            <button data-toggle="modal" data-target=".bd-example-modal-lg" className="btn btn-success"><h3>Borrow</h3></button>
          </div> 
          : <div></div> 
          } 
          <div className="header-book">
            <img src={this.state.image} width="100%" alt="" />
          </div>
        </Jumbotron>
        <div className="book-child">
          <img src={this.state.image} alt="" width="200px" className="img-mini" />
          {this.state.status === 1 ? <h4 style={{backgroundColor: "#FF4500",}}><b>Not Available</b></h4> : <h4 style={{backgroundColor: "#5ee31e"}}><b>Available</b></h4> }
        </div>
        <Jumbotron className="book-description">
          <h2>{this.state.title}</h2>
          <h2>{this.state.writer}</h2>
          <h4>{this.state.created_at}</h4>
          <br /><br />
          <p>{this.state.description}</p>
        </Jumbotron>
        <div>
          <Modal isOpen={this.state.modal} toggle={this.toggle} className="{this.props.className} modal-lg">
            <Form onSubmit={this.updateFinish}>
              <ModalHeader toggle={this.toggle}>Edit Data</ModalHeader>
              <ModalBody>
                  <FormGroup row>
                      <Label sm={3} size="lg">Image URL</Label>
                      <Col sm={9}>
                        <Input type="text" name="" id="" placeholder="Url Image..." bsSize="lg" value={this.state.image} />
                      </Col>
                  </FormGroup>
                  <FormGroup row>
                      <Label sm={3} size="lg">Title</Label>
                      <Col sm={9}>
                        <Input type="text" name="title" id="" bsSize="lg" value={this.state.title} onChange={this.handleChange} />
                      </Col>
                  </FormGroup>
                  <FormGroup row>
                      <Label sm={3} size="lg">Writer</Label>
                      <Col sm={9}>
                        <Input type="text" name="writer" id="" bsSize="lg" value={this.state.writer} onChange={this.handleChange} />
                      </Col>
                  </FormGroup>
                  <FormGroup row>
                      <Label sm={3} size="lg">Location</Label>
                      <Col sm={9}>
                        <Input type="text" name="location" id="" bsSize="lg" value={this.state.location} onChange={this.handleChange} />
                      </Col>
                  </FormGroup>
                  <FormGroup row>
                      <Label sm={3} size="lg">Description</Label>
                      <Col sm={9}>
                        <Input type="textarea" name="description" id="" value={this.state.description} onChange={this.handleChange} />
                      </Col>
                  </FormGroup>
                  <FormGroup row>
                      <Label sm={3} size="lg">Category ID</Label>
                      <Col sm={9}>
                        <Input type="text" name="category_id" id="" bsSize="lg" value={this.state.id_category} onChange={this.handleChange} />
                      </Col>
                  </FormGroup>
              </ModalBody>
              <ModalFooter>
                  <Button type="submit" color="primary" onClick={this.toggle}>Save</Button>
              </ModalFooter>
            </Form>
          </Modal>
             <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Borrow Book</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                        </div>
                        <div class="modal-body">
                            <div className="row">
                                <div className="col-4">
                                    <img src={this.state.image} width="200px" alt="gambar" />
                                        </div>
                                        <div className="col-7" >
                                            <div className="row">
                                                <div className="col-4">Title</div>
                                                <div className="col-8"><b>: {this.state.title}</b></div>
                                            </div>
                                            <div className="row">
                                                <div className="col-4">Writer</div>
                                                <div className="col-8">: {this.state.writer}</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-4">Category</div>
                                                <div className="col-8">: {this.state.name_category}</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-4">Description</div>
                                                <div className="col-8">: {this.state.description.slice(0, 300)}</div>
                                            </div>
                                            <hr />
                                            <br />
                                            <h5>Tanggal Pengembalian : {moment().add(10, 'days').format('ll')} </h5>
                                            <hr />
                                            <br />
                                            <h6>Keterangan</h6>
                                            <p><i>Harap dikembalikan tepat waktu, jika terlambat akan dikenakan denda sesuai aturan yang berlaku.</i></p>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={this.borrowBooks}>Borrow</button>
                                </div>
                            </div>
                        </div>
                    </div>
                 </div>
           </div>
    )
  }
}

const mapStateToProps = state => {
  return {
      jumlah: state.books.jumlah,
      data: state.books.data,
  }

}

export default connect(mapStateToProps)(BookDetail)
