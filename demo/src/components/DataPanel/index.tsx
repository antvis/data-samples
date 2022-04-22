import React, { useContext, useEffect, useState } from 'react';

import { Menu } from 'antd';
import { DownOutlined, BookOutlined, LinkOutlined, PieChartOutlined, AppstoreOutlined } from '@ant-design/icons';

import { DATA_SAMPLES_BY_NAME, DATA_FOR_CHART_TYPE, dataByName, dataSamples } from '../../../../src';

import { MetaContext } from '../../contexts';
import { LabelDropDown } from '../LabelDropDown';
import { EditorView } from '../EditorView';
import { formatJSONObject } from '../../utils';

import type { MenuProps } from 'antd';

import './index.less';

type Filter = 'all' | 'chart' | 'story' | 'url' | 'chartId' | 'name';

function getDataSampleNamesByFilter(filter: Filter): string[] {
  switch (filter) {
    // by category
    case 'chart':
      return Object.values(dataSamples.chart).map((ds) => ds.name);
    case 'story':
      return Object.values(dataSamples.story).map((ds) => ds.name);
    case 'url':
      return Object.values(dataSamples.url).map((ds) => ds.name);

    // by group
    case 'chartId':
      return Object.keys(DATA_FOR_CHART_TYPE);
    case 'name':
    case 'all':
    default:
      return Object.keys(DATA_SAMPLES_BY_NAME);
  }
}

export const DataPanel: React.FC = () => {
  const { dataInString, setDataInString } = useContext(MetaContext);

  /** Dropdown 1 */
  const [curFilter, setCurFilter] = useState<Filter>('all');
  /** Dropdown 2 */
  const [curDataSampleName, setCurDataSampleName] = useState<string>(getDataSampleNamesByFilter(curFilter)[0]);

  const handleFilterMenuClick: MenuProps['onClick'] = ({ key }) => {
    const filter = key as Filter;
    setCurFilter(filter);
  };

  const handleDataSampleMenuClick: MenuProps['onClick'] = ({ key }) => {
    const dataSampleName = key;
    setCurDataSampleName(dataSampleName);
  };

  useEffect(() => {
    setCurDataSampleName(getDataSampleNamesByFilter(curFilter)[0]);
  }, [curFilter]);

  useEffect(() => {
    const getData = async () => {
      const data = await dataByName(curDataSampleName);
      setDataInString(formatJSONObject(data));
    };

    getData();
  }, [curDataSampleName]);

  const filterMenu = (
    <Menu className="dp-menu" onClick={handleFilterMenuClick}>
      <Menu.Item key="all" icon={<AppstoreOutlined />}>
        all
      </Menu.Item>
      <Menu.ItemGroup title="by Category">
        <Menu.Item key="chart" icon={<PieChartOutlined />}>
          chart
        </Menu.Item>
        <Menu.Item key="story" icon={<BookOutlined />}>
          story
        </Menu.Item>
        <Menu.Item key="url" icon={<LinkOutlined />}>
          url
        </Menu.Item>
      </Menu.ItemGroup>
      <Menu.ItemGroup title="by Group">
        <Menu.Item key="chartId">chart ID</Menu.Item>
        <Menu.Item key="name">name</Menu.Item>
      </Menu.ItemGroup>
    </Menu>
  );

  const dataSampleMenu = (
    <Menu className="dp-menu" style={{ maxHeight: 725, overflowY: 'scroll' }} onClick={handleDataSampleMenuClick}>
      {getDataSampleNamesByFilter(curFilter).map((dsName) => (
        <Menu.Item key={dsName}>{dsName}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div className="data-panel">
      <div className="filter-section">
        <LabelDropDown label="Filter" menu={filterMenu} icon={<DownOutlined />} selected={curFilter} />
        <LabelDropDown label="Data Sample" menu={dataSampleMenu} icon={<DownOutlined />} selected={curDataSampleName} />
      </div>
      {dataInString && <EditorView className="editor" />}
    </div>
  );
};
