import { combineReducers, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import auth from './modules/auth';
import post from './modules/post';
import artikel from './modules/artikel';
import upload from './modules/upload';

const reducers = combineReducers({
  auth,
  post,
  artikel,
  upload,
  form: formReducer,
});

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

export default store;
