import { CustomError } from "./custom-error";

export interface ServerActionResponse<T> {
  error: {
    message: string;
    status: number;
  } | null;
  data: T | null;
}

export const handleServerAction =
  <T, P>(action: (props: P) => Promise<T>) =>
  async (props: P): Promise<ServerActionResponse<T>> => {
    try {
      const data = await action(props);

      return {
        error: null,
        data,
      };
    } catch (error) {
      console.error(error);

      if (error instanceof CustomError) {
        return {
          error: {
            message: error.message,
            status: error.statusCode,
          },
          data: null,
        };
      }

      return {
        error: {
          message: "Algo salió mal, por favor inténtalo de nuevo",
          status: 500,
        },
        data: null,
      };
    }
  };
