export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: NavigationItem[];
  role?: string[];
  isMainParent?: boolean;
}

// export const NavigationItems: NavigationItem[] = [
//     {
//       id: 'risk-profile',
//       title: 'Risk-Profile',
//       type: 'item',
//       classes: 'nav-item',
//       url: '/risk-profile',
//       icon: 'ti ti-dashboard',
//       breadcrumbs: false
//     },
//     {
//     id: 'dashboard',
//     title: 'Dashboard',
//     type: 'item',
//     icon: 'icon-navigation',
//     children: [
//       {
//         id: 'default',
//         title: 'Dashboard',
//         type: 'item',
//         classes: 'nav-item',
//         url: '/default',
//         icon: 'ti ti-dashboard',
//         breadcrumbs: false
//       }
//     ]
//   },
//   {
//     id: 'page',
//     title: 'Pages',
//     type: 'group',
//     icon: 'icon-navigation',
//     children: [
//       {
//         id: 'Authentication',
//         title: 'Authentication',
//         type: 'collapse',
//         icon: 'ti ti-key',
//         children: [
//           {
//             id: 'login',
//             title: 'Login',
//             type: 'item',
//             url: '/guest/login',
//             target: true,
//             breadcrumbs: false
//           },
//           {
//             id: 'register',
//             title: 'Register',
//             type: 'item',
//             url: '/guest/register',
//             target: true,
//             breadcrumbs: false
//           }
//         ]
//       }
//     ]
//   },
//   {
//     id: 'asset-classes',
//     title: 'asset-classes',
//     type: 'group',
//     icon: 'icon-navigation',
//     children: [
//       {
//         id: 'typography',
//         title: 'Typography',
//         type: 'item',
//         classes: 'nav-item',
//         url: '/typography',
//         icon: 'ti ti-typography'
//       },
//       {
//         id: 'color',
//         title: 'Colors',
//         type: 'item',
//         classes: 'nav-item',
//         url: '/color',
//         icon: 'ti ti-brush'
//       },
//       {
//         id: 'tabler',
//         title: 'Tabler',
//         type: 'item',
//         classes: 'nav-item',
//         url: 'https://tabler-icons.io/',
//         icon: 'ti ti-plant-2',
//         target: true,
//         external: true
//       }
//     ]
//   },
//   {
//     id: 'other',
//     title: 'Other',
//     type: 'group',
//     icon: 'icon-navigation',
//     children: [
//       {
//         id: 'sample-page',
//         title: 'Sample Page',
//         type: 'item',
//         url: '/sample-page',
//         classes: 'nav-item',
//         icon: 'ti ti-brand-chrome'
//       },
//       {
//         id: 'document',
//         title: 'Document',
//         type: 'item',
//         classes: 'nav-item',
//         url: 'https://codedthemes.gitbook.io/berry-angular/',
//         icon: 'ti ti-vocabulary',
//         target: true,
//         external: true
//       }
//     ]
//   }
// ];

export const NavigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'item',
    classes: 'nav-item',
    url: '/default',
    icon: 'ti ti-dashboard',
    breadcrumbs: false
  },
  {
    id: 'risk-profile',
    title: 'Risk Profile',
    type: 'item',
    classes: 'nav-item',
    url: '/risk-profile',
    icon: 'ti ti-chart-line',
    breadcrumbs: false
  },
  {
    id: 'asset-classes',
    title: 'Asset Classes',
    type: 'collapse',
    icon: 'ti ti-layers',
    children: [
      {
        id: 'equity',
        title: 'Equity',
        type: 'item',
        url: '/asset-classes/equity',
        icon: 'ti ti-chart-pie',
        breadcrumbs: false
      },
      {
        id: 'fixed-income',
        title: 'Fixed Income',
        type: 'item',
        url: '/asset-classes/bonds',
        icon: 'ti ti-chart-bar',
        breadcrumbs: false
      },
      {
        id: 'alternatives',
        title: 'Alternatives',
        type: 'item',
        url: '/asset-classes/alternatives',
        icon: 'ti ti-home',
        breadcrumbs: false
      }
    ]
  }
];

