import * as ds from '@src/data';

import type { ChartID } from '@antv/ckb';
import type { DataSample } from '@src/data/interface';

export const DATA_FOR_CHART_TYPE: Partial<Record<ChartID, DataSample>> = {
  // TODO fill all chart types
  bar_chart: ds.barChartTestData,
};
