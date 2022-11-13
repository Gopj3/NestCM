import { QueryFailedError } from "typeorm";
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { STATUS_CODES } from "http";
import { Request, Response } from "express";
import { SqlErrorsCodes } from "../enums/sql-errors-codes";

@Catch(QueryFailedError)
export class QueryFailedFilter implements ExceptionFilter {
  constructor(public reflector: Reflector) {}

  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      exception?.driverError.code &&
      exception.driverError?.code === SqlErrorsCodes.Duplicate
        ? HttpStatus.CONFLICT
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception.driverError?.code &&
      exception.driverError?.code === SqlErrorsCodes.Duplicate
        ? "Duplicate entry"
        : exception.message;

    response.status(status).json({
      statusCode: status,
      error: STATUS_CODES[status],
      message: message,
    });
  }
}
