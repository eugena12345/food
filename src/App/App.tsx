import { Outlet } from 'react-router';
import './App.css';
import Header from './components/Header';
import CatalogPage from './pages/CatalogPage';
import { useQueryParamsStoreInit } from '~store/RootStore/hooks/useQueryParamsStoreInit';

function App() {
  useQueryParamsStoreInit();

  return (
    <div className="app">
      <Header />
      <Outlet />
    </div>



  );
}

export default App;
