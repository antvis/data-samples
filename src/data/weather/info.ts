import { DataSampleInfo } from '../../interface';

const FIELD_NAMES = ['location', 'date', 'precipitation', 'temp_max', 'temp_min', 'wind', 'weather'] as const;
type FieldName = typeof FIELD_NAMES[number];

const info: DataSampleInfo<FieldName> = {
  dataName: 'city-gdp',
  fieldNames: FIELD_NAMES,
  fieldLOM: {
    location: 'Nominal',
    date: 'Time',
    precipitation: 'Continuous',
    temp_max: 'Continuous',
    temp_min: 'Continuous',
    wind: 'Continuous',
    weather: 'Nominal',
  },
  combine: [
    ['location', 'date', 'precipitation'],
    ['location', 'weather'],
  ],
};

export default info;
