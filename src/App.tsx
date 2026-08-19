import Catalogo from './pages/Catalogo';
import LivroViewer from './pages/LivroViewer';
import GuiaGit from './pages/GuiaGit';
import { useHashRoute } from './catalog/useHashRoute';

function App() {
  const route = useHashRoute();

  if (route.name === 'book') {
    return <LivroViewer bookId={route.bookId} />;
  }

  if (route.name === 'guia') {
    return <GuiaGit />;
  }

  return <Catalogo />;
}

export default App;
