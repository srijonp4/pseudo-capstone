import { z } from 'zod';
import express from 'express';
const validateResource =
  (schema: z.Schema) =>
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (e) {
      if (e instanceof Error) {
        return res.status(400).send(e.message);
      } else {
        return res.status(400).send(String(e));
      }
    }
  };
export default validateResource;
