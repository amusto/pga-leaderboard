import axios from 'axios';
import { FETCH_USER, FETCH_PLAYER, FETCH_PLAYERS, DELETE_PLAYER } from './types';

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');

    dispatch({ type: FETCH_USER, payload: res.data});
};

export const handleToken = (token) => async dispatch => {
    const res = await axios.post('/api/stripe', token);

    dispatch({ type: FETCH_USER, payload: res.data});
};

export const submitPlayer = (values, history) => async dispatch => {
    const res = await axios.post('/api/players', values);

    history.push('/players');
    dispatch({ type: FETCH_USER, payload: res.data});
};

export const fetchPlayers = () => async dispatch => {
    const res = await axios.get('/api/players');

    dispatch({ type: FETCH_PLAYERS, payload: res.data});
};

export const fetchPlayer = (playerId) => async dispatch => {
    const res = await axios.get('/api/players/:playerId');

    dispatch({ type: FETCH_PLAYER, payload: res.data});
};

export const deletePlayer = (playerId, history) => async dispatch => {
    const res = await axios.delete(`/api/players/${playerId}`);
    console.log(res)

    dispatch({ type: DELETE_PLAYER, payload: res.data});
};
