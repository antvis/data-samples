import { dataSample } from '../../src';

describe('datasample', () => {
  test('cars', () => {
    const { data, info } = dataSample('cars');
    expect(Object.keys(data[0])).toEqual(info.fieldNames);
  });
});
