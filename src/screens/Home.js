import React, { Component } from 'react'
import '../css/BookList.css'
import { connect } from 'react-redux'
import { getBooks } from '../redux/actions/books'
import Navbar from '../components/Navbar';
import BookSearch from '../components/BookSearch';
import BookList from '../components/BookList';
import Donation from '../components/Donation';


class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            counter: 0
        }
    }
    componentDidMount = async () => {
        await this.props.dispatch(getBooks())
    }
    render() {
      return(
      <div>
        <Navbar />
        <BookSearch />
        <Donation />
        <BookList data={this.props.data}/>
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

export default connect(mapStateToProps)(Home);
