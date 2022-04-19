/* eslint-disable import/no-relative-packages */
import React, { useState, useEffect, useRef } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { Select } from 'antd';
import Ajv from 'ajv';
import { ChartAdvisor } from '@antv/chart-advisor';
import { specToG2Plot } from '@antv/antv-spec';
import jsondataSchema from '../../schema/jsondataSchema.json';
import { dataPresets } from './presets';
import './index.less';

const { Option } = Select;

const myChartAdvisor = new ChartAdvisor();

const ajv = new Ajv();
const validateSchema = ajv.compile(jsondataSchema);

function editorWillMount(monaco: any) {
  monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
    validate: true,
    enableSchemaRequest: true,
    schemas: [
      {
        schema: jsondataSchema,
      },
    ],
  });
}

const formatJSONObject = (json: Object): string => {
  return JSON.stringify(json, null, 2);
};

const isValid = (str: string) => {
  try {
    const spec = JSON.parse(str);
    return validateSchema(spec);
  } catch (error) {
    return false;
  }
};

export default function App() {
  const canvas = useRef(null);

  const [currentDataPreset, setCurrentDataPreset] = useState<string>(Object.keys(dataPresets)[0]);

  const defaultEditorContent = (dataPresets as any)[currentDataPreset];

  const [lastEditorContent, setLastEditorContent] = useState<any>(defaultEditorContent);
  const [editorContent, _setEditorContent] = useState<string>(formatJSONObject(defaultEditorContent));

  const setEditorContent = (editorContent: string) => {
    if (isValid(editorContent)) {
      setLastEditorContent(JSON.parse(editorContent));
    }
    _setEditorContent(editorContent);
  };

  const editorChange = (newContent: string) => {
    setEditorContent(newContent);
  };

  const handleDataSelect = (value: any) => {
    const demoKey = value;
    setCurrentDataPreset(demoKey);
    setEditorContent(formatJSONObject((dataPresets as any)[demoKey]));
  };

  useEffect(() => {
    if (canvas.current) {
      const results = myChartAdvisor.advise({ data: lastEditorContent });
      if (results && results.length) {
        const result = results[0];
        specToG2Plot(result.spec, canvas.current);
      }
    }
  }, [lastEditorContent]);

  return (
    <div>
      <h1>data-samples demo</h1>
      <div>
        presets:
        <Select defaultValue={currentDataPreset} style={{ width: 160, margin: '0 10px' }} onChange={handleDataSelect}>
          {Object.keys(dataPresets).map((dataPresetKey) => (
            <Option value={dataPresetKey} key={dataPresetKey}>
              {dataPresetKey}
            </Option>
          ))}
        </Select>
      </div>
      <div style={{ display: 'flex', marginTop: '50px' }}>
        <div style={{ flex: 5 }}>
          <MonacoEditor
            width="90%"
            height="600"
            language="json"
            value={editorContent}
            editorWillMount={editorWillMount}
            onChange={editorChange}
          />
        </div>
        <div className="vis-wrapper">
          <div
            id="container"
            className="vis"
            ref={canvas}
            style={!isValid(editorContent) ? { opacity: 0.4 } : {}}
          ></div>
          <div id="errormsg" className="vis-mask" style={!isValid(editorContent) ? { bottom: 0 } : {}}>
            <h2>invalid data!</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
