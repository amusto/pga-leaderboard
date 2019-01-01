import _ from 'lodash';
import React, {Component} from "react";
import { reduxForm, Field } from 'redux-form';
import formFields from "./formFields";

const validate = val => {
    const errors = {};
    if (!val.first_name) {
        errors.first_name = 'First name is required!';
    }
    if (!val.last_name) {
        errors.last_name = 'Last name is required!';
    }
    if (!val.score) {
        errors.score = 'Score is required!'
    }
    return errors;
};

class NewPlayerForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
            <div>
                <div className="control">
                    <label className="field">{label}</label>
                    <input className="input" {...input} placeholder={label} type={type}/>
                    {touched && ((error && <span style={{'color': 'red'}}>{error}</span>) || (warning && <span>{warning}</span>))}
                </div>
            </div>
        )

        const formValues = _.map(formFields, ({ type, label, name, value, size }, i) => {
            return (
                <div className="field" key={i}>
                    <div className="control">
                        <Field name={name} component={renderField} type="text" label={label}/>
                    </div>
                </div>
            )
        })

        const { handleSubmit } = this.props;
        return <form onSubmit={handleSubmit} className="form">
            {formValues}
           <div className="field">
                <div className="control">
                    <button className="button is-link">Submit</button>
                </div>
            </div>

        </form>;
    }
}

export default reduxForm({
    validate,
    form: 'newPlayerForm',
    destroyOnUnmount: false
})(NewPlayerForm);