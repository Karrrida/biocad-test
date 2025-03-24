import AppRoutes from './routes/router.tsx';
import { AuthProvider } from './context/authContext.tsx';

function App() {

  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>

  );
}

export default App;
