import {FETCH_PLAYER, FETCH_PLAYER_FAILURE} from '../actions/types';

export default function(state = {}, action) {
    switch (action.type) {
        case FETCH_PLAYER:
            return action.payload;
        case FETCH_PLAYER_FAILURE:
            console.log(action)
            return action.payload;
        default:
            return state;
    }
}