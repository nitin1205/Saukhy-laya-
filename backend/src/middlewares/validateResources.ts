import { NextFunction, Request, Response } from "express";
import { ZodError, ZodObject } from "zod/v4";

import logger from "../utils/logger";

export const validateRequestBody =
  (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.body) {
        res.status(400).json({ error: "Request body is required" });
        return;
      }
      schema.parse(req.body);
      next();
      return;
    } catch (error: any) {
      logger.error(error);
      if (error instanceof ZodError) {
        res.status(400).json({
          status: "fail",
          errors: error.issues.map((err) => ({
            path: err.path.join("."),
            message: err.message,
          })),
        });
        return;
      }
      res.status(400).send("Input validation Error");
      return;
    }
  };

export const validateRequestParams =
  (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.params) {
        res.status(400).json({ error: "Request Params is required" });
        return;
      }
      schema.parse(req.params);
      next();
      return;
    } catch (error: any) {
      logger.error(error);
      if (error instanceof ZodError) {
        res.status(400).json({
          status: "fail",
          errors: error.issues.map((err) => ({
            path: err.path.join("."),
            message: err.message,
          })),
        });
        return;
      }
      res.status(400).send("Request params validation Error");
      return;
    }
  };

export const validateRequestQuery =
  (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.query) {
        res.status(400).json({ error: "Request Query is required" });
        return;
      }
      schema.parse(req.query);
      next();
      return;
    } catch (error: any) {
      logger.error(error);
      if (error instanceof ZodError) {
        res.status(400).json({
          status: "fail",
          errors: error.issues.map((err) => ({
            path: err.path.join("."),
            message: err.message,
          })),
        });
        return;
      }
      res.status(400).send("Request query validation Error");
      return;
    }
  };
