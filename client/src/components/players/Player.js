// PlayerNew shows PlayerForm and PlayerFormReview
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import PlayerForm from './PlayerForm';
import PlayerFormReview from './PlayerFormReview';
import { fetchPlayer } from "../../actions";

class Player extends Component {
    state = {
        showFormReview: false,
        player: null
    };
    componentDidMount() {
        const { playerId } = this.props.match.params
        console.log(playerId)
        this.props.fetchPlayer(playerId);
    }


    renderContent() {
        if (this.state.showFormReview) {
            return <PlayerFormReview onCancel={() => this.setState({ showFormReview: false })} />;
        }

        return <PlayerForm onPlayerSubmit={() => this.setState({ showFormReview: true })}/>;
    }

    render() {
        return (
          <div>
              {this.renderContent()}
          </div>
        )
    }
};

export default reduxForm({
    form: 'playerForm'
})(Player);