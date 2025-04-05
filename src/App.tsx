import { 
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route
} from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from 'react-hot-toast';
import { Login } from './components/Login';
import VideoForm from './components/VideoForm';
import { VideoSegmentation } from './components/VideoSegmentation';
import { Dashboard } from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/video/new" element={<PrivateRoute><VideoForm /></PrivateRoute>} />
      <Route path="/video/:videoId/segments" element={<PrivateRoute><VideoSegmentation /></PrivateRoute>} />
    </>
  ),
  {
    future: {
      // These flags are not yet available in the current version of react-router-dom
      // We'll remove them for now and wait for v7 to be released
    }
  }
);

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster />
    </AuthProvider>
  );
}
