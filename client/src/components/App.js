import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import PlayerList from './players/PlayerList';
import PlayerNew from './players/PlayerNew';
import PlayerReview from './players/PlayerReview';

class App extends Component {
    componentDidMount() {
    }

    render() {
        return (
          <div className="container">
              <BrowserRouter>
                  <div>
                      <Header />
                      <Route exact path="/" component={Landing} />
                      <Route exact path="/dashboard" component={Dashboard} />
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