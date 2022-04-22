import { chart as cd } from '../data';
import { dataByName } from './name';

import type { ChartID } from '@antv/ckb';
import type { Data, DataSample } from '../interface';

export const DATA_SAMPLES_BY_CHART_ID: Partial<Record<ChartID, DataSample>> = {
  // pie
  pie_chart: cd.pieChartTestData,
  donut_chart: cd.donutChartTestData,
  // line
  line_chart: cd.lineChartTestData,
  step_line_chart: cd.stepLineChartTestData,
  // area
  area_chart: cd.areaChartTestData,
  stacked_area_chart: cd.stackedAreaChartTestData,
  percent_stacked_area_chart: cd.stackedAreaChartTestData,
  // bar
  bar_chart: cd.barChartTestData,
  grouped_bar_chart: cd.groupedBarChartTestData,
  stacked_bar_chart: cd.stackedBarChartTestData,
  percent_stacked_bar_chart: cd.stackedBarChartTestData,
  // column
  column_chart: cd.columnChartTestData,
  grouped_column_chart: cd.groupedBarChartTestData,
  stacked_column_chart: cd.stackedBarChartTestData,
  percent_stacked_column_chart: cd.stackedBarChartTestData,
  // scatter
  scatter_plot: cd.scatterPlotTestData,
  // bubble
  bubble_chart: cd.bubbleChartTestData,
  // histogram
  histogram: cd.histogramTestData,
  // heatmap
  heatmap: cd.heatmapTestData,
};

export async function dataByChartId(chartId: ChartID): Promise<Data> {
  if (!DATA_SAMPLES_BY_CHART_ID[chartId]) {
    throw new Error(`Data Sample for Chart ID ${chartId} is NOT available yet.`);
  }

  const dsName = DATA_SAMPLES_BY_CHART_ID[chartId]!.name;
  const data = await dataByName(dsName);

  return data;
}
