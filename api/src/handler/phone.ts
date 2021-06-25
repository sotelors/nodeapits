import { Express } from 'express';
import PhoneService from '../service/phone'

export const phoneHandler = (app: Express) => {
  const path = '/phone'
  const signUpService = new PhoneService()
  app.post(`${path}/opt/send`, async (req, res) => {
    const result = await signUpService.sendOtp(req)
    res.status(result.statusCode).send(JSON.parse(result.body));
  });
  app.post(`${path}/opt/verify`, async (req, res) => {
    const result = await signUpService.verifyOtp(req)
    res.status(result.statusCode).send(JSON.parse(result.body));
  });
}
