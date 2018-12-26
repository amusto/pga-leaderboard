// SurveyForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import PlayerField from './PlayerField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

//TODO: Consider customizing recipients list by using pills for emails? Include a remove X for each pill  - EX: ( johndoe@emaily.com X ) http://materializecss.com/chips.html

class PlayerForm extends Component {
    // Helper function
    renderFields() {
        console.log(this.props.playerData)
        return _.map(formFields, ({ label, name }) => {
            return <Field key={name} component={PlayerField} type="text" label={label} name={name} />
        })
    }

    render() {
        return (
          <div>
              <form onSubmit={this.props.handleSubmit(this.props.onPlayerSubmit)}>
                {this.renderFields()}
                <Link to="/players" className="red btn-flat white-text">
                    Cancel
                </Link>
                <button type="submit" className="teal btn-flat right white-text">
                    Next
                    <i className="material-icons right">done</i>
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

export default reduxForm({
    validate,
    form: 'playerForm',
    destroyOnUnmount: false
})(PlayerForm);