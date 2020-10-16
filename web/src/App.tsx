import React from 'react';
import {Page} from './Page';
import {Form} from './Form';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <Router>
          <Switch>
            <Route exact path={'/share'}>
              <Form />
            </Route>
            <Route exact path={'/'}>
              <Page />
            </Route>
          </Switch>
        </Router>
    </div>
  );
}

export default App;
