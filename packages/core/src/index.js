import React from "react";
import PropTypes from "prop-types";

/**
 * Creates a context that acts like a redux state.
 * @param {!function} reducer - The reducer function that updates the state
 * @param {defaultState} defaultState - Some default state to use. The resulting context still allows you to pass in an initialState to override it, but this creates the default when no initialState is provided
 * @returns {array} - Returns an array that includes the React Context itself, as well as the reduxified Provider and the default Consumer from React (for convenience)
 * @example
 * //First, define your default state and reducers
 * const DEFAULT_STATE = {count: 0}
 * const reducer = (state, { type, payload }) => {
 *   switch type {
 *     case 'increment': {
 *       return {...state, count: state.count+1}
 *     }
 *   }
 *   return state
 * }
 *
 * //Then use createContext to get the react context and a reducer-based provider/consumer
 * const [MyContext, MyContextProvider, MyContextConsumer] = createContext(
 *   reducer,
 *   DEFAULT_STATE
 * )
 *
 * // In some widget component, you will use the context
 * import React, {useContext} from 'react';
 * export const Widget = () => {
 *   // The context provides a state and a dispatch. Dispatch is used to tell the reducer to update the state
 *   const {state, dispatch} = useContext(MyContext)
 *   const {count} = state
 *   return (
 *     <button onClick={() => dispatch({type: 'increment'})}>{count}</button>
 *   )
 * }
 *
 * //Note that you must wrap the widget with the generated Provider
 * export const App = () => (
 * <div>
 *   <MyContextProvider initialState={{count: 1}}>
 *     <Widget />
 *   </MyContextProvider>
 * </div>
 */
export const createContext = (reducer, defaultState) => {
  const Context = React.createContext();
  const ContextProvider = ({ children, initialState = defaultState }) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const value = { state, dispatch };

    return <Context.Provider value={value}>{children}</Context.Provider>;
  };
  ContextProvider.propTypes = {
    children: PropTypes.any,
    initialState: PropTypes.any
  };
  const ContextConsumer = Context.Consumer;

  return [Context, ContextProvider, ContextConsumer];
};
