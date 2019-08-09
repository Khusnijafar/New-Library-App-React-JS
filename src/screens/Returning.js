import React, {Component} from 'react';
import { connect } from 'react-redux'
import { getHistory, postHistory } from '../redux/actions/loanbook'
import swal from 'sweetalert';
import Navbar from '../components/Navbar';

class Returning extends Component {
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

    handleReturn = (item) => {
        this.props.dispatch(postHistory(item.id_loanbook, {
            card_number: item.card_number,
            id_book: item.id_book,
            expired_date: item.expired_date,
            forfeit: item.forfeit,
            information: "SELESAI"
        }))
        .then(response => 
            console.log(response.data)
          )
        swal({
          title: "Update",
          text: "Data has been updated",
          icon: "success",
          button: "oke",
        })
       window.location.reload()
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
                if(item.information === 'DIPINJAM') {
                    return(
                      <div>
                      <th scope="row">ID Book: {item.id_book}</th>
                      <td><img src={item.image} alt="..." height="150px;" width="100px"/></td>
                      <td><h5 class="card-title">Tanggal pengembalian : {item.expired_date}</h5> </td>
                      <tr><p class="card-text"><small class="text-muted">Jumlah denda: {item.forfeit}</small></p></tr>
                      <button class="btn btn-primary" onClick={() => this.handleReturn(item)}>Return</button>
                      </div>
                    )
                }
              })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
        )
    }
}



const mapStateToProps = state => {
    return {
        loanList: state.loan.loanList
    }
}
  
export default connect(mapStateToProps)(Returning);