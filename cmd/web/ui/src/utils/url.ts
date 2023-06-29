export function getHTTPEndpoint() {
  return import.meta.env.DEV
    ? 'http://localhost:8080'
    : ''
}