import React, { Component } from 'react'
import { Container, Row, Col, CardImg, CardBody, Card } from 'reactstrap';
import {Link} from 'react-router-dom';
import '../css/BookList.css'

function text(text) {
    if (text.length > 25) {
      let textSplit = text.substr(0, 20)
      return `${textSplit} ...`
    } else {
      let textSplit = text
      return `${textSplit}`
    }
}

class BookList extends Component {
    render() {
      return(
      <Container>
       <Row>
        {this.props.data.map((item, index) =>
        <Col md={3}>
          <div className="list">
            <Card>
                <div>
                  <Link to={'/home/' + item.id_book }>
                    <CardImg img
                      className="img" height="400px"
                      src={item.image}
                      alt="gambar"/>
                    <CardBody>
                    <p className="font">{text(item.title)} </p>
                    {item.status && item.status === 1 ? <h4 style={{backgroundColor: "#FF4500",}}><b>Not Available</b></h4> : <h4 style={{backgroundColor: "#5ee31e"}}><b>Available</b></h4> }
                    </CardBody>
                  </Link>
                </div>
            </Card>
          </div>
        </Col>
        )}
       </Row>
       </Container>
      )
   }
}

export default BookList
