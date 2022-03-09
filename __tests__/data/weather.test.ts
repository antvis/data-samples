import { dataSample } from '../../src';

describe('datasample', () => {
  test('weather', () => {
    const { data, info } = dataSample('weather');
    expect(Object.keys(data[0])).toEqual(info.fieldNames);
  });
});
