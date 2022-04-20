import { chart as cd } from '../data';

import type { ChartID } from '@antv/ckb';
import type { Data } from '@src/data/interface';

const DATA_FOR_CHART_TYPE: Partial<Record<ChartID, Data>> = {
  // pie
  pie_chart: cd.pieChartTestData.data,
  donut_chart: cd.donutChartTestData.data,
  // line
  line_chart: cd.lineChartTestData.data,
  step_line_chart: cd.stepLineChartTestData.data,
  // area
  area_chart: cd.areaChartTestData.data,
  stacked_area_chart: cd.stackedAreaChartTestData.data,
  // TODO percent_stacked_area_chart:cd.?
  // bar
  bar_chart: cd.barChartTestData.data,
  grouped_bar_chart: cd.groupedBarChartTestData.data,
  stacked_bar_chart: cd.stackedBarChartTestData.data,
  // TODO percent_stacked_bar_chart:cd.?
  // column
  column_chart: cd.columnChartTestData.data,
  grouped_column_chart: cd.groupedBarChartTestData.data,
  // TODO stacked_column_chart:cd.?
  // TODO percent_stacked_column_chart:cd.?
  // scatter
  scatter_plot: cd.scatterPlotTestData.data,
  // bubble
  bubble_chart: cd.bubbleChartTestData.data,
  // histogram
  histogram: cd.histogramTestData.data,
  // heatmap
  heatmap: cd.heatmapTestData.data,
};

type AvailableChartId = keyof typeof DATA_FOR_CHART_TYPE;

export function dataByChartId(chart: AvailableChartId) {
  return DATA_FOR_CHART_TYPE[chart];
}
