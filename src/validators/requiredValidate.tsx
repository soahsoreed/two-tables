export function requiredValidate<T>(target: T) {
  return target !== null
    && target !== undefined
    && target !== '';
}
