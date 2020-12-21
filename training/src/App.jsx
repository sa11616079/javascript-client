import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import {
  TextFieldDemo,
  InputDemo,
  Trainee,
  ChildrenDemo,
  Login,
  NoMatch,
} from './pages/index';
import { AuthRoute, PrivateRoute } from './routes/index';

const App = () => (
  <div>
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/trainee" />
        </Route>
        <AuthRoute path="/login" component={Login} />
        <PrivateRoute path="/ChildrenDemo" component={ChildrenDemo} />
        <PrivateRoute path="/TextFieldDemo" component={TextFieldDemo} />
        <PrivateRoute path="/InputDemo" component={InputDemo} />
        <PrivateRoute path="/trainee" component={Trainee} />
        <PrivateRoute component={NoMatch} />
      </Switch>
    </Router>
  </div>
);
export default App;
