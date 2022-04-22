import Ajv from 'ajv';

import jsondataSchema from '../../../schema/jsondataSchema.json';

const ajv = new Ajv();

const validateSchema = ajv.compile(jsondataSchema);

export const isValidJsonData = (candidate: any) => {
  try {
    let json: any;
    if (typeof candidate === 'string') {
      json = JSON.parse(candidate);
    } else if (typeof candidate === 'object') {
      json = candidate;
    } else {
      return false;
    }

    return validateSchema(json);
  } catch (error) {
    return false;
  }
};
