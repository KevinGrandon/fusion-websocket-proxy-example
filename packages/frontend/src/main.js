// @flow
import App from 'fusion-react';
import {createPlugin, HttpServerToken} from 'fusion-core';
import Router from 'fusion-plugin-react-router';

import root from './root.js';

import {server as WebSocketServer} from 'websocket';

export default () => {
  const app = new App(root);
  app.register(Router);

  if (__NODE__) {
    app.register(
      createPlugin({
        deps: {
          httpServer: HttpServerToken,
        },
        middleware: ({httpServer}) => {
          return async (ctx, next) => {
            const wsServer = new WebSocketServer({
              httpServer: httpServer,
            });

            wsServer.on('request', function(request) {
              var connection = request.accept(null, request.origin);

              // This is the most important callback for us, we'll handle
              // all messages from users here.
              connection.on('message', function(message) {
                console.log('Got message from client', message);
                if (message.type === 'utf8') {
                  // process WebSocket message
                }
              });

              connection.sendUTF(
                JSON.stringify({type: 'message', data: 'foobar'})
              );

              connection.on('close', function(connection) {
                console.log('Connection closed');
                // close user connection
              });
            });

            // do middleware things...
            //             httpServer.on('upgrade', (req, socket, head) => {
            //               console.log('got server upgrade request');
            //               console.log('req ' + Object.keys(req));
            //               console.log('socket ' + Object.keys(socket));
            //               console.log('head ' + head);
            //               // proxy.ws(req, socket, head);
            //               socket.write(`HTTP/1.1 101 Switching Protocols
            // Upgrade: websocket
            // Connection: Upgrade
            // Sec-WebSocket-Accept: HSmrc0sMlYUkAGmm5OPpG2HaGWk=
            // Sec-WebSocket-Protocol: chat`);
            //             });
            await next();
            // do middleware things...
          };
        },
      })
    );
  }

  return app;
};
