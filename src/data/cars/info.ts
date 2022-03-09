import { DataSampleInfo } from '../../interface';

const FIELD_NAMES = [
  'Name',
  'Miles_per_Gallon',
  'Cylinders',
  'Displacement',
  'Horsepower',
  'Weight_in_lbs',
  'Acceleration',
  'Year',
  'Origin',
] as const;
type FieldName = typeof FIELD_NAMES[number];

const info: DataSampleInfo<FieldName> = {
  dataName: 'city-gdp',
  fieldNames: FIELD_NAMES,
  fieldLOM: {
    Name: 'Nominal',
    Miles_per_Gallon: 'Interval',
    Cylinders: 'Interval',
    Displacement: 'Interval',
    Horsepower: 'Interval',
    Weight_in_lbs: 'Interval',
    Acceleration: 'Interval',
    Year: 'Time',
    Origin: 'Nominal',
  },
  combine: [
    ['Origin', 'Year', 'Horsepower'],
    ['Origin', 'Acceleration'],
  ],
};

export default info;
