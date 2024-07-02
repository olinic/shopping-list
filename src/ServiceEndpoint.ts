
export class ServiceEndpoint {

    readonly endpoint: string;

    constructor(proto: string, hostname: string, port?: number) {
        this.endpoint = `${proto}://${hostname}`;
        if (typeof port !== 'undefined') {
            this.endpoint += ":" + port;
        }
    }

    getServiceEndpoint(path: string) {
        return `${this.endpoint}/${path}`;
    }
}

const serviceEndpoint = new ServiceEndpoint(
    import.meta.env.VITE_SERVICE_PROTO,
    import.meta.env.VITE_SERVICE_HOSTNAME,
    import.meta.env.VITE_SERVICE_PORT);

export function getServiceEndpoint(path: string) {
    return serviceEndpoint.getServiceEndpoint(path);
}