import { InternalCacheBl } from '@ecommerce/business_logic';
import { Request } from 'express';
import { ApiError, apiUtils, statusErrors } from '@ecommerce/utils';
import { Catch } from '../decorator/catchDecorator';
import { requestErrorHandler } from '../handler/errorHandler';
import ISendOtpRequestModel, { validateSendOtpRequestModel } from '../model/request/ISendOtp';
import IVerifyOtpRequestModel, { validateVerifyOtpRequestModel } from '../model/request/IVerifyOtp';

export default class PhoneService {
    internalCacheBl!: InternalCacheBl

    private getOTP = () => `${Math.floor(100000 + Math.random() * 900000)}`

    @Catch(requestErrorHandler)
    async sendOtp(req: Request) {
      const body = <ISendOtpRequestModel>apiUtils.getBody(req)
      validateSendOtpRequestModel(body)
      this.internalCacheBl = new InternalCacheBl()
      await this.internalCacheBl.setKey({
        key: `Otp-${body.prefixPhone}${body.phoneNumber}`,
        value: this.getOTP(),
        exp: 300,
      })
      return apiUtils.successfulResponse('OK', true)
    }

    @Catch(requestErrorHandler)
    async verifyOtp(req: Request) {
      const body = <IVerifyOtpRequestModel>apiUtils.getBody(req)
      validateVerifyOtpRequestModel(body)
      this.internalCacheBl = new InternalCacheBl()
      const key = await this.internalCacheBl.getKey(`Otp-${body.prefixPhone}${body.phoneNumber}`)
      if (!key) {
        throw new ApiError(
          'expired code',
          statusErrors.OTP_EXPIRED_CODE,
          'BAD_REQUEST',
        )
      }
      if (key !== body.code) {
        throw new ApiError(
          'invalid code',
          statusErrors.OTP_INVALID_CODE,
          'BAD_REQUEST',
        )
      }

      await this.internalCacheBl.expireKey(`Otp-${body.prefixPhone}${body.phoneNumber}`)
      return apiUtils.successfulResponse('OK', true)
    }
}
