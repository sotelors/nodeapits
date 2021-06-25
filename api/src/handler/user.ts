import { Express } from 'express';
import UserService from '../service/user'

export const userHandler = (app: Express) => {
  const path = '/user'
  const userService = new UserService()
  app.get(`${path}/get-all`, async (req, res) => {
    const result = await userService.getAllUser(req)
    res.status(result.statusCode).send(JSON.parse(result.body));
  });
}
