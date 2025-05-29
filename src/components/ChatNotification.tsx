import React, { useEffect } from 'react';
import { getEcho } from '../lib/echo'; // Import Echo handler
import toast from 'react-hot-toast';

interface Props {
  userId: number | undefined;
}

const ChatNotification: React.FC<Props> = ({ userId }) => {
  useEffect(() => {
    if (!userId) return;

    // Initialize Echo if not already initialized
    const echo = getEcho();

    // Subscribe to the private channel for the user
    const channel = echo.private(`user.${userId}`);

    // Listen for 'chat.message' event
    channel.listen('.chat.message', (data: any) => {
      toast.custom((t) => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            minWidth: '320px',
            backgroundColor: '#FE6002', // Updated background
            border: '1px solid #FE6002', // Optional: match border to background
            borderRadius: '10px',
            padding: '16px',
            color: '#fff', // Updated text color
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            fontFamily: 'Segoe UI, sans-serif',
          }}
        >
          <strong style={{ fontSize: '16px', marginBottom: '8px' }}>✅ Message Received</strong>
          <div style={{ marginBottom: '4px' }}>
            <strong>From:</strong> {data.message.senderName}
          </div>
          <div style={{ marginBottom: '4px' }}>
            <strong>Message:</strong> {data.message.message}
          </div>
          <a
            href={data.message.chatLink}
            target="_blank"
            style={{
              color: '#fff',
              marginTop: '10px',
              textDecoration: 'underline',
              fontWeight: '500',
              display: 'inline-block',
            }}
          >
            👉 View Chat
          </a>
        </div>
      ));


    });

    // Clean up on component unmount
    return () => {
      // Ensure you leave the channel when component is unmounted or user changes
      echo.leave(`user.${userId}`);
    };
  }, [userId]);

  return null;
};

export default ChatNotification;


// import React, { useEffect } from 'react';
// import { getEcho } from '../lib/echo'; // Import Echo handler
// import toast from 'react-hot-toast';

// interface Props {
//   userId: number | undefined;
// }

// const ChatNotification: React.FC<Props> = ({ userId }) => {
//   useEffect(() => {
//     if (!userId) return;

//     // Ask for browser notification permission
//     if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
//       Notification.requestPermission();
//     }

//     const echo = getEcho();
//     const channel = echo.private(`user.${userId}`);

//     channel.listen('.chat.message', (data: any) => {
//       // 1. In-app toast
//       toast.custom(() => (
//         <div
//           style={{
//             display: 'flex',
//             flexDirection: 'column',
//             minWidth: '320px',
//             backgroundColor: '#FE6002',
//             border: '1px solid #FE6002',
//             borderRadius: '10px',
//             padding: '16px',
//             color: '#fff',
//             boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//             fontFamily: 'Segoe UI, sans-serif',
//           }}
//         >
//           <strong style={{ fontSize: '16px', marginBottom: '8px' }}>✅ Message Received</strong>
//           <div style={{ marginBottom: '4px' }}>
//             <strong>From:</strong> {data.message.senderName}
//           </div>
//           <div style={{ marginBottom: '4px' }}>
//             <strong>Message:</strong> {data.message.message}
//           </div>
//           <a
//             href={data.message.chatLink}
//             target="_blank"
//             style={{
//               color: '#fff',
//               marginTop: '10px',
//               textDecoration: 'underline',
//               fontWeight: '500',
//               display: 'inline-block',
//             }}
//           >
//             👉 View Chat
//           </a>
//         </div>
//       ));

//       // 2. Browser/system notification
//       if (Notification.permission === 'granted') {
//         const notification = new Notification('💬 New Message', {
//           body: `${data.message.senderName}: ${data.message.message}`,
//           icon: '/icon.png', // Replace with your own icon path
//         });

//         notification.onclick = () => {
//           window.open(data.message.chatLink, '_blank');
//         };
//       }
//     });

//     return () => {
//       echo.leave(`user.${userId}`);
//     };
//   }, [userId]);

//   return null;
// };

// export default ChatNotification;

