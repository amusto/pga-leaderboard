import React, { Component } from 'react';
import {submitPlayer} from "../../actions";
//import formFields from "./formFields";
import NewPlayerForm from "./NewPlayerForm";
// import { reduxForm, Field } from 'redux-form';
// import {Link} from "react-router-dom";
import {connect} from "react-redux";
import './Form.css';

class PlayerNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showAddPlayerButton: false,
            isValidated: false,
            errorMessage: '',
            showFormSuccess: false,
            isSubmitted: false,
            status: 0,
            first_name: '',
            last_name: '',
            score: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        this.setState({[target.name]: target.value})
    }

    handleSubmit = values => {
        let that = this;
        this.props.submitPlayer(values, this.props.history).then(function(data) {
            if (that.props.player.status) {
                let message = `${that.props.player.status}: ${that.props.player.message}`
                that.setState({'errorMessage' : message})
            }
        });
    };

    render() {
        return (
            <div className="container">
                {this.state.errorMessage && <div style={{'color': 'red'}}>{this.state.errorMessage}</div>}
                <NewPlayerForm onSubmit={this.handleSubmit} />
            </div>
        )
    }
};

function mapStateToProps( state ){
    return {
        player: state.player
    }
}

export default connect(mapStateToProps, { submitPlayer })(PlayerNew);
