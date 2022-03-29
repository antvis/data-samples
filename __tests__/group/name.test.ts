import { dataSamples, DATA_SAMPLES_BY_NAME } from '../../src';

describe('get data samples by name', () => {
  test('amount count equal', () => {
    expect(Object.keys(dataSamples).length > Object.keys(DATA_SAMPLES_BY_NAME).length).toBe(true);
  });
});
