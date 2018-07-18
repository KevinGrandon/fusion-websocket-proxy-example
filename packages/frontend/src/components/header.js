// @flow
import React, {Component} from 'react';

import {Link} from 'fusion-plugin-react-router';

export default class Header extends Component<any, any> {
  render() {
    return (
      <header>
        <h1>Websocket Proxy</h1>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </header>
    );
  }
}
