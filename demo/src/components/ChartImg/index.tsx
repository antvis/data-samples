import React, { useEffect, useState } from 'react';

import { ChartAntVSpec } from '@antv/antv-spec';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { specToDataURL } from '../../utils';

interface ChartImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  spec: ChartAntVSpec;
  tempDomStyle: Partial<CSSStyleDeclaration>;
}

const NO_CHART_IMG_DATA = 'https://gw.alipayobjects.com/zos/antfincdn/lP6YFnCEjy/nochartimg.svg';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export const ChartImg = (props: ChartImgProps) => {
  const { spec, tempDomStyle, ...otherProps } = props;

  const [src, setSrc] = useState<string>(NO_CHART_IMG_DATA);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const genImgData = async () => {
      const imgData = await specToDataURL(spec, { tempDomStyle });

      setSrc(imgData);
    };

    genImgData();
  }, []);

  useEffect(() => {
    if (src !== NO_CHART_IMG_DATA) {
      setLoading(false);
    }
  }, [src]);

  return (
    <Spin spinning={loading} indicator={antIcon}>
      <img src={src} {...otherProps} />
    </Spin>
  );
};
