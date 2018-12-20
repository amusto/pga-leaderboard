import { FETCH_PLAYERS, DELETE_PLAYER } from '../actions/types';

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_PLAYERS:
            return action.payload;
        case DELETE_PLAYER:
            return state;
        default:
            return state;
    }
}