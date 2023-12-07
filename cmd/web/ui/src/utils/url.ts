export function getHTTPEndpoint() {
  return import.meta.env.DEV
    ? 'http://localhost:8080'
    : ''
}

export function hostFmt(strings: TemplateStringsArray, ...rest: any[]) {
  return `${getHTTPEndpoint()}${strings[0]}${rest.reduce((prev, curr) => `${prev}${curr}`, '')}`
}