import Catalogo from './pages/Catalogo';
import LivroViewer from './pages/LivroViewer';
import { useHashRoute } from './catalog/useHashRoute';

function App() {
  const route = useHashRoute();

  if (route.name === 'book') {
    return <LivroViewer bookId={route.bookId} />;
  }

  return <Catalogo />;
}

export default App;
