import { Outlet } from 'react-router';
import './App.css';
import Header from './components/Header';
import CatalogPage from './pages/CatalogPage';

function App() {
  return (
    <div className="app">
      <Outlet />
      <>
      <Header/>
      <CatalogPage/>      
    </>
    </div>


    
  );
}

export default App;
