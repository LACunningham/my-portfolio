import { Routes, Route } from 'react-router-dom';
import { useLocalStorage } from './hooks/useLocalStorage.jsx'; // Recordá crear este archivo adentro de tu carpeta hooks
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import {AboutPage} from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import {ContactPage} from './pages/ContactPage';

function App() {
  const [tema, setTema] = useLocalStorage('theme', 'light');

  const toggleTema = () => {
    setTema((prevTema) => (prevTema === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={tema === 'dark' ? 'bg-dark text-white min-vh-100' : 'bg-light text-dark min-vh-100'}>
      {/* Pasamos el tema y la función al Navbar */}
      <Navbar tema={tema} toggleTema={toggleTema} />

      {/* Contenedor principal para las páginas */}
      <main className="container py-5">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<h1 className="text-center mt-5">404 - Página no encontrada</h1>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;