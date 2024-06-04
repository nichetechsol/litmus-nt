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
    ico: 'ri-home-8-line',
  },
  {
    path: '/orgdashboard',
    type: 'link',
    active: false, //typeof window !== "undefined" && window.location.href.includes('orgdashboard') ? true : false,
    selected: false, //typeof window !== "undefined" && window.location.href.includes('orgdashboard') ? true : false,
    title: 'Dashboard',
    ico: 'ri-organization-chart',
  },
  {
    path: '/sites',
    type: 'link',
    active: false, //typeof window !== "undefined" && window.location.href.includes('sites') ? true : false,
    selected: false, //typeof window !== "undefined" && window.location.href.includes('sites') ? true : false,
    title: 'Sites',
    ico: 'ri-map-pin-line',
  },
];

export default MenuItems;
