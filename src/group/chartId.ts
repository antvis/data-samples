import { chart as cd } from '../data';

import type { ChartID } from '@antv/ckb';
import type { Data } from '@src/interface';

export const DATA_FOR_CHART_TYPE: Partial<Record<ChartID, Data>> = {
  // pie
  pie_chart: cd.pieChartTestData.data,
  donut_chart: cd.donutChartTestData.data,
  // line
  line_chart: cd.lineChartTestData.data,
  step_line_chart: cd.stepLineChartTestData.data,
  // area
  area_chart: cd.areaChartTestData.data,
  stacked_area_chart: cd.stackedAreaChartTestData.data,
  percent_stacked_area_chart: cd.stackedAreaChartTestData.data,
  // bar
  bar_chart: cd.barChartTestData.data,
  grouped_bar_chart: cd.groupedBarChartTestData.data,
  stacked_bar_chart: cd.stackedBarChartTestData.data,
  percent_stacked_bar_chart: cd.stackedBarChartTestData.data,
  // column
  column_chart: cd.columnChartTestData.data,
  grouped_column_chart: cd.groupedBarChartTestData.data,
  stacked_column_chart: cd.stackedBarChartTestData.data,
  percent_stacked_column_chart: cd.stackedBarChartTestData.data,
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
