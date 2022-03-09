import { DataSampleInfo } from '../../interface';

const FIELD_NAMES = ['area', 'sales'] as const;
type FieldName = typeof FIELD_NAMES[number];

const info: DataSampleInfo<FieldName> = {
  dataName: 'city-gdp',
  fieldNames: FIELD_NAMES,
  fieldLOM: {
    area: 'Nominal',
    sales: 'Interval',
  },
  combine: [['area', 'sales']],
};

export default info;
