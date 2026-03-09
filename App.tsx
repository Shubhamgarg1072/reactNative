import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/core/store';
import { AppNavigator } from './src/core/navigation/AppNavigator';

// App is a thin shell: Provider wraps the tree so every feature can access the store.
// All navigation logic lives in AppNavigator — equivalent to separating NavGraph from Activity.
function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

export default App;
