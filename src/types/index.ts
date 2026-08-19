// Object Shape
export type responseType<T = undefined> = {
  success: boolean;
  message: string;
  data?: T;
};

// Promise wrapped Object
export type ApiResponse<T = undefined> = Promise<responseType<T>>;
