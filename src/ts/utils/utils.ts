// https://github.com/microsoft/TypeScript/issues/1897#issuecomment-331765301
// https://github.com/Microsoft/TypeScript/issues/3496#issuecomment-128553540
export type JSONPrimitive = string | number | boolean | null
export type JSONValue = JSONPrimitive | JSONObject | JSONArray
export type JSONObject = { [member: string]: JSONValue }
export interface JSONArray extends Array<JSONValue> {}
