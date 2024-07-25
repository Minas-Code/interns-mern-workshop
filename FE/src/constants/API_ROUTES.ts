
export const BE_BASE_URL = process.env.NEXT_PUBLIC_BE_BASE_URL || 'http://localhost:5000/api/v1';
export const BE_BASE_LAB_URL = process.env.NEXT_PUBLIC_BE_LAB_BASE_URL || 'http://localhost:5000/api/v1';
export enum PAGE_ROUTES {
  BASE = '/',
  TODOS_LIST = '/todos/list',
  TODOS_CREATE = '/todos/manage-todo',
  SIGN_IN = '/sign-in',
  SIGN_UP = '/sign-up',
  NOT_FOUND = '/404',
}

export enum API_ROUTES {
  SIGN_IN = '/user/auth/login',
  SIGN_UP = '/user/auth/register',
  SIGN_OUT = '/api/sign-out',
  GET_TODOS = '/api/todo',
  CREATE_TODO = '/api/todo',
  DELETE_TODO = '/api/todo',
  UPDATE_TODO = '/api/update-todo',
  ME = '/api/auth/me',
}
