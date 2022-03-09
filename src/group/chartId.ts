import * as dataSamples from '@src/data';

import type { ChartID } from '@antv/ckb';
import type { DataSample } from '@src/data/interface';

export const DATA_FOR_CHART_TYPE: Partial<Record<ChartID, DataSample>> = {
  bar_chart: dataSamples.cars,
};
