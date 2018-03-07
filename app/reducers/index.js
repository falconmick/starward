import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import loading from '../reducers/loading';
import starward from '../reducers/starward';
import gravityforms from '../reducers/gravityforms';
import wpJwt from '../reducers/wpJwt';

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  loading,
  starward,
  gravityforms,
  wpJwt,
  routing
});

export default rootReducer;
