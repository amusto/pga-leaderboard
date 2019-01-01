import { combineReducers } from 'redux'; //Bringing them into redux state
import authReducer from './authReducer';
import playersReducer from "./playersReducer";
import { reducer as reduxForm } from 'redux-form';
import playerReducer from "./playerReducer";

export default combineReducers({
    auth: authReducer,
    form: reduxForm,
    players: playersReducer,
    player: playerReducer
});