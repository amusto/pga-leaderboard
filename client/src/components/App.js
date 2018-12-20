import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import UserInfo from './UserInfo';
import PlayerList from './players/PlayerList';
import PlayerNew from './players/PlayerNew';
import Player from './players/Player';

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
                      <Route exact path="/" component={Landing} />
                      <Route exact path="/dashboard" component={Dashboard} />
                      <Route exact path="/userInfo" component={UserInfo} />
                      <Route path="/players/new" component={PlayerNew} />
                      <Route path="/players" component={PlayerList} />
                  </div>
              </BrowserRouter>
          </div>
        );
    }
}

export default connect(null, actions)(App);