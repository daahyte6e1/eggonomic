// Polyfills for Node.js APIs in browser environment
import { Buffer } from 'buffer';
import process from 'process';

// Make Buffer and process available globally
if (typeof window !== 'undefined') {
  (window as typeof window & { Buffer: typeof Buffer; process: typeof process }).Buffer = Buffer;
  (window as typeof window & { Buffer: typeof Buffer; process: typeof process }).process = process;
}

// Also make them available as global variables
(globalThis as typeof globalThis & { Buffer: typeof Buffer; process: typeof process }).Buffer = Buffer;
(globalThis as typeof globalThis & { Buffer: typeof Buffer; process: typeof process }).process = process;

