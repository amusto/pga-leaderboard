import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import _ from "lodash";
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

const PlayerFormReview = ({ onCancel, formValues, submitPlayer, history }) => {
    const reviewFields = _.map(formFields, ({ name, label }) => {
       const lastRow = {
           marginBottom: '10px'
       }
       return (
        <div key={name} style={lastRow}>
            <label>{label}</label>
            <div>
                {formValues[name]}
            </div>
        </div>
       )
    });

    return (
      <div>
         <h5>Confirm New Player Information</h5>
          {reviewFields}
          <button className="yellow darken-3 white-text btn-flat" onClick={onCancel}>
            Back
          </button>
          <button className="green btn-flat white-text right" onClick={() => submitPlayer(formValues, history)}>
              Confirm and Add
          </button>

      </div>
    )
};

// Function returns state values as props on this component!!!
function mapStateToProps(state) {
    return { formValues: state.form.playerForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(PlayerFormReview));