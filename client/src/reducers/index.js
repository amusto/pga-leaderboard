// Making actions available to our redux store
import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import playersReducer from "./playersReducer";

export default combineReducers({
    auth: authReducer,
    form: reduxForm,
    players: playersReducer
});