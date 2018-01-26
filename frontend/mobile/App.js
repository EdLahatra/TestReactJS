import React from 'react';
import { Provider } from 'react-redux';
import store from './common/store';
import MainContainer from './component/mainContainer';

const App = () => (
  <Provider store={store}>
    <MainContainer />
  </Provider>
);

export default App;
