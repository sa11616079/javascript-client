import React from 'react';
import { ApolloProvider } from '@apollo/react-components';
import { CssBaseline } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import ls from 'local-storage';
import {
  TextFieldDemo,
  InputDemo,
  Trainee,
  ChildrenDemo,
  Login,
  NoMatch,
} from './pages/index';
import { AuthRoute, PrivateRoute } from './routes/index';
import { SnackBarProvider } from './contexts/snackBarProvider';
import client from './libs/apollo-client';

const url = ls.get('token') ? '/trainee' : '/login';
const App = () => (
  <div>
    <SnackBarProvider>
      <ApolloProvider client={client}>
        <CssBaseline />
        <Router>
          <Switch>
            <Route exact path="/">
              <Redirect to={url} />
            </Route>
            <AuthRoute path="/login" component={Login} />
            <PrivateRoute path="/ChildrenDemo" component={ChildrenDemo} />
            <PrivateRoute path="/TextFieldDemo" component={TextFieldDemo} />
            <PrivateRoute path="/InputDemo" component={InputDemo} />
            <PrivateRoute path="/trainee" component={Trainee} />
            <PrivateRoute component={NoMatch} />
          </Switch>
        </Router>
      </ApolloProvider>
    </SnackBarProvider>
  </div>
);
export default App;
