import { combineReducers } from 'redux'; //Bringing them into redux state
import authReducer from './authReducer';
import playersReducer from "./playersReducer";
import playerReducer from "./playerReducer";

export default combineReducers({
    auth: authReducer,
    players: playersReducer,
    player: playerReducer
});