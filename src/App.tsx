import React from 'react';
import { Provider } from 'react-redux';
import { routes } from './routes/routes';
import store, { history } from './store';
import { ConnectedRouter } from 'connected-react-router';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppStart />
    </Provider>
  );
};

const AppStart = () => {
  return <ConnectedRouter history={history}>{routes}</ConnectedRouter>;
};

export default App;
