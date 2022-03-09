import { DataSampleInfo } from '../../interface';

const FIELD_NAMES = ['yearmonth', 'gdp', 'city'] as const;
type FieldName = typeof FIELD_NAMES[number];

const info: DataSampleInfo<FieldName> = {
  dataName: 'city-gdp',
  fieldNames: FIELD_NAMES,
  fieldLOM: {
    yearmonth: 'Time',
    gdp: 'Interval',
    city: 'Nominal',
  },
  combine: [
    ['yearmonth', 'gdp'],
    ['yearmonth', 'gdp', 'city'],
  ],
};

export default info;
