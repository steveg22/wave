import AppRoutes from '@/routes';
import AuthProvider from '@/state/AuthProvider';
import NotificationProvider from '@/state/NotificationProvider';
import { BrowserRouter } from 'react-router-dom';
import Notifications from '@/components/Feedback/Notifications';

function App() {
  return (
    <NotificationProvider>
      <AuthProvider>
        <BrowserRouter>
          <Notifications />
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </NotificationProvider>
  );
}

export default App;
