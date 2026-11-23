import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import QrPage from './pages/QrPage';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="qr" element={<QrPage />} />
          <Route path="*" element={<QrPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
