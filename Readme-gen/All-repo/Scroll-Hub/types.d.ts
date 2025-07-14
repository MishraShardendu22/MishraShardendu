/* eslint-disable no-var */
import { Connection } from 'mongoose';

declare global {
  var mongoose: {
    connection: Connection | null;
    promise: Promise<Connection> | null;
  };
}

// To avoid TS error
export {};
