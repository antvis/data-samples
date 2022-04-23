import { ChartAntVSpec, specToG2Plot } from '@antv/antv-spec';
import html2canvas from 'html2canvas';

function sleep(ms: number): Promise<void> {
  // eslint-disable-next-line no-promise-executor-return
  return new Promise((resolve) => setTimeout(resolve, ms));
}

interface specToDataUrlOptions {
  tempDomStyle: Partial<CSSStyleDeclaration>;
}

export async function specToDataURL(spec: ChartAntVSpec, options: specToDataUrlOptions): Promise<string> {
  const { tempDomStyle } = options;

  const tempDom = document.createElement('div');

  // default styles
  tempDom.style.height = '400px';
  tempDom.style.width = '600px';

  // custom styles
  tempDom.setAttribute(
    'style',
    Object.keys(tempDomStyle)
      .map((key) => `${key}: ${tempDomStyle[key as any]};`)
      .join(' ')
  );

  // hide temp DOM
  tempDom.style.zIndex = '-999';
  tempDom.style.position = 'absolute';
  tempDom.style.left = '0';
  tempDom.style.top = '0';

  document.body.appendChild(tempDom);

  try {
    specToG2Plot(spec, tempDom);
  } catch (error) {
    return '';
  }

  await sleep(400);

  const canvas = await html2canvas(tempDom as HTMLElement);

  const result = canvas.toDataURL();

  document.body.removeChild(tempDom);

  return result;
}
