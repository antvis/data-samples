const { CKBJson, CHART_ID_OPTIONS, LOM_OPTIONS } = require("@antv/knowledge");
const { singlePreCombine, getAllCombine } = require("./utils");
const { DataSamples, getDataPropsCombine } = require("../dist");

// fully completed knowledge
const completedCharts = CKBJson("en-US", true);

/**
 * get all combine of chart data props
 * @param {DataPrerequisiteJSON} dataPres
 * @returns {Map} eg 'Time*Interval' => [ 'line_chart', 'step_line_chart', 'area_chart', 'waterfall_chart' ]
 */
function getDataPropsCombineByChartMap() {
  const chartMap = new Map();
  // 循环遍历每个图表类型
  for (const chartId of CHART_ID_OPTIONS) {
    const chartInfo = completedCharts[chartId];
    // 有完整描述的图表 && 去除图类型
    if (chartInfo && chartInfo.dataPres.every((i) => i.maxQty !== "*")) {
      // 通过 dataPres 获得每个字段可能的类型组合
      // [
      //   [ [ 'Time' ], [ 'Ordinal' ] ],
      //   [ null, [ 'Nominal' ] ],
      //   [ [ 'Interval' ] ]
      // ]
      const dataPresCombine = chartInfo.dataPres.reduce(
        (prev, { minQty, maxQty, fieldConditions }) => {
          prev.push(singlePreCombine(minQty, maxQty, fieldConditions));
          return prev;
        },
        []
      );
      // 将几个字段类型组合到一起
      // line_chart => [
      //   'Time*Interval',
      //   'Ordinal*Interval',
      //   'Time*Nominal*Interval',
      //   'Ordinal*Nominal*Interval'
      // ]
      const combines = getAllCombine(dataPresCombine);
      chartMap.set(chartId, combines);
    }
  }

  // 'Time*Interval' => [ 'line_chart', 'step_line_chart', 'area_chart', 'waterfall_chart' ]
  const dataPresCombineMap = new Map();
  chartMap.forEach((dataPresCombines, chartId) => {
    dataPresCombines.forEach((v) => {
      if (dataPresCombineMap.has(v)) {
        dataPresCombineMap.set(v, dataPresCombineMap.get(v).concat(chartId));
      } else {
        dataPresCombineMap.set(v, [chartId]);
      }
    });
  });
  return dataPresCombineMap;
}

function getDataSamplesCombineMap(DataSamples) {
  const dataNames = Object.keys(DataSamples);
  const dataSamplesCombineMap = new Map();
  dataNames.forEach((name) => {
    const dataPropCombines = Object.values(getDataPropsCombine(name));
    dataPropCombines.forEach((dataProps) => {
      if (dataSamplesCombineMap.has(dataProps)) {
        const prevDataSamples = dataSamplesCombineMap.get(dataProps);
        if (prevDataSamples.indexOf(name) === -1) {
          dataSamplesCombineMap.set(dataProps, [...prevDataSamples, name]);
        }
      } else {
        dataSamplesCombineMap.set(dataProps, [name]);
      }
    });
  });
  return dataSamplesCombineMap;
}

const dataPropsCombineByChartMap = getDataPropsCombineByChartMap();
const dataSamplesMap = getDataSamplesCombineMap(DataSamples);
console.log("dataSamplesMap: ", dataSamplesMap);

/**
 * @example
 * ```md
 * |dataProp|chartType|dataSamples|
 * ```
 */
const printResult = [];

function printFormat(array) {
  // let arrStr = Array.isArray(array) ? array.join(",") : "";
  // return arrStr;
  return array;
}

dataPropsCombineByChartMap.forEach((charts, dataProps) => {
  printResult.push({
    dataProps,
    charts: printFormat(charts),
    dataSamples: printFormat(dataSamplesMap.get(dataProps)),
  });
});
console.table(printResult);