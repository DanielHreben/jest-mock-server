[jest-mock-server](../README.md) / [Exports](../modules.md) / MockServer

# Class: MockServer

## Table of contents

### Constructors

- [constructor](mockserver.md#constructor)

### HTTP mocks Methods

- [all](mockserver.md#all)
- [delete](mockserver.md#delete)
- [get](mockserver.md#get)
- [head](mockserver.md#head)
- [options](mockserver.md#options)
- [patch](mockserver.md#patch)
- [post](mockserver.md#post)
- [put](mockserver.md#put)
- [trace](mockserver.md#trace)

### Lifecycle Methods

- [getURL](mockserver.md#geturl)
- [reset](mockserver.md#reset)
- [start](mockserver.md#start)
- [stop](mockserver.md#stop)

## Constructors

### constructor

\+ **new MockServer**(`config?`: Config): [*MockServer*](mockserver.md)

#### Parameters:

Name | Type | Default value |
:------ | :------ | :------ |
`config` | Config | {} |

**Returns:** [*MockServer*](mockserver.md)

Defined in: [server.ts:32](https://github.com/DanielHreben/jest-mock-http-server/blob/c4a027b/src/server.ts#L32)

## HTTP mocks Methods

### all

▸ **all**(`path`: Path): *Mock*<any, [*ParameterizedContext*<DefaultState, DefaultContext\>, Next]\>

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`path` | Path | String or RegExp, route path to register mock response   |

**Returns:** *Mock*<any, [*ParameterizedContext*<DefaultState, DefaultContext\>, Next]\>

jest.fn() mock function

Defined in: [server.ts:115](https://github.com/DanielHreben/jest-mock-http-server/blob/c4a027b/src/server.ts#L115)

___

### delete

▸ **delete**(`path`: Path): *Mock*<any, [*ParameterizedContext*<DefaultState, DefaultContext\>, Next]\>

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`path` | Path | String or RegExp, route path to register mock response   |

**Returns:** *Mock*<any, [*ParameterizedContext*<DefaultState, DefaultContext\>, Next]\>

jest.fn() mock function

Defined in: [server.ts:79](https://github.com/DanielHreben/jest-mock-http-server/blob/c4a027b/src/server.ts#L79)

___

### get

▸ **get**(`path`: Path): *Mock*<any, [*ParameterizedContext*<DefaultState, DefaultContext\>, Next]\>

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`path` | Path | String or RegExp, route path to register mock response   |

**Returns:** *Mock*<any, [*ParameterizedContext*<DefaultState, DefaultContext\>, Next]\>

jest.fn() mock function

Defined in: [server.ts:43](https://github.com/DanielHreben/jest-mock-http-server/blob/c4a027b/src/server.ts#L43)

___

### head

▸ **head**(`path`: Path): *Mock*<any, [*ParameterizedContext*<DefaultState, DefaultContext\>, Next]\>

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`path` | Path | String or RegExp, route path to register mock response   |

**Returns:** *Mock*<any, [*ParameterizedContext*<DefaultState, DefaultContext\>, Next]\>

jest.fn() mock function

Defined in: [server.ts:52](https://github.com/DanielHreben/jest-mock-http-server/blob/c4a027b/src/server.ts#L52)

___

### options

▸ **options**(`path`: Path): *Mock*<any, [*ParameterizedContext*<DefaultState, DefaultContext\>, Next]\>

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`path` | Path | String or RegExp, route path to register mock response   |

**Returns:** *Mock*<any, [*ParameterizedContext*<DefaultState, DefaultContext\>, Next]\>

jest.fn() mock function

Defined in: [server.ts:88](https://github.com/DanielHreben/jest-mock-http-server/blob/c4a027b/src/server.ts#L88)

___

### patch

▸ **patch**(`path`: Path): *Mock*<any, [*ParameterizedContext*<DefaultState, DefaultContext\>, Next]\>

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`path` | Path | String or RegExp, route path to register mock response   |

**Returns:** *Mock*<any, [*ParameterizedContext*<DefaultState, DefaultContext\>, Next]\>

jest.fn() mock function

Defined in: [server.ts:106](https://github.com/DanielHreben/jest-mock-http-server/blob/c4a027b/src/server.ts#L106)

___

### post

▸ **post**(`path`: Path): *Mock*<any, [*ParameterizedContext*<DefaultState, DefaultContext\>, Next]\>

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`path` | Path | String or RegExp, route path to register mock response   |

**Returns:** *Mock*<any, [*ParameterizedContext*<DefaultState, DefaultContext\>, Next]\>

jest.fn() mock function

Defined in: [server.ts:61](https://github.com/DanielHreben/jest-mock-http-server/blob/c4a027b/src/server.ts#L61)

___

### put

▸ **put**(`path`: Path): *Mock*<any, [*ParameterizedContext*<DefaultState, DefaultContext\>, Next]\>

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`path` | Path | String or RegExp, route path to register mock response   |

**Returns:** *Mock*<any, [*ParameterizedContext*<DefaultState, DefaultContext\>, Next]\>

jest.fn() mock function

Defined in: [server.ts:70](https://github.com/DanielHreben/jest-mock-http-server/blob/c4a027b/src/server.ts#L70)

___

### trace

▸ **trace**(`path`: Path): *Mock*<any, [*ParameterizedContext*<DefaultState, DefaultContext\>, Next]\>

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`path` | Path | String or RegExp, route path to register mock response   |

**Returns:** *Mock*<any, [*ParameterizedContext*<DefaultState, DefaultContext\>, Next]\>

jest.fn() mock function

Defined in: [server.ts:97](https://github.com/DanielHreben/jest-mock-http-server/blob/c4a027b/src/server.ts#L97)

___

## Lifecycle Methods

### getURL

▸ **getURL**(): *URL*

**`description`** Get a URL pointing at localhost and port used by running server

**`requires`** MockServer.start()

**`throws`** if server is not started

**Returns:** *URL*

Defined in: [server.ts:172](https://github.com/DanielHreben/jest-mock-http-server/blob/c4a027b/src/server.ts#L172)

___

### reset

▸ **reset**(): [*MockServer*](mockserver.md)

**`description`** Reset all registered mocks without restarting a server

**Returns:** [*MockServer*](mockserver.md)

Defined in: [server.ts:161](https://github.com/DanielHreben/jest-mock-http-server/blob/c4a027b/src/server.ts#L161)

___

### start

▸ **start**(): *Promise*<[*MockServer*](mockserver.md)\>

**`description`** Start mock http server

**Returns:** *Promise*<[*MockServer*](mockserver.md)\>

Defined in: [server.ts:125](https://github.com/DanielHreben/jest-mock-http-server/blob/c4a027b/src/server.ts#L125)

___

### stop

▸ **stop**(): *Promise*<[*MockServer*](mockserver.md)\>

**`description`** Stop mock http server

**Returns:** *Promise*<[*MockServer*](mockserver.md)\>

Defined in: [server.ts:143](https://github.com/DanielHreben/jest-mock-http-server/blob/c4a027b/src/server.ts#L143)
