import { CoreMenu } from 'src/@core/types';


export const menu: CoreMenu[] = [
  // Dashboard
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'item',
    icon: 'home',
    url: 'statistics',
  },
  {
    id: 'users',
    title: 'Users',
    type: 'item',
    icon: 'users',
    url: 'users/list'

  },
  {
    id: 'movies',
    title: 'Movies',
    type: 'collapsible',
    icon: 'film',
    children: [
      {
        id: 'list',
        title: 'List',
        type: 'item',
        icon: 'circle',
        url: 'movies/list',
      },
      {
        id: 'add',
        title: 'Add',
        type: 'item',
        icon: 'circle',
        url: 'movies/add',
      },
    ],
    url:"#"
  },



  {
    id: 'artists',
    title: 'Artists',
    type: 'collapsible',
    icon: 'users',
    children: [
      {
        id: 'list',
        title: 'List',
        type: 'item',
        icon: 'circle',
        url: 'artists/list',
      },
      {
        id: 'add',
        title: 'Add',
        type: 'item',
        icon: 'circle',
        url: 'artists/add',
      },
    ],
  },

  {
    id: 'projection',
    title: 'Projection',
    type: 'collapsible',
    icon: 'video',
    children: [
      {
        id: 'list',
        title: 'List',
        type: 'item',
        icon: 'circle',
        url: 'projections/list',
      },
      {
        id: 'add',
        title: 'Add',
        type: 'item',
        icon: 'circle',
        url: 'projections/add',
      },
    ],
  },
  {
    id: 'hall',
    title: 'Halls',
    type: 'collapsible',
    icon: 'tv',
    children: [
      {
        id: 'list',
        title: 'List',
        type: 'item',
        icon: 'circle',
        url: 'halls/list',
      },
      {
        id: 'add',
        title: 'Add',
        type: 'item',
        icon: 'circle',
        url: 'halls/add',
      },
    ],
  },
  {
    id: 'carousel',
    title: 'Carousel',
    type: 'item',
    icon: 'play',
    url: 'carousel'

  },
];



