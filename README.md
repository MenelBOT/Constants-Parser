# constants-parser

`constants-parser` is a utility module designed to create and merge configuration objects from environment variables. This is particularly useful for managing configurations in Node.js applications.

## Features

- Merges configuration objects deeply.
- Provides type safety with TypeScript.

## Installation

You can install the package using npm:

```bash
npm install constants-parser
```

Or with yarn:

```bash
yarn add constants-parser
```

## Usage

First, import the `create` function from the package:

```ts
import { create } from 'constants-parser';
```

Define your configuration prototype and options:

```ts
type Config = {
    apiUrl: string;
    timeout: number;
    nestedConfig: {
        featureEnabled: boolean;
    };
};

const prototype: Config = {
    apiUrl: 'https://default.api.com',
    timeout: 3000,
    nestedConfig: {
        featureEnabled: false,
    },
};

const options = {
    key: 'MY_APP_CONFIG',
    prototype: prototype,
    environment: process.env, // optional, defaults to process.env
};
```

Create the configuration object:

```ts
const config = create<Config>(options);

if (config) {
    console.log('Configuration:', config);
}
```

Set the environment variable before running your application:

```bash
export MY_APP_CONFIG='{"apiUrl": "https://custom.api.com", "timeout": 5000, "nestedConfig": {"featureEnabled": true}}'
node your-app.js
```

## Types

### Options

Represents the options for the `create` function.

```ts
type Options<T extends anyObj> = {
    key: string;
    prototype: T;
    environment?: NodeJS.ProcessEnv;
};
```

## Development

### Scripts

- `build`: Cleans the `dist` directory and compiles TypeScript files.
- `lint`: Runs ESLint on TypeScript files.
- `test`: Runs tests using Jest.

### Building the Project

To build the project, run:

```bash
npm run build
```

### Running Tests

To run tests, use:

```bash
npm test
```

### Linting

To lint the project, run:

```bash
npm run lint
```

## License

This project is licensed under the MIT License.

## Author

menelreal  
Email: beater_align0e@icloud.com