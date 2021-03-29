import { DataSampleInfo } from "../../interface";

const FIELD_NAMES = [
  "Title",
  "US_Gross",
  "Worldwide_Gross",
  "US_DVD_Sales",
  "Production_Budget",
  "Release_Date",
  "MPAA_Rating",
  "Running_Time_min",
  "Distributor",
  "Source",
  "Major_Genre",
  "Creative_Type",
  "Director",
  "Rotten_Tomatoes_Rating",
  "IMDB_Rating",
  "IMDB_Votes",
] as const;
type FieldName = typeof FIELD_NAMES[number];

const info: DataSampleInfo<FieldName> = {
  dataName: "city-gdp",
  fieldNames: FIELD_NAMES,
  fieldLOM: {
    Title: "Nominal",
    US_Gross: "Interval",
    Worldwide_Gross: "Interval",
    US_DVD_Sales: "Interval",
    Production_Budget: "Interval",
    Release_Date: "Time",
    MPAA_Rating: "Ordinal",
    Running_Time_min: "Interval",
    Distributor: "Nominal",
    Source: "Nominal",
    Major_Genre: "Nominal",
    Creative_Type: "Nominal",
    Director: "Nominal",
    Rotten_Tomatoes_Rating: "Interval",
    IMDB_Rating: "Continuous",
    IMDB_Votes: "Interval",
  },
  combine: [
    ["Director", "Worldwide_Gross"],
    ["MPAA_Rating", "Distributor"],
  ],
};

export default info;
