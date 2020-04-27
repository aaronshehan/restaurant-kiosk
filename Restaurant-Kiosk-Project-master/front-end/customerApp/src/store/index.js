import { createStore, applyMiddleware } from "redux";
import rootReducer from './reducers'
import thunk from "redux-thunk";

const initialState = {

};
const middleware = [
  thunk
];

/*
Store - holds our state - Only One State. State is readonly that means state is copied and modified.
Action - state can be modified using actions. Action goes to the reducer. Action reaches to Reducer by Dispatcher.
Dispatcher - action needs to be sent by someone - known as dispatching an action.
           - Will be onPress in this case. Press the button, dispatch the action and goes to the reducer. 
             Modify the store and then reducer will return the updated state.)
Reducer - receives the action and modifies the state to give us a new state. 
        - pure functions, only mandatory argument is 'type'.
Subscriber - listens for state change to update the UI (using connect)
*/

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware)
);

export default store;