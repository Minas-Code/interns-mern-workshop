export enum PAGE_ROUTES {
  BASE = '/',
  TODOS_LIST = '/todos/list',
  TODOS_CREATE = '/todos/manage-todo',
  SIGN_IN = '/sign-in',
  SIGN_UP = '/sign-up',
  NOT_FOUND = '/404',
}

export enum API_ROUTES {
  SIGN_IN = '/api/users/sign-in',
  SIGN_UP = '/api/users/sign-up',
  SIGN_OUT = '/api/users/sign-out',
  GET_TODOS = '/api/todos',
  CREATE_TODO = '/api/create-todo',
  DELETE_TODO = '/api/delete-todo',
  UPDATE_TODO = '/api/update-todo',
  ME = '/api/me',
}

export const BE_BASE_URL = process.env.BE_BASE_URL || 'http://localhost:3000/api/v1';
