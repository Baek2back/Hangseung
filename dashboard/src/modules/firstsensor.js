import { handleActions } from "redux-actions";
import * as api from "../lib/api";

const GET_DATA = "firstsensor/GET_DATA";
const GET_DATA_SUCCESS = "firstsensor/GET_DATA_SUCCESS";
const GET_DATA_FAILURE = "firstsensor/GET_DATA_FAILURE";

export const getFirstSensor = () => async (dispatch) => {
  dispatch({ type: GET_DATA });
  try {
    const response = await api.getFirstSensor();
    dispatch({
      type: GET_DATA_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: GET_DATA_FAILURE,
      payload: e,
      error: true,
    });
    throw e;
  }
};

const initialState = {
  loading: {
    GET_DATA: false,
  },
  data: null,
};

const firstsensor = handleActions(
  {
    [GET_DATA]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_DATA: true,
      },
    }),
    [GET_DATA_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_DATA: false,
      },
      data: action.payload,
    }),
    [GET_DATA_FAILURE]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_DATA: false,
      },
    }),
  },
  initialState,
);

export default firstsensor;
