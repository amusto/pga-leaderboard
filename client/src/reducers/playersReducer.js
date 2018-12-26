import {FETCH_PLAYERS, DELETE_PLAYER, FETCH_PLAYER} from '../actions/types';

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_PLAYERS:
            return action.payload;
        case FETCH_PLAYER:
            return action.payload;
        case DELETE_PLAYER:
        default:
            return state;
    }
}