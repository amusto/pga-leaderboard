// PlayerNew shows PlayerForm and PlayerFormReview
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import PlayerForm from './PlayerForm';
import PlayerFormReview from './PlayerFormReview';

class PlayerNew extends Component {
    state = { showFormReview: false };

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
})(PlayerNew);