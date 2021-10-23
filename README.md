# jest-mock-server
Test your http clients with jest:
  * use Koa API to define http handlers
  * use Jest API to define asserts

# Usage example
```typescript
import { MockServer } from 'jest-mock-server';
import fetch from 'node-fetch';

describe('Testing node-fetch HTTP client', () => {
  const server = new MockServer();

  beforeAll(() => server.start());
  afterAll(() => server.stop());
  beforeEach(() => server.reset());

  it('Receives a status over the network', async () => {
    const route = server
      .get('/')
      // Look ma, plain Jest API!
      .mockImplementationOnce((ctx) => {
        // ...and plain Koa API
        ctx.status = 200;
      })
      .mockImplementationOnce((ctx) => {
        ctx.status = 201;
      });

    // Since we did not passed any port into server constructor, server was started at random free port
    const url = server.getURL();

    const res1 = await fetch(url);
    expect(res1.status).toBe(200);

    const res2 = await fetch(url);
    expect(res2.status).toBe(201);

    const res3 = await fetch(url);
    expect(res3.status).toBe(404);

    expect(route).toHaveBeenCalledTimes(3); // Yep, jest API again
  });
});

```

## Using HTTPS for the server

```typescript
// You can pass in configuration to MockServer which will use the built-in certificate
const server = new MockServer({
  https: true
});

// If you want to supply your own certificate you can pass it in as follows
const server = new MockServer({
  https: true,
  httpsKey: 'path/to/key.pem',
  httpsCert: 'path/to/cert.pem',
});
