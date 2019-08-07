import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { getHistory } from '../redux/actions/loanbook'

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
      <div className="container">
        <div className="row mt-5">
          <div className="col-6">
            <ul className="list-group">
              <li className="list-group-item active">Book Transaction</li>
              <li className="list-group-item">Loaning</li>
            </ul>
            <div className="row mt-5">
              <div class="card mb-3" style={{width: "540px"}}>
                {this.props.loanList.map((item) =>{
                  if(item.card_number === this.state.card_number) {
                      return(
                        <div class="row no-gutters">
                          <div class="col-md-4 mb-5">
                            <img src={item.image} class="card-img" alt="..." height="150px;" />
                          </div>
                       <div class="col-md-8">
                          <div class="card-body">
                              <h5 class="card-title">Tanggal pengembalian : {item.expired_date}</h5>                              
                              <p class="card-text"><small class="text-muted">Jumlah denda: {item.forfeit}</small></p>
                              <p class="card-text"><i>note: {item.information}</i></p>
                          </div>
                       </div>
                    </div>
                      )
                  }
              })}
              </div>
            </div>
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