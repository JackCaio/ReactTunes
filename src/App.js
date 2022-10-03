import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';

class App extends React.Component {
  render() {
    return (
      <>
        <p>TrybeTunes</p>
        <Switch>
          <Route exact path="/" component={ Login } />
        </Switch>
      </>
    );
  }
}

export default App;
