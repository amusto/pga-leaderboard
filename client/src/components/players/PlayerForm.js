import _ from 'lodash';
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import formFields from './formFields';
import {submitPlayer} from '../../actions';

export class PlayerForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            first_name: '',
            last_name: '',
            score: ''
        };

        // This binding is necessary to make `this` work in the callback
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.onPlayerSubmit.bind(this);
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(this.state)
    }

    onPlayerSubmit(event) {
        console.log(this.state)
        submitPlayer(this.state)
        event.preventDefault();
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({[name]: value})
    }

    render() {

        const formValues = _.map(formFields, ({ type, label, name, value, size }, i) => {
            const style = {
                width: size
            }
            return (<div className="form-group" key={`${name}_${i}`}>
                <label htmlFor={label}>{label}</label>
                <input type={type} className="form-control" name={name} id={name} placeholder={label} style={style} onChange={this.handleChange} ></input>
            </div>)
        })
        return (
          <div>
              <form onSubmit={this.handleSubmit}>
                {formValues}
                <Link to="/players" className="red btn-flat white-text">
                    Cancel
                </Link>
                <button type="submit" className="teal btn-flat right white-text">
                    Submit
                </button>
              </form>
          </div>
        )
    }
};

export default PlayerForm;