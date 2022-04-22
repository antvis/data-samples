import React from 'react';

import { Tabs } from 'antd';

import { VisualizeView } from '../VisualizeView';

import './index.less';

const { TabPane } = Tabs;

export const InfoPanel: React.FC = () => {
  return (
    <div className="info-panel">
      <Tabs type="card">
        <TabPane tab="Visualize" key="visualize">
          <VisualizeView />
        </TabPane>
        <TabPane tab="Analyse" key="analyse">
          analyse by DataWizard: Coming soon...
        </TabPane>
      </Tabs>
    </div>
  );
};
