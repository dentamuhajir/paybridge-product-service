import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { ApiResponse } from "../response/api-response";

@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = "Internal server error";

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();

      if (typeof res === "string") {
        message = res;
      } else if (typeof res === "object" && (res as any).message) {
        message = Array.isArray((res as any).message)
          ? (res as any).message.join(", ")
          : (res as any).message;
      }
    }

    response.status(status).json(
      ApiResponse.error(message),
    );
  }
}
