import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom'

import Posts from "./components/posts/Posts";
class App extends Component {
  render() {
    return (
        <Router>
          <div className="App">
            <Route exact path="/" component={Posts} />
          </div>
        </Router>
    );
  }
}
export default App;