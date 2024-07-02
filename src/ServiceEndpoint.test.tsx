import { describe, test, expect } from 'vitest';
import * as ServiceEndpoint from './ServiceEndpoint';

describe('ServiceEndpoint', () => {

   test('gets endpoint with port', () => {
    ServiceEndpoint.configure("http", "local", 8080);
    expect(ServiceEndpoint.getServiceEndpoint("silly")).toBe("http://local:8080/silly");
   });

   test('gets endpoint without port', () => {
    ServiceEndpoint.configure("https", "example.com", undefined);
    expect(ServiceEndpoint.getServiceEndpoint("test")).toBe("https://example.com/test");
   });
});