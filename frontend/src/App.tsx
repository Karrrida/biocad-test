import AppRoutes from './routes/router.tsx';
import { AuthProvider } from './context/authContext.tsx';
import { NotificationProvider } from './context/NotificationContext.tsx';

function App() {

  return (
    <NotificationProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </NotificationProvider>


  );
}

export default App;
