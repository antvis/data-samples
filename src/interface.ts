export type DataRow = Record<string, string | number | boolean | undefined | null>;
export type Data = DataRow[];

export type DataSampleWithFile = {
  name: string;
  data: Data;
};

export type DataSampleWithUrl = {
  name: string;
  url: string;
};

export type DataSample = DataSampleWithFile | DataSampleWithUrl;
