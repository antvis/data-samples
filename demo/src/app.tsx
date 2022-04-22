import React, { useState } from 'react';

import { Layout } from 'antd';

import { NavHeader, DataPanel, InfoPanel } from './components';
import { MetaContext } from './contexts';

const { Content } = Layout;

export default function App() {
  /** Active dataset of the whole app as string, string for editor changing */
  const [dataInString, setDataInString] = useState<string>('');

  return (
    <MetaContext.Provider
      value={{
        dataInString,
        setDataInString,
      }}
    >
      <Layout>
        <NavHeader />
        <Content className="the-content">
          <DataPanel />
          <div className="cute-divider" />
          <InfoPanel />
        </Content>
      </Layout>
    </MetaContext.Provider>
  );
}
