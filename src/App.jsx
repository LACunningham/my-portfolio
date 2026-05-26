import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage.jsx';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import { ContactPage } from './pages/ContactPage';

function App() {
  const [tema, setTema] = useLocalStorage('theme', 'light');

  useEffect(() => {
    if (tema === 'dark') {
      // Activa tu CSS personalizado
      document.documentElement.classList.add('dark');
      // Activa el modo oscuro interno de Bootstrap
      document.documentElement.setAttribute('data-bs-theme', 'dark');
    } else {
      // Desactiva tu CSS personalizado
      document.documentElement.classList.remove('dark');
      // Activa el modo claro interno de Bootstrap
      document.documentElement.setAttribute('data-bs-theme', 'light');
    }
  }, [tema]);

  const toggleTema = () => {
    setTema((prevTema) => (prevTema === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="min-vh-100">
      <Navbar tema={tema} toggleTema={toggleTema} />
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