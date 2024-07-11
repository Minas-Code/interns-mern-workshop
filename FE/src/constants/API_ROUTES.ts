export enum PAGE_ROUTES {
  BASE = '/',
  TODOS_LIST = '/todos/list',
  TODOS_CREATE = '/todos/manage-todo',
  SIGN_IN = '/sign-in',
  SIGN_UP = '/sign-up',
  NOT_FOUND = '/404',
}

export enum API_ROUTES {
  SIGN_IN = '/api/auth/login',
  SIGN_UP = '/api/auth/register',
  SIGN_OUT = '/api/sign-out',
  GET_TODOS = '/api/todo',
  CREATE_TODO = '/api/todo',
  DELETE_TODO = '/api/todo',
  UPDATE_TODO = '/api/update-todo',
  ME = '/api/auth/me',
}

export const BE_BASE_URL = process.env.NEXT_PUBLIC_BE_BASE_URL || 'https://mern-be.apps.minascode.com';
