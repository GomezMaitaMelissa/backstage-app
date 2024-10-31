export const nestedValue = (data: any, path: string) => {
  // eslint-disable-next-line
  return new Function('obj', `return obj.${path};`)(data)
}
