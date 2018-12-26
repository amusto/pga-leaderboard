// PlayerNew shows PlayerForm and PlayerFormReview
import React, { Component } from 'react';
import {connect} from "react-redux";
import {fetchPlayer } from "../../actions";
//import {Field, reduxForm} from 'redux-form';
import PlayerForm from './PlayerForm';
//import PlayerFormReview from './PlayerFormReview';

// import _ from "lodash";
// import formFields from "./formFields";
// import PlayerField from "./PlayerField";
// import {Link} from "react-router-dom";

class PlayerUpdate extends Component {
    constructor(props) {
        super(props);

        // This binding is necessary to make `this` work in the callback
        //this.deletePlayer = this.deletePlayer.bind(this);
    }
    componentDidMount() {
        const { playerId } = this.props.match.params
        this.props.fetchPlayer(playerId);
    }

    componentDidUpdate() {
        //console.log(this.props.player)
    }

    // state = {
    //     showFormReview: false,
    //     player: null
    // };

    renderContent() {
        // if (this.state.showFormReview) {
        //     return <PlayerFormReview onCancel={() => this.setState({ showFormReview: false })} />;
        // }

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


function mapStateToProps({ player }) {
    console.log(player)
    return { player }
}

export default connect(mapStateToProps, { fetchPlayer })(PlayerUpdate);

// export default reduxForm({
//     form: 'playerForm'
// })(PlayerNew);