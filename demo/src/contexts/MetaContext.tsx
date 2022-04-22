import { createContext } from 'react';

interface IMetaContext {
  dataInString: string;
  setDataInString: (dataStr: string) => void;
}

const defaultState: IMetaContext = {
  dataInString: '',
  setDataInString: () => {},
};

export const MetaContext = createContext<IMetaContext>(defaultState);
