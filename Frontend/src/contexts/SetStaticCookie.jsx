import Cookies from 'js-cookie';
import  { useEffect } from 'react';

const SetStaticCookie = () => {
  useEffect(() => {
    // Set a static cookie named 'token' with a value for testing
    Cookies.set('token', 'staticTestToken', { expires: 1, path: '/' });
    console.log('Cookie set:', Cookies.get('token')); // Debugging: Check if cookie is set

  }, []);

  return null;
};

export default SetStaticCookie;
