/**
 * Check do object have keys (properties)
 * @param obj Object
 * @returns Return true if object doesn't have any key
 */
export const isObjectEmpty = (obj: object) => Object.keys(obj).length === 0;
