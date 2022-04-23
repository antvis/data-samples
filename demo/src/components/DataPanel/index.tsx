import React, { useContext, useEffect, useState } from 'react';

import { Menu, Button, Drawer } from 'antd';
import {
  DownOutlined,
  BookOutlined,
  LinkOutlined,
  PieChartOutlined,
  AppstoreOutlined,
  CloseOutlined,
} from '@ant-design/icons';

import {
  DATA_SAMPLES_BY_NAME,
  DATA_SAMPLES_BY_CHART_ID,
  dataByName,
  dataSamples,
  dataByChartId,
} from '../../../../src';

import { MetaContext } from '../../contexts';
import { LabelDropDown } from '../LabelDropDown';
import { EditorView } from '../EditorView';
import { ChartIdTestBoard } from '../ChartIdTestBoard';
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
      return Object.keys(DATA_SAMPLES_BY_CHART_ID);
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
  /** Modal for ChartId Test Board */
  const [isChartIdTestBoardVisible, setIsChartIdTestBoardVisible] = useState<boolean>(false);

  const showChartIdTestBoard = () => {
    setIsChartIdTestBoardVisible(true);
  };

  const handleChartIdTestBoardClose = () => {
    setIsChartIdTestBoardVisible(false);
  };

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
      let data = [];
      if (curFilter === 'chartId') {
        data = await dataByChartId(curDataSampleName as any);
      } else {
        data = await dataByName(curDataSampleName);
      }

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

  // if filter by chartId, show 'chartId: dsName'
  const selectedDsText = `${curFilter === 'chartId' ? `${curDataSampleName}: ` : ''}${
    curFilter === 'chartId' ? (DATA_SAMPLES_BY_CHART_ID as any)[curDataSampleName]?.name || '' : curDataSampleName
  }`;

  const ShowChartIdTestBoardBtn = () => (
    <Button type="primary" ghost size="small" shape="round" onClick={showChartIdTestBoard}>
      Test Board
    </Button>
  );

  const chartIdFilterOps = [<ShowChartIdTestBoardBtn key="chartid-test-board-btn" />];

  return (
    <>
      <div className="data-panel">
        <div className="filter-section">
          <LabelDropDown
            label="Filter"
            menu={filterMenu}
            icon={<DownOutlined />}
            selected={curFilter}
            operatorComponents={curFilter === 'chartId' ? chartIdFilterOps : []}
          />
          <LabelDropDown label="Data Sample" menu={dataSampleMenu} icon={<DownOutlined />} selected={selectedDsText} />
        </div>
        {dataInString && <EditorView className="editor" />}
      </div>
      <Drawer
        title="ChartID Test Board"
        placement="bottom"
        closable={false}
        visible={isChartIdTestBoardVisible}
        key="chartid-test-board"
        height="100vh"
        extra={<Button icon={<CloseOutlined />} size="large" onClick={handleChartIdTestBoardClose} />}
      >
        <ChartIdTestBoard />
      </Drawer>
    </>
  );
};
