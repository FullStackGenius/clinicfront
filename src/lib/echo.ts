// import Echo from 'laravel-echo';
// import Pusher from 'pusher-js';

// declare global {
//   interface Window {
//     Pusher: any;
//   }
// }

// window.Pusher = Pusher;
// console.log(localStorage.getItem('token'));
// const echo = new Echo({
//     broadcaster: 'pusher',
//     key: '4096da0bad8b3f2d8701',
//     cluster: 'ap2',
//     forceTLS: true,
//     encrypted: true,
//     authEndpoint: 'http://localhost:8000/broadcasting/auth',
//     auth: {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`,
//       },
//     },
//     withCredentials: true, // 🔥 Move this outside `auth`
//   });
  
// console.log(echo,'echo');
// export default echo;


// src/lib/echo.ts
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

declare global {
  interface Window {
    Pusher: any;
  }
}

window.Pusher = Pusher;

let echoInstance: Echo<any> | null = null;

const originalUrl = process.env.REACT_APP_ENDPOINT || '';
const cleanedUrl = originalUrl.replace(/\/api$/, '');

console.log(cleanedUrl); 
export const initializeEcho = (token: string): Echo<any> => {
  if (!echoInstance) {
    echoInstance = new Echo({
      broadcaster: 'pusher',
      key: '4096da0bad8b3f2d8701',
      cluster: 'ap2',
      forceTLS: true,
      encrypted: true,
      authEndpoint: cleanedUrl+'/broadcasting/auth',
      auth: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      withCredentials: true,
    });
    console.log('Echo initialized');
  }
  return echoInstance;
};

export const getEcho = (): Echo<any> => {

   const token = localStorage.getItem('token');
   if(token){
      initializeEcho(token);
   }
  if (!echoInstance) {
    throw new Error('Echo not initialized');
  }
  return echoInstance;
};
