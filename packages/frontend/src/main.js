// @flow
import App from 'fusion-react';
import {createPlugin, HttpServerToken} from 'fusion-core';
import Router from 'fusion-plugin-react-router';
import httpProxy from 'http-proxy';

import root from './root.js';

import {server as WebSocketServer} from 'websocket';

export default () => {
  const app = new App(root);
  app.register(Router);

  if (__NODE__) {
    var proxy = new httpProxy.createProxyServer({
      target: {
        host: 'localhost',
        port: 3001,
      },
      ws: true,
    });

    app.register(
      createPlugin({
        deps: {
          httpServer: HttpServerToken,
        },
        middleware: ({httpServer}) => {
          httpServer.on('upgrade', function(req, socket, head) {
            console.log('Got upgrade request, proxying.');
            proxy.ws(req, socket, head);
          });

          return async (ctx, next) => {
            await next();
          };
        },
      })
    );
  }

  return app;
};
