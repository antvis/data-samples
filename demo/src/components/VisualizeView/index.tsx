import React, { useContext, useEffect, useRef, useState } from 'react';

import { Divider, Empty } from 'antd';
import { ChartAdvisor } from '@antv/chart-advisor';
import { specToG2Plot } from '@antv/antv-spec';

import { MetaContext } from '../../contexts';
import { isValidJsonData } from '../../utils';
import { ChartImg } from '../ChartImg';

import type { Advice } from '@antv/chart-advisor';
import type { Data } from '../../../../src/interface';

import './index.less';

const myChartAdvisor = new ChartAdvisor();

export const VisualizeView: React.FC = () => {
  const { dataInString } = useContext(MetaContext);

  const [advicesList, setAdvicesList] = useState<Advice[]>([]);
  const [curAdviceIndex, setCurAdviceIndex] = useState<number>(0);

  const chartRef = useRef<HTMLDivElement>(null);

  const getAdvices = () => {
    if (!isValidJsonData(dataInString)) return [];

    const data: Data = JSON.parse(dataInString);
    const advices = myChartAdvisor.advise({ data });
    if (advices && advices.length) {
      return advices;
    }

    return [];
  };

  useEffect(() => {
    setAdvicesList(getAdvices());
    setCurAdviceIndex(0);
  }, [dataInString]);

  useEffect(() => {
    const spec = advicesList[curAdviceIndex]?.spec as any;

    if (chartRef?.current && spec) {
      specToG2Plot(spec, chartRef.current);
    }
  });

  return (
    <div className="visualize-view">
      <div className="chart-preview-scroll">
        {advicesList.map((advice, index) => {
          const { type, spec } = advice;
          return (
            <ChartImg
              className="chart-img"
              spec={spec as any}
              tempDomStyle={{ height: '400px', width: '400px', padding: '40px' }}
              style={{ height: '100px', width: '100px', border: '1px solid #eee' }}
              key={`${index}-${type}`}
              onClick={() => setCurAdviceIndex(index)}
            />
          );
        })}
      </div>
      <Divider />
      <div className="chart">
        {advicesList && advicesList.length ? (
          <div className="chart-view" ref={chartRef} />
        ) : (
          <Empty description="Sorry...no chart..." />
        )}
      </div>
    </div>
  );
};
