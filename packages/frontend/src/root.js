// @flow
import React from 'react';

import {Route, Switch} from 'fusion-plugin-react-router';

import Header from './components/header.js';
import Home from './pages/home.js';
import PageNotFound from './pages/pageNotFound.js';

class Root extends React.Component {
  componentDidMount() {
    const socket = new WebSocket('ws://localhost:3000');

    // Connection opened
    socket.addEventListener('open', function(event) {
      socket.send('Hello Server!');
    });

    // Listen for messages
    socket.addEventListener('message', function(event) {
      console.log('Message from server ', event.data);
    });
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    );
  }
}
export default <Root />;
