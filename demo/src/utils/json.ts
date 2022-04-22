export const formatJSONObject = (json: Object): string => {
  return JSON.stringify(json, null, 2);
};
