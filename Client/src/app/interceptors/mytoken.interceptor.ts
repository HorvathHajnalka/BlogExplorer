import { HttpInterceptorFn } from '@angular/common/http';

export const mytokenInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
