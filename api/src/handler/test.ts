import { Express } from 'express';
import TestService from '../service/test'

export const testHandler = (app: Express) => {
  const path = '/test'
  const testService = new TestService()
  app.get(`${path}/:name/:description`, (req, res) => {
    const result = testService.testWithParams(req)
    res.status(result.statusCode).send(JSON.parse(result.body));
  });
  app.post(`${path}/with-body`, (req, res) => {
    const result = testService.testWithBody(req)
    res.status(result.statusCode).send(JSON.parse(result.body));
  });
  app.get(`${path}/with-query`, async (req, res) => {
    const result = testService.testWithQuery(req)
    res.status(result.statusCode).send(JSON.parse(result.body));
  });
}
