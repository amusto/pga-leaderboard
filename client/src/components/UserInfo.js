import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class UserInfo extends Component {
    componentDidMount() {
        this.props.fetchUser();
        //console.log(this.props)
    }

    render() {
        return (
            <div className="container">
                User details

            </div>
        );
    }
}

export default connect(null, actions)(UserInfo);