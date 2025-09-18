import { Outlet } from 'react-router';
import './App.css';
import Header from './components/Header';
import CatalogPage from './pages/CatalogPage';

function App() {
  return (
    <div className="app">
      <Header />
      <Outlet />
    </div>



  );
}

export default App;
