# fusion-websocket-proxy-example

Demonstration of proxying websockets with koa. This example is useful for the following:

- Understanding how to use the HttpServerToken with Fusion.js.
- Using websockets with the Fusion.js frontend.
- Proxying websockets from within Fusion.js.
- Handling websocket messages in Fusion.js.

## Architecture

**Frontend**
The frontend is a universal Fusion.js application which includes a UI and also websocket proxy.

**Backend**
The backend is a simple websocket receiver, which responds to the proxied websocket events.

## Set up

```
cd packages/backend
cd packages/frontend && npm dev
```
