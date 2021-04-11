import { Context } from 'koa';
import Koa from 'koa';
import fetch from 'node-fetch';
import { URL } from 'url';

import { MockServer } from '../src/server';

describe('TestServer', () => {
  let server: MockServer;

  afterEach(() => server.stop());

  it('Should start server at free port', async () => {
    server = new MockServer();
    await server.start();

    const url = server.getURL();

    expect(url.hostname).toEqual('localhost');
    expect(Number.parseInt(url.port, 10)).toBeGreaterThan(1024);
  });

  it('Should start server at specified port', async () => {
    const port = 4242;
    server = new MockServer({ port });
    await server.start();

    const url = server.getURL();

    expect(url.hostname).toEqual('localhost');
    expect(Number.parseInt(url.port, 10)).toBe(port);
  });

  it('Should throw an error if port is busy', async () => {
    const port = 4242;
    server = new MockServer({ port });
    await server.start();

    await expect(() => new MockServer({ port }).start()).rejects.toThrowError(
      `listen EADDRINUSE: address already in use :::${port}`
    );
  });

  it('Should throw an error if server is not started', () => {
    server = new MockServer({ port: 4242 });
    expect(() => server.getURL()).toThrowError('Server is not started');
  });

  it('Should be ok to stop server if it is not started', async () => {
    server = new MockServer();
    await expect(server.stop()).resolves.toBeInstanceOf(MockServer);
  });

  it('Should reply to any HTTP method', async () => {
    server = new MockServer();
    await server.start();

    server.all(/.*/).mockImplementation((ctx) => {
      ctx.body = { test: true };
    });

    const res = await fetch(new URL('/blah', server.getURL()));
    const body = await res.json();
    expect(body).toEqual({ test: true });
  });

  it('Should support json requests bodies by default', async () => {
    server = new MockServer();
    await server.start();

    const mock = server.post('/json').mockImplementation((ctx) => {
      ctx.status = 200;
    });

    const res = await fetch(new URL('/json', server.getURL()), {
      method: 'POST',
      body: JSON.stringify({ test: true }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    expect(res.status).toEqual(200);
    expect(mock).toHaveBeenCalledWith(
      expect.objectContaining({
        originalUrl: '/json',
        method: 'POST',
        request: expect.objectContaining({
          body: { test: true },
        }),
      }),
      expect.any(Function)
    );
  });

  it('Should use custom koa server if supplied', async () => {
    const customMiddleware = jest.fn((ctx, next) => {
      ctx.set('test', 'true');
      return next();
    });

    const buildApp = () => {
      const app = new Koa();
      app.use(customMiddleware);
      return app;
    };

    server = new MockServer({ buildApp });
    await server.start();

    server.all(/.*/).mockImplementation((ctx) => {
      ctx.body = { test: true };
    });

    const res = await fetch(new URL('/blah', server.getURL()));
    expect(res.headers.get('test')).toEqual('true');

    const body = await res.json();
    expect(body).toEqual({ test: true });

    expect(customMiddleware).toHaveBeenCalled();
  });

  it('Should let reset all mocks', async () => {
    server = new MockServer();
    await server.start();

    const url = server.getURL();

    server.all(/.*/).mockImplementation((ctx) => {
      ctx.body = { error: true };
      ctx.status = 500;
    });

    const failedRes = await fetch(new URL('/blah', url));
    const failedResBody = await failedRes.json();
    expect(failedResBody).toEqual({ error: true });

    await server.reset();

    expect(server.getURL()).toEqual(url);

    const res = await fetch(url);
    expect(res.status).toEqual(404);

    const body = await res.text();
    expect(body).toEqual('Not Found');
  });

  it('Should support one-time mocks', async () => {
    server = new MockServer();
    await server.start();

    server
      .get('/test')
      .mockImplementationOnce((ctx) => {
        ctx.status = 200;
      })
      .mockImplementationOnce((ctx) => {
        ctx.status = 201;
      });

    const url = new URL('/test', server.getURL());

    const res1 = await fetch(url);
    expect(res1.status).toBe(200);

    const res2 = await fetch(url);
    expect(res2.status).toBe(201);

    const res3 = await fetch(url);
    expect(res3.status).toBe(404);
  });

  it('Should support all HTTP methods', async () => {
    server = new MockServer();
    await server.start();

    const mock = (ctx: Context) => {
      ctx.response.set('test', 'true');
      ctx.response.set('method', ctx.request.method);
      ctx.status = 200;
    };

    const methods = {
      GET: server.get('/test/GET').mockImplementation(mock),
      HEAD: server.head('/test/HEAD').mockImplementation(mock),
      POST: server.post('/test/POST').mockImplementation(mock),
      PUT: server.put('/test/PUT').mockImplementation(mock),
      DELETE: server.delete('/test/DELETE').mockImplementation(mock),
      OPTIONS: server.options('/test/OPTIONS').mockImplementation(mock),
      TRACE: server.trace('/test/TRACE').mockImplementation(mock),
      PATCH: server.patch('/test/PATCH').mockImplementation(mock),
    } as const;

    const url = server.getURL();

    await Promise.all(
      Object.entries(methods).map(async ([method, mock]) => {
        const res = await fetch(new URL(`/test/${method}`, url), {
          method,
        });

        expect(res.status).toBe(200);

        expect(res.headers.raw()).toMatchObject({
          test: ['true'],
          method: [method],
        });

        expect(mock).toHaveBeenCalledWith(
          expect.objectContaining({
            originalUrl: `/test/${method}`,
          }),
          expect.any(Function)
        );
      })
    );
  });
});
