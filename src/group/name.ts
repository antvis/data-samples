import * as ds from '../data';

function allDataEntities() {
  const dataEntities: any = {};
  const dsNameSpace = ds as any;

  Object.keys(dsNameSpace).forEach((dataCate) => {
    // data categories: chart, story, url ...
    const set = dsNameSpace[dataCate];
    Object.keys(set).forEach((dsObjKey) => {
      const dsObj = set[dsObjKey];
      dataEntities[dsObj.name] = dsObj;
    });
  });

  return dataEntities;
}

const DATA_SAMPLES_BY_NAME = allDataEntities();

export function dataByName(name: string) {
  if (!Object.keys(DATA_SAMPLES_BY_NAME).includes(name)) {
    throw new Error(`Data Sample with name ${name} is NOT FOUND.`);
  }

  let data = [];

  const entity = DATA_SAMPLES_BY_NAME[name];

  if (entity.data) {
    data = entity.data;
  } else if (entity.url) {
    fetch(entity.url)
      .then((res) => res.json())
      .then((urlData) => {
        data = urlData;
      })
      .catch((err) => {
        throw new Error(`CAN NOT fetch Data Sample ${name} by ${entity.url}`, { cause: err });
      });
  }

  return data;
}
