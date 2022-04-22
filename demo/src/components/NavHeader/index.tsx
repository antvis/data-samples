import React from 'react';

import { Layout, Button } from 'antd';
import { GithubOutlined } from '@ant-design/icons';

import { GITHUB_URL, DEMO_TITLE } from '../../constants';

import './index.less';

const { Header } = Layout;

export const NavHeader: React.FC = ({ ...restProps }) => {
  const headerStyle = {
    background: '#eff2f5',
    padding: '0 16px',
    boxShadow: '0px 2px 3px -3px #9e9e9e',
  };

  return (
    <Header {...restProps} className="header" style={{ ...headerStyle }}>
      <div className="logo corner left">
        <h1 className="logo-text">{DEMO_TITLE}</h1>
      </div>

      <div className="btns corner right">
        <Button
          shape="circle"
          icon={<GithubOutlined />}
          onClick={() => {
            window.open(GITHUB_URL, '_blank');
          }}
        />
      </div>
    </Header>
  );
};
