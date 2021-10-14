import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Core from '../Core';
import CoreMaths from '../CoreMaths'

export default function App() {
  return (
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
          <Route path="/">
            <CoreMaths />
          </Route>
          <Route path="/maths">
            <Core />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}