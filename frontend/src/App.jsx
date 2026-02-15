import AppRoutes from './routes/AppRoutes';
import { ThemeProvider } from './context/ThemeContext';
import Chatbot from './components/Chatbot';
import './i18n';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <ThemeProvider>
      <AppRoutes />
      <Chatbot />
    </ThemeProvider>
  );
}

export default App;
