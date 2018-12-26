import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPlayer } from "../../actions";
import { reduxForm } from 'redux-form';
import PlayerForm from './PlayerForm';

class Player extends Component {
    state = { showFormReview: false };

    componentDidMount() {
        const { playerId } = this.props.match.params
        this.props.fetchPlayer(playerId);
    }

    componentDidUpdate() {
        //console.log(this.props.players)
    }

    // renderPlayer() {
    //     return <div></div>
    // }
    //
    // render() {
    //     return (
    //         <div>
    //             {this.renderPlayer()}
    //         </div>
    //     )
    // }

    renderContent() {
        // if (this.state.showFormReview) {
        //     return <PlayerFormReview onCancel={() => this.setState({ showFormReview: false })} />;
        // }
        return <PlayerForm playerData={this.props.players} onPlayerSubmit={() => this.setState({ showFormReview: true })}/>;
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        )
    }
}

function mapStateToProps({ players }) {
    return { players }
}

const decoratedComponent = connect(mapStateToProps, { fetchPlayer })(Player);

export default reduxForm({
    form: 'playerForm'
})(decoratedComponent);

//export default connect(mapStateToProps, { fetchPlayer })(Player);