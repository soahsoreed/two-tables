export interface ILocation {
  host: string;
  port: string;
  protocol: string;
}

export function getAppHostWithProtocol(location: ILocation) {
  const { host, protocol } = location;
  const withoutPort = /:\d{4}/;
  const hostWithoutPort = host.replace(withoutPort, '');

  const res = `${protocol}//${hostWithoutPort}`;
  return res;
}

export function addPort(host: string, port: string) {
  return `${host}:${port}`;
}

export function getHasuraEndpoint(port: string, isProd: boolean) {
  const hostWithProtocol = getAppHostWithProtocol(window.location);
  const endpoint =  isProd ? hostWithProtocol : addPort(hostWithProtocol, port);
  return endpoint;
}