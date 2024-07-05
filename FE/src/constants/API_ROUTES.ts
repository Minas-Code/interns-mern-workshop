const PAGE_ROUTES = {
  HOME: '/',
  TODOS_LIST: '/todos/list',
  TODOS_CREATE: '/todos/create',
  TODOS_EDIT: '/todos/edit',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
};

const BE_BASE_URL = process.env.BE_BASE_URL || 'http://localhost:3000/api/v1';
const API_ROUTES = {
  SIGN_IN: `${BE_BASE_URL}/users/sign-in`,
  SIGN_UP: `${BE_BASE_URL}/users/sign-up`,
  GET_TODOS: `${BE_BASE_URL}/todos`,
  CREATE_TODO: `${BE_BASE_URL}/todos`,
  DELETE_TODO: `${BE_BASE_URL}/todos`,
  UPDATE_TODO: `${BE_BASE_URL}/todos`,
  ME: `${BE_BASE_URL}/me`,
};
