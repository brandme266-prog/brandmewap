import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext.jsx';
import Home from './app/page.jsx';
import Admin from './app/admin/page.jsx';
import Blog from './app/blog/page.jsx';
import OnlineStore from './app/online-store/page.jsx';
import Portfolio from './app/portfolio/page.jsx';

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/online-store" element={<OnlineStore />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}
