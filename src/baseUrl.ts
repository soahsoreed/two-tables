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


export const baseUrl = 'http://localhost:3010/api';
// export const baseUrl = `${getAppHostWithProtocol(window.location)}:3010/api`;