import * as dataSamples from '@src/data';

import type { DataSample } from '@src/data/interface';

export const DATA_SAMPLES_BY_NAME: Record<string, DataSample> = {
  city_gdp: dataSamples.cityGdp,
  area_sales: dataSamples.areaSales,
  area_sales_type: dataSamples.areaSalesType,
  cars: dataSamples.cars,
  movies: dataSamples.movies,
  weather: dataSamples.weather,
};
