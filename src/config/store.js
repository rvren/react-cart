import { 
	createStore,
	applyMiddleware, 
	compose 
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { autoRehydrate } from 'redux-persist';
import { createLogger } from 'redux-logger';
import localForage from 'localforage'


import rootReducer from '../reducers/';

let middleware = [thunkMiddleware];

// Reducer whiletlisting 
export const persistConfig = {
    storage: localForage,
    whitelist: ['checkoutCart']
}

const logger = createLogger({ collapsed: true });
middleware = [...middleware,logger];

export default function configureStore() {
	const store = createStore(
		rootReducer,
		compose (
      applyMiddleware(...middleware),
      autoRehydrate(persistConfig)
		)
	);
	return store;
}

