// PlayerNew shows PlayerForm and PlayerFormReview
import React, { Component } from 'react';
//import { reduxForm } from 'redux-form';
import PlayerForm from './PlayerForm';
import PlayerFormReview from './PlayerFormReview';
import {fetchPlayer } from "../../actions";
import {connect} from "react-redux";
import _ from "lodash";
import formFields from "./formFields";
import {Field} from "redux-form";
import PlayerField from "./PlayerField";
import {Link} from "react-router-dom";
import validateEmails from "../../utils/validateEmails";

class Player extends Component {
    state = {
        showFormReview: false,
        player: null
    };
    componentDidMount() {
        const { playerId } = this.props.match.params
        this.props.fetchPlayer(playerId);
    }


    // renderContent() {
    //     if (this.state.showFormReview) {
    //         return <PlayerFormReview onCancel={() => this.setState({ showFormReview: false })} />;
    //     }
    //
    //     return <PlayerForm onPlayerSubmit={() => this.setState({ showFormReview: true })}/>;
    // }
    //
    // render() {
    //     return (
    //       <div>
    //           {this.renderContent()}
    //       </div>
    //     )
    // }
    renderFields() {
        return _.map(formFields, ({ label, name }) => {
            return <Field key={name} component={PlayerField} type="text" label={label} name={name} />
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleUpdate(this.props.onPlayerSubmit)}>
                    {this.renderFields()}
                    <button type="submit" className="teal btn-flat right white-text">
                        Next
                        <i className="material-icons right">Update Player</i>
                    </button>
                </form>
            </div>
        )
    }
};

function validate(values) {
    const errors = {};

    // Custom error checks against valid emails
    errors.recipients = validateEmails(values.recipients || '');

    //TODO: Provide custom error text
    _.each(formFields, ({ name }) => {
        if (!values[name]) {
            errors[name] = 'You must provide a value!';
        }
    });

    return errors;
}

function mapStateToProps({ player }) {
    return { player }
}

export default connect(mapStateToProps, { fetchPlayer })(Player);

// export default reduxForm({
//     form: 'playerForm'
// })(Player);