import React, { Component } from "react";
import { connect } from 'react-redux';
import { getHistory } from '../redux/actions/loanbook';
import Navbar from '../components/Navbar';

class HistoryBorrow extends Component {
    constructor(props) {
        super(props) 
            this.state = {
                loanList : [],
                card_number: localStorage.card_number
            }
    }

    componentDidMount = async () => {
        await this.props.dispatch(getHistory())
        .then((res) => {
            console.log(res);
        }) 
    }
      render() {
        return (
         <div>
          <Navbar />
          <div className="container">
            <div className="row mt-5">
              <table class="table">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">List Buku Dipinjam</th>
                  </tr>
                </thead>
                <tbody>
                {this.props.loanList.map((item) => {
                  if(item.card_number === this.state.card_number) {
                      return(
                        <div>
                        <th scope="row">{item.id_book}</th>
                        <td><img src={item.image} alt="..." height="150px;" width="100px"/></td>
                        <td><h5 class="card-title">Tanggal pengembalian : {item.expired_date}</h5> </td>
                        <td><p class="card-text"><small class="text-muted">Jumlah denda: {item.forfeit}</small></p></td>
                        </div>
                      )
                  }
                })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        loanList: state.loan.loanList
    }
}
  
export default connect(mapStateToProps)(HistoryBorrow);




  


