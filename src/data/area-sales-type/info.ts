import { DataSampleInfo } from "../../interface";

const FIELD_NAMES = ["area", "sales", "type"] as const;
type FieldName = typeof FIELD_NAMES[number];

const info: DataSampleInfo<FieldName> = {
  dataName: "city-gdp",
  fieldNames: FIELD_NAMES,
  fieldLOM: {
    area: "Nominal",
    sales: "Interval",
    type: "Nominal",
  },
  combine: [["area", "sales", "type"]],
};

export default info;
