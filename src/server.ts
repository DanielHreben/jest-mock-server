import { createServer, RequestListener, Server } from 'http';
import Koa, { Middleware } from 'koa';
import buildBodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import { AddressInfo } from 'net';
import { URL } from 'url';

interface Config {
  buildApp?: () => Koa;
  port?: number;
  host?: string;
}

type Path = string | RegExp;

function buildDefaultApp() {
  const app = new Koa();
  app.use(buildBodyParser());

  return app;
}

export class MockServer {
  private router!: Router;
  private server?: Server;
  private requestListener!: RequestListener;

  constructor(private config: Config = {}) {
    this.init();
  }

  public async start(): Promise<MockServer> {
    const server = createServer((req, res) => this.requestListener(req, res));

    await new Promise((resolve, reject) =>
      server
        .on('error', reject)
        .on('listening', resolve)
        .listen({ port: this.config.port || 0, host: this.config.host })
    );

    this.server = server;
    return this;
  }

  public get(path: Path) {
    return this.mockPath('get', path);
  }

  public head(path: Path) {
    return this.mockPath('head', path);
  }

  public post(path: Path) {
    return this.mockPath('post', path);
  }

  public put(path: Path) {
    return this.mockPath('put', path);
  }

  public delete(path: Path) {
    return this.mockPath('delete', path);
  }

  public options(path: Path) {
    return this.mockPath('options', path);
  }

  public trace(path: Path) {
    return this.mockPath('trace', path);
  }

  public patch(path: Path) {
    return this.mockPath('patch', path);
  }

  public all(path: Path) {
    const mock = this.getDefaultMock();
    this.router.all(path, mock);
    return mock;
  }

  public getURL(): URL {
    const server = this.server;

    if (!server) {
      throw new Error('Server is not started');
    }

    const { port } = server.address() as AddressInfo;
    const host = 'http://localhost';
    return new URL(`${host}:${port}`);
  }

  public async stop(): Promise<MockServer> {
    const server = this.server;

    if (!server) {
      return this;
    }

    await new Promise<void>((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });

    return this;
  }

  public reset(): MockServer {
    this.init();
    return this;
  }

  private init() {
    this.router = new Router();
    const app = this.config.buildApp?.() || buildDefaultApp();
    app.use(this.router.routes());
    this.requestListener = app.callback();
  }

  private mockPath(method: string, path: Path) {
    const mock = this.getDefaultMock();
    this.router.register(path, [method], mock);

    return mock;
  }

  private getDefaultMock() {
    const middleware: Middleware = (ctx, next) => next();
    return jest.fn(middleware);
  }
}
