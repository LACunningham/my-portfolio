import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage.jsx';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import { ContactPage } from './pages/ContactPage';

function App() {
  const [tema, setTema] = useLocalStorage('theme', 'light');

  useEffect(() => {
    if (tema === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-bs-theme', 'dark');
    }  
    else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-bs-theme', 'light');
    }
  }, [tema]);

  const toggleTema = () => {
    setTema((prevTema) => (prevTema === 'light' ? 'dark' : 'light'));
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar tema={tema} toggleTema={toggleTema} />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;