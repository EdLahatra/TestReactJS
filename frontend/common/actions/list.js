import axios from 'axios';
import config from '../config';

/* CONSTANT */
export const FETCH_LIST_ALL = 'FETCH_LIST_ALL';
export const GET_CURRENT_ITEM = 'GET_CURRENT_ITEM';
export const ON_SEARCH_ITEM = 'ON_SEARCH_ITEM';

export const onSearch = data =>
  (dispatch) => {
    console.log(data);
    dispatch({
      type: ON_SEARCH_ITEM,
      data,
    });
  };

export const getList = () =>
  (dispatch) => {
    axios({
      method: 'get',
      url: `${config.serverUrl}/get-list`,
    })
      .then((res) => {
        dispatch({
          type: FETCH_LIST_ALL,
          data: res.data,
        });
      })
      .catch(() => {
      });
  };

export const getItem = code =>
  (dispatch) => {
    axios({
      method: 'get',
      url: `${config.serverUrl}/get-item/${code}`,
    })
      .then((res) => {
        dispatch({
          type: GET_CURRENT_ITEM,
          data: res.data,
        });
      })
      .catch(() => {
      });
  };
