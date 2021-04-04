import request from '@/utils/request';

export async function fakeAccountLogin({ userName, password }) {
  const user = ['admin', 'user'];

  if (user.includes(userName) && password === 'admin') {
    if (userName === 'user') {
      return { status: 'ok', type: 'account', currentAuthority: 'user' };
    }
    return { status: 'ok', type: 'account', currentAuthority: 'admin' };
  }

  return {
    status: 'error',
    type: 'account',
    currentAuthority: 'guest',
  };
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
