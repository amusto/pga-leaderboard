import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Link
} from 'react-router-dom'
import { fetchPlayers, deletePlayer } from "../../actions";

class PlayerList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showPlayersTable: false
        }
        this.deletePlayer = this.deletePlayer.bind(this);
    }
    componentDidMount() {
        this.props.fetchPlayers();
        this.setState({showPlayersTable: true})
    }

    componentDidUpdate() {
    }

    deletePlayer(playerId) {
        this.props.deletePlayer(playerId);
        this.props.fetchPlayers();
    }

    renderPlayers() {
        const nameColumn = {
            width: '40%'
        }
        const scoreColumn = {
            width: '20%',
            textAlign: 'right'
        }
        const actionsColumn = {
            width: '20%',
            textAlign: 'right'
        }

        return this.props.players.reverse().map((player, index) => {
            return (
                <tbody key={index}>
                <tr>
                    <td style={nameColumn}><Link to={`/player/${player._id}`}>{player.last_name}, {player.first_name}</Link></td>
                    <td style={scoreColumn}>{player.score}</td>
                    <td style={actionsColumn}>
                        <a onClick={this.deletePlayer.bind(this, player._id)} className="waves-effect waves-light btn">Delete</a>
                    </td>
                </tr>
                </tbody>)
        })
    }

    render() {
        const nameHeader = {
            width: '40%'
        }
        const scoreHeader = {
            width: '20%',
            textAlign: 'right'
        }
        const actionsHeader = {
            width: '20%',
            textAlign: 'right'
        }
        const noPlayersExistDiv = {
            width: '100%',
            textAlign: 'center',
            padding: '150px',
            fontWeight: 'bold'
        }

        let tableHeaders = (
            <thead>
                <tr>
                    <th style={nameHeader}>Name</th>
                    <th style={scoreHeader}>Score</th>
                    <th style={actionsHeader}>Actions</th>
                </tr>
            </thead>
        );

        if (this.props.players.length > 0) {
            return (
                <table className="table table-bordered table-hover" width="100%">
                    {tableHeaders}
                    {this.renderPlayers()}
                </table>
            )
        }
        return <div style={noPlayersExistDiv}>No Players Exist</div>

    }
}

function mapStateToProps({ players }) {
    return { players }
}

export default connect(mapStateToProps, { fetchPlayers, deletePlayer })(PlayerList);