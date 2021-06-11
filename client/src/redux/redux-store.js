import {applyMiddleware, combineReducers, createStore} from "redux";
import {auth} from "./reducers/authReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

const reducers = combineReducers({
  auth
});

function configureStore() {
  return createStore(
    reducers,
    composeWithDevTools(
      applyMiddleware(
        thunk,
      ))
  )
}

export const store = configureStore();