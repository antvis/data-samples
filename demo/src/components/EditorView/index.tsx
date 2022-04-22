import React, { useContext } from 'react';

import MonacoEditor from 'react-monaco-editor';

import jsondataSchema from '../../../../schema/jsondataSchema.json';
import { MetaContext } from '../../contexts';

export interface EditorViewProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
}

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

export const EditorView: React.FC<EditorViewProps> = ({ prefixCls = 'editorview', className, style, ...restProps }) => {
  const { dataInString, setDataInString } = useContext(MetaContext);

  const onChange = (newContent: string) => {
    setDataInString(newContent);
  };

  const compStyle = {
    ...style,
  };

  return (
    <div {...restProps} className={`${prefixCls} ${className}`} style={compStyle}>
      <MonacoEditor
        height="100%"
        language="json"
        value={dataInString}
        editorWillMount={editorWillMount}
        onChange={onChange}
        options={{ readOnly: true, automaticLayout: true }}
      />
    </div>
  );
};
