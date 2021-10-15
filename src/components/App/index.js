// import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Core from '../Core';
import CoreMaths from '../CoreMaths'

/** @jsx jsx */
import { ThemeProvider, jsx } from 'theme-ui'
import { theme } from '../../data/theme'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/maths">Maths</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route exact path="/" component={Core} />
            <Route path="/maths" component={CoreMaths} />
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}