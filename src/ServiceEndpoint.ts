
let _hostname: string = "";
let _proto: string = "";
let _port: number | undefined;

configure(
    import.meta.env.VITE_SERVICE_PROTO,
    import.meta.env.VITE_SERVICE_HOSTNAME,
    import.meta.env.VITE_SERVICE_PORT);

export function configure(proto: string, hostname: string, port?: number) {
    _proto = proto;
    _hostname = hostname;
    _port = port;
}

function buildEndpoint() {
    let endpoint = `${_proto}://${_hostname}`;
    if (typeof _port !== 'undefined') {
        endpoint += ":" + _port;
    }
    return endpoint;
}

export function getServiceEndpoint(path: string) {
    return `${buildEndpoint()}/${path}`;
}