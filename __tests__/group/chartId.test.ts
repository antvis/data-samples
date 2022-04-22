import { dataByChartId } from '../../src/group/chartId';

describe('get data samples by chart ID', () => {
  test('should work', async () => {
    const result = await dataByChartId('bar_chart');
    const { default: origin } = await import('../../src/data/chart/bar_chart-test/bar_chart-test-data.json');
    expect(result).toStrictEqual(origin);
  });
});
