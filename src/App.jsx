import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DocsLayout from './layouts/DocsLayout';
import DocsPage from './pages/DocsPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/:lang" element={<LandingPage />} />

          <Route path="/docs" element={<DocsLayout />}>
            <Route index element={<DocsPage />} />
            <Route path=":section/:page" element={<DocsPage />} />
            <Route path=":page" element={<DocsPage />} />
          </Route>

          <Route path="/:lang/docs" element={<DocsLayout />}>
            <Route index element={<DocsPage />} />
            <Route path=":section/:page" element={<DocsPage />} />
            <Route path=":page" element={<DocsPage />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
