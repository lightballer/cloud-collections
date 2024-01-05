import { SetupServer, setupServer } from 'msw/node';

export const server = (handlers: any[]): SetupServer => setupServer(...handlers);