import React from 'react';

import { Card } from 'antd';
import { ChartAdvisor } from '@antv/chart-advisor';

import { DATA_SAMPLES_BY_CHART_ID } from '../../../../src';
import { ChartImg } from '../ChartImg';

import type { DataSampleWithFile } from '../../../../src/interface';

import './index.less';

const { Meta } = Card;

const myCA = new ChartAdvisor();

interface ChartIdCardProps {
  chartImg: React.ReactNode;
  chartId: string;
  dataSampleName: string;
}

const ChartIdCard: React.FC<ChartIdCardProps> = ({ chartImg, chartId, dataSampleName }) => (
  <Card style={{ width: 240 }} cover={chartImg}>
    <Meta title={chartId} description={dataSampleName} style={{ fontSize: '12px' }} />
  </Card>
);

const cards: React.ReactNode[] = Object.keys(DATA_SAMPLES_BY_CHART_ID).map((chartId) => {
  const { name, data } = (DATA_SAMPLES_BY_CHART_ID as any)[chartId] as DataSampleWithFile;

  const advices = myCA.advise({ data });

  let correctSpec;

  let maxScore = -1;
  for (let i = 0; i < advices.length; i += 1) {
    const { type, spec, score } = advices[i];
    if (score < maxScore) {
      break;
    } else {
      maxScore = score;
    }

    if (type === chartId) {
      correctSpec = spec;
      break;
    }
  }

  const img = (
    <ChartImg
      className="chart-img"
      spec={correctSpec as any}
      tempDomStyle={{ height: '400px', width: '480px', padding: '40px' }}
      style={{ height: '200px', width: '240px', border: '1px solid #eee' }}
      key={chartId}
    />
  );

  return <ChartIdCard key={chartId} chartImg={img} chartId={chartId} dataSampleName={name} />;
});

export const ChartIdTestBoard: React.FC = () => {
  return <div className="chartid-test-board">{cards}</div>;
};
