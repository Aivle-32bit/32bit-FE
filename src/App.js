import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import AppContent from './AppContent';

const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
