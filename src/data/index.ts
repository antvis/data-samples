import { DataName, DataSample, Data } from '../interface';

import city_gdp from './city-gdp/index';
import area_sales from './area-sales/index';
import area_sales_type from './area-sales-type/index';
import cars from './cars';
import movies from './movies';
import weather from './weather';

const DATA_SAMPLES: Record<DataName, DataSample> = {
  city_gdp: city_gdp,
  area_sales: area_sales,
  area_sales_type: area_sales_type,
  cars: cars,
  movies: movies,
  weather: weather,
};

export function getDataPropsCombine(name: DataName) {
  const { fieldLOM, combine } = DATA_SAMPLES[name].info;
  return combine.map((comb) => {
    return comb
      .map((f) => fieldLOM[f])
      .sort()
      .join('*');
  });
}

export function dataSample(dataName: DataName): DataSample {
  return DATA_SAMPLES[dataName] as DataSample;
}

export function dataSampleData(dataName: DataName): Data {
  return DATA_SAMPLES[dataName].data;
}

export function dataSampleUrl(dataName: DataName): string {
  return DATA_SAMPLES[dataName].url || '';
}
