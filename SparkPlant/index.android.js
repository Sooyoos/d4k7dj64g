import React from 'react';
import {
    AppRegistry,
} from 'react-native';
import { connect, Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {
    addNavigationHelpers,
} from 'react-navigation';
import reducer from './reducers';
import { AppNavigator } from './reducers/navigation';

// middleware that logs actions
const loggerMiddleware = createLogger({ predicate: () => __DEV__ });

function configureStore(initialState) {
    const enhancer = compose(
        applyMiddleware(
            loggerMiddleware,
            thunkMiddleware,
        ),
    );
    return createStore(reducer, initialState, enhancer);
}

const AppWithNavigationState = connect(state => ({
        nav: state.nav,
    }))(({ dispatch, nav }) => <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />);


const App = () => (
<Provider store={configureStore({})}>
    <AppWithNavigationState />
    </Provider>
);

AppRegistry.registerComponent('SparkPlant', () => App);
