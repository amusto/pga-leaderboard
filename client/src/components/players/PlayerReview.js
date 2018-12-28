import _ from 'lodash';
import React, { Component } from 'react';
import formFields from "./formFields";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import { fetchPlayer } from "../../actions";

class PlayerReview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            _id: '',
            first_name: '',
            last_name: '',
            score: ''
        };

        this.deletePlayer = this.deletePlayer.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.onPlayerSubmit.bind(this);
    }

    componentDidMount() {
        const { playerId } = this.props.match.params
        this.props.fetchPlayer(playerId);
    }

    componentWillReceiveProps(nextProps) {
        var playerObj = nextProps.player;

        var that = this;
        _.map(playerObj, function(value, key) {
            that.setState({[key]: value});
        })

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    deletePlayer(playerId) {
        this.props.deletePlayer(playerId);
        this.props.fetchPlayers();
    }

    onPlayerSubmit(event) {
        event.preventDefault();
        console.log(this.state)
        //this.props.updatePlayer(this.state, this.props.history)
    }

    handleChange(event) {
        const target = event.target;
        this.setState({[target.name]: target.value})
    }

    // renderPlayer() {
    //     const thisPlayer = this.props.player;
    //
    //     formFields.map(function(field) {
    //         field.value = thisPlayer[field.name]
    //         return field;
    //     })
    //
    //     const formValues = _.map(formFields, ({ type, label, name, value, size }, i) => {
    //         const style = {
    //             width: size
    //         }
    //         return (<div className="form-group" key={`${name}_${i}`}>
    //             <label htmlFor={label}>{label}</label>
    //             <input type={type} className="form-control" name={name} id={name} placeholder={label} style={style} onChange={this.handleChange} value={value}></input>
    //         </div>)
    //     })
    //
    //     return (
    //             <div>
    //                 {this.props.player.first_name}
    //             </div>)
    // }

    render() {

        const formValues = _.map(formFields, ({ type, label, name, value, size }, i) => {
            const style = {
                width: size
            }
            return (<div className="form-group" key={`${name}_${i}`}>
                <label htmlFor={label}>{label}</label>
                <input type={type} className="form-control" name={name} id={name} placeholder={label} style={style} onChange={this.handleChange} value={this.state[name]}></input>
            </div>)
        })
        return (
            <div>
                {/*{this.renderPlayer()}*/}
                <form onSubmit={this.handleSubmit}>
                    {formValues}
                    <Link to="/players" className="red btn-flat white-text">
                        Cancel
                    </Link>
                    <button className="teal btn-flat right white-text">
                        Update Player
                    </button>
                </form>
            </div>
        )
    }

};


function mapStateToProps({ player }){
    return {
        player
    }
}

export default connect(mapStateToProps, { fetchPlayer })(PlayerReview);
