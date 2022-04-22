import React from 'react';

import { Dropdown } from 'antd';

import type { DropdownButtonProps, DropDownProps } from 'antd/lib/dropdown';

import './index.less';

interface Props {
  label: string;
  menu: DropDownProps['overlay'];
  icon: DropdownButtonProps['icon'];
  selected: string;
}

export const LabelDropDown: React.FC<Props> = ({ label, menu, icon, selected, ...restProps }) => {
  return (
    <div {...restProps} className="label-dropdown">
      <Dropdown.Button overlay={menu} icon={icon} placement="bottomLeft">
        {label}
      </Dropdown.Button>
      <span className="ldd-label">{selected}</span>
    </div>
  );
};
