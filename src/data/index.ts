import { DetailDataSets, DataSets, DataName } from "../interface";

import city_gdp from "./city-gdp.json";
import area_sales from "./area-sales.json";
import area_sales_type from "./area-sales-type.json";

const DetailDataSamples: DetailDataSets = {
  city_gdp: city_gdp as any,
  area_sales: area_sales as any,
  area_sales_type: area_sales_type as any,
};

function mapData(detailDataSamples: DetailDataSets): DataSets {
  const datasets: any = {};
  let keys = Object.keys(detailDataSamples);
  for (let i = 0; i < keys.length; i++) {
    datasets[keys[i]] = detailDataSamples[keys[i] as DataName].data;
  }
  return datasets as DataSets;
}

export const DataSamples = mapData(DetailDataSamples);
export function getDataPropsCombine(name: DataName) {
  const { fields, combine } = DetailDataSamples[name];
  return combine.map(i => {
    const fieldCombine = i.split("*");
    return fieldCombine.map(f => fields[f]).sort().join("*");
  })
}
