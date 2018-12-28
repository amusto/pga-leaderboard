import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from './Header';
//import Landing from './Landing';
import Dashboard from './Dashboard';
import UserInfo from './UserInfo';
import PlayerList from './players/PlayerList';
import PlayerNew from './players/PlayerNew';
import PlayerReview from './players/PlayerReview';

class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
          <div className="container">
              <BrowserRouter>
                  <div>
                      <Header />
                      <Route exact path="/" component={PlayerList} />
                      <Route exact path="/dashboard" component={Dashboard} />
                      <Route exact path="/userInfo" component={UserInfo} />
                      <Route path="/players" component={PlayerList} />
                      <Route path="/player/:playerId" component={PlayerReview} />
                      <Route path="/AddPlayer" component={PlayerNew} />
                  </div>
              </BrowserRouter>
          </div>
        );
    }
}

export default connect(null, actions)(App);