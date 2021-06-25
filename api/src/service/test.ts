/* eslint-disable class-methods-use-this */
import { Request } from 'express';
import { apiUtils } from '@ecommerce/utils';
import ITestWithBodyRequestModel, { validateTestWithBodyRequestModel } from '../model/request/ITestWithBodyModel';
import { Catch } from '../decorator/catchDecorator';
import { requestErrorHandler } from '../handler/errorHandler';

export default class TestService {
    @Catch(requestErrorHandler)
  testWithBody(req: Request) {
    const request = <ITestWithBodyRequestModel>apiUtils.getBody(req)
    validateTestWithBodyRequestModel(request)
    return apiUtils.successfulResponse('OK', request)
  }

    @Catch(requestErrorHandler)
    testWithParams(req: Request) {
      const request = <ITestWithBodyRequestModel>apiUtils.getParams(req)
      validateTestWithBodyRequestModel(request)
      return apiUtils.successfulResponse('OK', request)
    }

    @Catch(requestErrorHandler)
    testWithQuery(req: Request) {
      const request = <ITestWithBodyRequestModel>apiUtils.getQuery(req)
      validateTestWithBodyRequestModel(request)
      return apiUtils.successfulResponse('OK', request)
    }
}
