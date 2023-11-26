import { combineReducers } from 'redux';
import logReducer from './logReducer';
import sidebarReducer from './sidebarReducer';
import themeReducer from './themeReducer';

const rootReducer = combineReducers({
  themeReducer,
  logReducer,
  sidebarReducer,
});

export default rootReducer;
