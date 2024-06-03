/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable unused-imports/no-unused-vars */

export const MenuItems: any = [
  {
    path: '/organization',
    type: 'link',
    active: false, //typeof window !== "undefined" && window.location.href.includes('organization') ? true : false,
    selected: false, //typeof window !== "undefined" && window.location.href.includes('organization') ? true : false,
    title: 'Organizations',
  },
  {
    path: '/orgdashboard',
    type: 'link',
    active: false, //typeof window !== "undefined" && window.location.href.includes('orgdashboard') ? true : false,
    selected: false, //typeof window !== "undefined" && window.location.href.includes('orgdashboard') ? true : false,
    title: 'Dashboard',
  },
  {
    path: '/sites',
    type: 'link',
    active: false, //typeof window !== "undefined" && window.location.href.includes('sites') ? true : false,
    selected: false, //typeof window !== "undefined" && window.location.href.includes('sites') ? true : false,
    title: 'Sites',
  },
];

export default MenuItems;
