import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
        console.log(this.props)
    }

    render() {
        return (
            <div className="container">

            </div>
        );
    }
}

export default connect(null, actions)(App);