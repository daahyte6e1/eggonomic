// Polyfills for Node.js APIs in browser environment
import { Buffer } from 'buffer';
import process from 'process';

// Make Buffer and process available globally
if (typeof window !== 'undefined') {
  (window as any).Buffer = Buffer;
  (window as any).process = process;
}

// Also make them available as global variables
(globalThis as any).Buffer = Buffer;
(globalThis as any).process = process;

