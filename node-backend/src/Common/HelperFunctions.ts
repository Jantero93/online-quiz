/**
 * Check do object have keys (properties)
 * @param obj Object
 * @returns Return true if object doesn't have any key
 */
export const isObjectEmpty = (obj: object) => Object.keys(obj).length === 0;

/**
 * Check is given parameter object type
 * @param param Parameter
 * @returns Return true if param is object
 */
export const isObjectOrArray = (param: unknown) =>
  typeof param === 'object' || Array.isArray(param);
