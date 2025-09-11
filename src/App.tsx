import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUserRedux } from './redux/userSlice';
import { AppDispatch, RootState } from './redux/store';


// Import route files
import AuthRoutes from './routes/authRoutes';
import FreelancerRoutes from './routes/freelancerRoutes';
import PublicRoutes from './routes/publicRoutes';
import ClientRoutes from './routes/clientRoutes';
import ScrollToTop from './components/ScrollToTop';
import NotFound from './components/NotFound';
import ChatNotification from './components/ChatNotification';
import { initializeEcho } from './lib/echo'; // Import Echo initialization
function App() {
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((state: RootState) => state.user.user); // ✅ use Redux
  const [echoInitialized, setEchoInitialized] = useState(false);  // Track Echo initialization

  useEffect(() => {
    const token = localStorage.getItem('token');
    const localUser = localStorage.getItem('user');

    if (localUser && token) {
      const parsedUser = JSON.parse(localUser);
      dispatch(setUserRedux(parsedUser));  // Dispatch user to global state (if using Redux)

      // Initialize Echo once after login (if not already initialized)
      if (!echoInitialized) {
        initializeEcho(token);  // Initialize Echo with the token
        setEchoInitialized(true);  // Mark Echo as initialized
      }
    }
  }, [dispatch, echoInitialized]);  // Depend on echoInitialized to trigger reinitialization

  return (
    <div>
      <BrowserRouter>
        {user?.id && (
          <ChatNotification userId={user.id} />
        )}
        <ScrollToTop />
        <Routes>

          {/* Public Routes */}
          {PublicRoutes()}

          {/* Auth Routes */}
          {AuthRoutes()}

          {/* Freelancer Routes (Protected Routes for freelancers) */}
          {FreelancerRoutes()}

          {/* Client Routes (Protected Routes for clients) */}
          {ClientRoutes()}
          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;