import { configureStore } from '@reduxjs/toolkit';

import reducer from './reducer';

const store = configureStore({
  reducer: reducer,
  // middleware: (getDefaultMiddleware: () => unknown[]) => getDefaultMiddleware().concat(thunk),
});

export default store;
