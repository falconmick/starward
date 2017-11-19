import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import counter from '../reducers/counter';

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = () => {
  return combineReducers({
    counter,
    routing
  });
}

export default rootReducer;
