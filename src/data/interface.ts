export type DataRow = Record<string, string | number | boolean | undefined | null>;
export type Data = DataRow[];

type DataSampleWithFile = {
  name: string;
  data: Data;
};

type DataSampleWithUrl = {
  name: string;
  url: string;
};

export type DataSample = DataSampleWithFile | DataSampleWithUrl;
