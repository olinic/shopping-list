import { describe, test, expect } from 'vitest';
import { ServiceEndpoint } from './ServiceEndpoint';

describe('ServiceEndpoint', () => {

   test('gets endpoint with port', () => {
    expect(new ServiceEndpoint("http", "local", 8080).getServiceEndpoint("silly")).toBe("http://local:8080/silly");
   });

   test('gets endpoint without port', () => {
    expect(new ServiceEndpoint("https", "example.com", undefined).getServiceEndpoint("test")).toBe("https://example.com/test");
   });
});