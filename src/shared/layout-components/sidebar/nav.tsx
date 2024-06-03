/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable unused-imports/no-unused-vars */
import React from 'react';

const Icons = <i className='bx bx-store-alt side-menu__icon'></i>;

export const MenuItems: any = [
  {
    path: '/organization',
    icon: Icons,
    type: 'link',
    active: false,
    selected: false,
    title: 'Organizations',
  },
  {
    path: '/orgdashboard',
    icon: Icons,
    type: 'link',
    active: false,
    selected: false,
    title: 'Dashboard',
  },
  {
    path: '/sites',
    icon: Icons,
    type: 'link',
    active: false,
    selected: false,
    title: 'Sites',
  },
];
export default MenuItems;
