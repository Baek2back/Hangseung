import { handleActions } from "redux-actions";

const GET_DATA = "firstsensor/GET_DATA";
const GET_DATA_SUCCESS = "firstsensor/GET_DATA_SUCCESS";
const GET_DATA_FAILURE = "firstsensor/GET_DATA_FAILURE";

export const getFirstSensor = (date) => (
  dispatch,
  getState,
  { getFirestore },
) => {
  dispatch({ type: GET_DATA });
  try {
    const firestore = getFirestore();
    firestore
      .collection("s1")
      .doc("date")
      .collection(date)
      .get()
      .then((docs) => {
        if (docs.empty) {
          dispatch({
            type: GET_DATA_FAILURE,
            payload: true,
            error: true,
          });
          return;
        }
        let time = [];
        let contents = [];
        //doc.id : 시간, doc.data : 센서 데이터
        docs.forEach((doc) => {
          time.push(doc.id);
          contents.push(doc.data());
        });
        dispatch({
          type: GET_DATA_SUCCESS,
          payload: [time, contents],
        });
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
