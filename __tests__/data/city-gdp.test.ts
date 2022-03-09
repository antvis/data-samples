import { dataSample } from '../../src';

describe('datasample', () => {
  test('city-gdp', () => {
    const { data, info } = dataSample('city_gdp');

    expect(Object.keys(data[0])).toEqual(info.fieldNames);
  });
});
