import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import loading from '../reducers/loading';
import starward from '../reducers/starward';
import gravityforms from '../reducers/gravityforms';

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = (apolloReducer) => {
  return combineReducers({
    loading,
    starward,
    gravityforms,
    routing,
    apolloReducer
  });
}

export default rootReducer;
