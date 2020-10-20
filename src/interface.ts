import { LevelOfMeasurement } from "@antv/knowledge";
export const DATA_NAMES = ["city_gdp", "area_sales", "area_sales_type"] as const;
export type DataName = typeof DATA_NAMES[number];
export type AnyData = Record<string, any>[];
export type DataSets = Record<DataName, AnyData>;
export type DetailDataSets = Record<
  DataName,
  {
    data: AnyData;
    fields: Record<string, LevelOfMeasurement>;
    combine: string[];
  }
>;
