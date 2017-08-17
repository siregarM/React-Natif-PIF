import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';

/**
 |--------------------------------------------------
 | Types
 |--------------------------------------------------
 */
export const ARTIKEL_CREATE_REQUEST = 'EMPLOYEE_CREATE_REQUEST';
export const ARTIKEL_CREATE_SUCCESS = 'EMPLOYEE_CREATE_SUCCESS';
export const ARTIKEL_CREATE_FAILURE = 'EMPLOYEE_CREATE_FAILURE';
export const ARTIKEL_UPDATE_REQUEST = 'ARTIKEL_UPDATE_REQUEST';
export const ARTIKEL_UPDATE_SUCCESS = 'ARTIKEL_UPDATE_SUCCESS';
export const ARTIKEL_UPDATE_FAILURE = 'ARTIKEL_UPDATE_FAILURE';
export const ARTIKEL_DELETE_REQUEST = 'ARTIKEL_DELETE_REQUEST';
export const ARTIKEL_DELETE_SUCCESS = 'ARTIKEL_DELETE_SUCCESS';
export const ARTIKEL_DELETE_FAILURE = 'ARTIKEL_DELETE_FAILURE';
export const ARTIKEL_LIST_GET_REQUEST = 'ARTIKEL_LIST_GET_REQUEST';
export const ARTIKEL_LIST_GET_SUCCESS = 'ARTIKEL_LIST_GET_SUCCESS';
export const ARTIKEL_LIST_GET_FAILURE = 'ARTIKEL_LIST_GET_FAILURE';

/**
 |--------------------------------------------------
 | Actions
 |--------------------------------------------------
 */
export const createArtikel = ({ title, description }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    dispatch({ type: ARTIKEL_CREATE_REQUEST });

    firebase.database().ref(`/users/${currentUser.uid}/artikel`)
      .push({ title, description })
      .then(() => {
        dispatch({ type: ARTIKEL_CREATE_SUCCESS });

        Actions.artikelList({ type: 'reset' });
      })
      .catch(() => {
        dispatch({ type: ARTIKEL_CREATE_FAILURE, payload: 'artikel creation failed' });
      });
  };
};

export const updateArtikel = ({ title, description, uid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    dispatch({ type: ARTIKEL_UPDATE_REQUEST });

    firebase.database().ref(`/users/${currentUser.uid}/artikel/${uid}`)
      .set({ title, description })
      .then(() => {
        dispatch({ type: ARTIKEL_UPDATE_SUCCESS });

        Actions.artikelList({ type: 'reset' });
      })
      .catch(() => {
        dispatch({ type: ARTIKEL_UPDATE_FAILURE, payload: 'artikel edition failed' });
      });
  };
};

export const deleteArtikel = ({ uid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    dispatch({ type: ARTIKEL_DELETE_REQUEST });

    firebase.database().ref(`/users/${currentUser.uid}/artikel/${uid}`)
      .remove()
      .then(() => {
        dispatch({ type: ARTIKEL_DELETE_SUCCESS });

        Actions.artikelList({ type: 'reset' });
      })
      .catch(() => {
        dispatch({ type: ARTIKEL_DELETE_FAILURE, payload: 'artikel deletion failed' });
      });
  };
};

export const getArtikelList = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    dispatch({ type: ARTIKEL_LIST_GET_REQUEST });

    firebase.database().ref(`/users/${currentUser.uid}/artikel`)
      .on('value', (snapshot) => {
        dispatch({ type: ARTIKEL_LIST_GET_SUCCESS, payload: snapshot.val() });
      });
  };
};

/**
 |--------------------------------------------------
 | Reducer
 |--------------------------------------------------
 */
const INITIAL_STATE = {
  list: [],
  error: '',
  loading: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ARTIKEL_CREATE_REQUEST:
      return { ...state, loading: true };
    case ARTIKEL_CREATE_SUCCESS:
      return { ...state, error: '', loading: false };
    case ARTIKEL_CREATE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ARTIKEL_UPDATE_REQUEST:
      return { ...state, loading: true };
    case ARTIKEL_UPDATE_SUCCESS:
      return { ...state, error: '', loading: false };
    case ARTIKEL_UPDATE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ARTIKEL_DELETE_REQUEST:
      return { ...state, loading: true };
    case ARTIKEL_DELETE_SUCCESS:
      return { ...state, error: '', loading: false };
    case ARTIKEL_DELETE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ARTIKEL_LIST_GET_REQUEST:
      return { ...state, loading: true };
    case ARTIKEL_LIST_GET_SUCCESS:
      return { ...state, ...INITIAL_STATE, list: action.payload };
    case ARTIKEL_LIST_GET_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default reducer;
