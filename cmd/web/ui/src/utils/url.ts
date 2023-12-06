export function getHTTPEndpoint() {
  return import.meta.env.DEV
    ? 'http://localhost:8080'
    : ''
}

export function hostFmt(strings: TemplateStringsArray) {
  return `${getHTTPEndpoint()}${strings[0]}`
}