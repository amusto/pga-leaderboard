import _ from 'lodash';
import React, { Component } from 'react';
import {submitPlayer} from "../../actions";
import formFields from "./formFields";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

class PlayerNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showAddPlayerButton: false,
            status: 0,
            first_name: '',
            last_name: '',
            score: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.onPlayerSubmit.bind(this);
    }

    onPlayerSubmit(event) {
        event.preventDefault();
        this.props.submitPlayer(this.state, this.props.history)
    }

    handleChange(event) {
        const target = event.target;
        this.setState({[target.name]: target.value})
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
                    <button className="teal btn-flat right white-text">
                        Submit
                    </button>
                </form>
            </div>
        )
    }

};


function mapStateToProps(state){
    return {
        state
    }
}

export default connect(mapStateToProps, { submitPlayer })(PlayerNew);
