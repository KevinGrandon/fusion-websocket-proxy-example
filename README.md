# websocket-proxy-koa

Demonstration of proxying websockets with koa.

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
