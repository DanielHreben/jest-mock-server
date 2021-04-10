import { createServer, RequestListener, Server } from 'http';
import Koa from 'koa';
import buildBodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import { AddressInfo } from 'net';
import { URL } from 'url';

interface Config {
  buildApp?: () => Koa;
  port?: number;
}

type Path = string | RegExp;

function buildDefaultApp() {
  const app = new Koa();

  const bodyParser = buildBodyParser({
    extendTypes: {
      json: ['application/json'],
    },
  });

  app.use(bodyParser);

  return app;
}

export class MockServer {
  private router!: Router;
  private server?: Server;
  private requestListener!: RequestListener;

  constructor(private config: Config = {}) {
    this.init();
  }

  /**
   * @category HTTP mocks
   * @param path String or RegExp, route path to register mock response
   * @returns jest.fn() mock function
   */
  public get(path: Path) {
    return this.mockPath('get', path);
  }

  /**
   * @category HTTP mocks
   * @param path String or RegExp, route path to register mock response
   * @returns jest.fn() mock function
   */
  public head(path: Path) {
    return this.mockPath('head', path);
  }

  /**
   * @category HTTP mocks
   * @param path String or RegExp, route path to register mock response
   * @returns jest.fn() mock function
   */
  public post(path: Path) {
    return this.mockPath('post', path);
  }

  /**
   * @category HTTP mocks
   * @param path String or RegExp, route path to register mock response
   * @returns jest.fn() mock function
   */
  public put(path: Path) {
    return this.mockPath('put', path);
  }

  /**
   * @category HTTP mocks
   * @param path String or RegExp, route path to register mock response
   * @returns jest.fn() mock function
   */
  public delete(path: Path) {
    return this.mockPath('delete', path);
  }

  /**
   * @category HTTP mocks
   * @param path String or RegExp, route path to register mock response
   * @returns jest.fn() mock function
   */
  public options(path: Path) {
    return this.mockPath('options', path);
  }

  /**
   * @category HTTP mocks
   * @param path String or RegExp, route path to register mock response
   * @returns jest.fn() mock function
   */
  public trace(path: Path) {
    return this.mockPath('trace', path);
  }

  /**
   * @category HTTP mocks
   * @param path String or RegExp, route path to register mock response
   * @returns jest.fn() mock function
   */
  public patch(path: Path) {
    return this.mockPath('patch', path);
  }

  /**
   * @category HTTP mocks
   * @param path String or RegExp, route path to register mock response
   * @returns jest.fn() mock function
   */
  public all(path: Path) {
    const mock = this.getDefaultMock();
    this.router.all(path, mock);
    return mock;
  }

  /**
   * @category Lifecycle
   * @description Start mock http server
   */
  public async start(): Promise<MockServer> {
    const server = createServer((req, res) => this.requestListener(req, res));

    await new Promise((resolve, reject) =>
      server
        .on('error', reject)
        .on('listening', resolve)
        .listen({ port: this.config.port || 0 })
    );

    this.server = server;
    return this;
  }

  /**
   * @category Lifecycle
   * @description Stop mock http server
   */
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

  /**
   * @category Lifecycle
   * @description Reset all registered mocks without restarting a server
   */
  public reset(): MockServer {
    this.init();
    return this;
  }

  /**
   * @category Lifecycle
   * @description Get a URL pointing at localhost and port used by running server
   * @requires MockServer.start()
   * @throws if server is not started
   */
  public getURL(): URL {
    const server = this.server;

    if (!server) {
      throw new Error('Server is not started');
    }

    const { port } = server.address() as AddressInfo;
    const host = 'http://localhost';
    return new URL(`${host}:${port}`);
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
    return jest.fn<ReturnType<Koa.Middleware>, Parameters<Koa.Middleware>>((ctx, next) => next());
  }
}
