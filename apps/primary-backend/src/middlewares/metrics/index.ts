import { NextFunction, Request, Response } from "express";
import { requestCounter } from "./requestCount";
import { httpRequestDurationMicroseconds } from "./requestTime";
import { activeRequestsGauge } from "./activeRequests";

export const metricsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const startTime = Date.now();
  activeRequestsGauge.inc();

  res.on("finish", function () {
    const endTime = Date.now();
    const duration = endTime - startTime;

    // Increment request counter
    requestCounter.inc({
      method: req.method,
      route: req.originalUrl,
      status_code: res.statusCode,
    });

    httpRequestDurationMicroseconds.observe(
      {
        method: req.method,
        route: req.originalUrl,
        code: res.statusCode,
      },
      duration,
    );

    activeRequestsGauge.dec();
  });
  next();
};
