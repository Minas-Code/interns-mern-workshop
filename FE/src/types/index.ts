export type GlobalApiResponse<T = any> = {
  success: boolean;
  data: {
    message: string;
    result: T;
  };
};
