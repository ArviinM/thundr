export interface RawAPIResponse<T> {
   data: T;
   message: string;
   error: boolean;
}

export interface RawAPIErrorResponse {
   status: number;
   data: {
      message: string;
   };
}
