export const Routes = {
  Home: '/',
  Tasks: {
    root: '/task',
    default: '/task/default',
    admin: '/task/admin',
    saas: '/task/saas',
  },
  Component: {
    root: '/messanger',
    privatechat: '/messanger/chat',
    conference: '/messanger/conference',
  },
  Chat: '/chat',
  Calendar: '/calendar'
} as const;

export type RouteKey = keyof typeof Routes;

export type RoutePath = typeof Routes[RouteKey];
