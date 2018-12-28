// Making actions available to our redux store
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import playersReducer from "./playersReducer";
import playerReducer from "./playerReducer";

export default combineReducers({
    auth: authReducer,
    players: playersReducer,
    player: playerReducer
});