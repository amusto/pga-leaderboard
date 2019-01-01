import axios from 'axios';
import { FETCH_USER, FETCH_PLAYER, FETCH_PLAYER_FAILURE, FETCH_PLAYERS, DELETE_PLAYER } from './types';

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');

    //NOTE: dispatch calls an action and passes a payload to the action.
    dispatch({ type: FETCH_USER, payload: res.data});
};

export const handleToken = (token) => async dispatch => {
    const res = await axios.post('/api/stripe', token);

    dispatch({ type: FETCH_USER, payload: res.data});
};

export const submitPlayer = (values, history) => async dispatch => {
    const res = await axios.post('/api/players', values);

    if (!res.data.status) {
        history.push('/players');
        dispatch({ type: FETCH_USER, payload: res.data});
    } else {
        //alert(res.data.message);
        dispatch({ type: FETCH_PLAYER_FAILURE, payload: res.data});
    }
};

export const updatePlayer = (values, history) => async dispatch => {
    const res = await axios.put('/api/players', values);

    if (!res.data.status) {
        history.push('/players');
        dispatch({ type: FETCH_USER, payload: res.data});
    } else {
        alert(res.data.message);
        dispatch({ type: FETCH_USER, payload: res.data});
    }

};

export const fetchPlayers = () => async dispatch => {
    const res = await axios.get('/api/players');

    dispatch({ type: FETCH_PLAYERS, payload: res.data});
};

export const fetchPlayer = (playerId) => async dispatch => {
    const res = await axios.get(`/api/player/${playerId}`);

    dispatch({ type: FETCH_PLAYER, payload: res.data});
};

export const deletePlayer = (playerId, history) => async dispatch => {
    const res = await axios.delete(`/api/players/${playerId}`);

    dispatch({ type: DELETE_PLAYER, payload: res.data});
};
