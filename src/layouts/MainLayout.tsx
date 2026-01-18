import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './header';
const MainLayout = () => {
  return (
    <div className="main-layout">
      <Header />

      <main className="main-content">
        <div className="container">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;