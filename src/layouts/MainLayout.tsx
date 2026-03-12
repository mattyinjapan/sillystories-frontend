import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import './MainLayout.css'; // keep styling separate 👍

export default function MainLayout() {
  return (
    <div className="main-layout">
      <Header />
      <main className="page-content">
        <Outlet />
      </main>
    </div>
  );
}
