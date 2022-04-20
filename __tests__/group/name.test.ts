import { dataByName } from '../../src/group/name';

describe('get data samples by name', () => {
  test('should work', async () => {
    const result = dataByName('area-sales');
    const { default: origin } = await import('../../src/data/story/area-sales/area-sales.json');
    expect(result).toStrictEqual(origin);
  });
});
