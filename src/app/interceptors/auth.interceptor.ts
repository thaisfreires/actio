import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  const publicUrls = [
    '/login',
    '/users/save'
  ];
  console.log('token sent');
  const isPublic = publicUrls.some(url => req.url.includes(url));

  if (token && !isPublic) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next(authReq);
  }
  return next(req);
};
