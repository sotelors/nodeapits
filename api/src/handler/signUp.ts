import { Express } from 'express';
import SignUpService from '../service/signUp'

export const signUpHandler = (app: Express) => {
  const path = '/sign-up'
  const signUpService = new SignUpService()
  app.post(`${path}`, async (req, res) => {
    const result = await signUpService.register(req)
    res.status(result.statusCode).send(JSON.parse(result.body));
  });
  app.post(`${path}/affiliate/business`, async (req, res) => {
    const result = await signUpService.affiliateBusiness(req);
    res.status(result.statusCode).send(JSON.parse(result.body));
  });
}
