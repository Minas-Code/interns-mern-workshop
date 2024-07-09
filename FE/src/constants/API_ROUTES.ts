export enum PAGE_ROUTES {
  BASE = '/',
  TODOS_LIST = '/todos/list',
  TODOS_CREATE = '/todos/manage-todo',
  SIGN_IN = '/sign-in',
  SIGN_UP = '/sign-up',
  NOT_FOUND = '/404',
}

export enum API_ROUTES {
  SIGN_IN = '/auth/login',
  SIGN_UP = '/auth/register',
  SIGN_OUT = '/api/sign-out',
  GET_TODOS = '/todo',
  CREATE_TODO = '/todo',
  DELETE_TODO = '/todo',
  UPDATE_TODO = '/update-todo',
  ME = '/auth/me',
}

export const BE_BASE_URL = process.env.NEXT_PUBLIC_BE_BASE_URL || 'http://localhost:3000/api/v1';
