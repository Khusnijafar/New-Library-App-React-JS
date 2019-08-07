import React, {Component} from 'react';
import BookDetail from '../screens/BookDetail';
import Home from '../screens/Home';
import RegisterPage from '../screens/FormRegister';
import LoginPage from '../screens/FormLogin';
import HistoryBorrow from '../screens/HistoryBorrow'
import { Route , BrowserRouter as Router } from "react-router-dom";
import Returning from '../screens/Returning';

class Routes extends Component {
  render() {
    return (
        <div>
        <Router>
          <Route exact path='/register' component={RegisterPage} />
          <Route exact path='/login' component={LoginPage} />
          <Route exact path="/home" component={Home}/>
          <Route exact path={"/home/:id_book"} component={BookDetail}/>
          <Route exact path={"/history"} component={HistoryBorrow}/>
          <Route exact path={"/return"} component={Returning}/>
        </Router>
        </div>
    );
  }
};

export default Routes
