import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CryptoProvider } from './context/CryptoContext';
import Home from './pages/Home';
import Analysis from './pages/Analysis';

function App() {
  return (
    <CryptoProvider>
      <Router>
        {/* Tailwind CSS Styling */}
<nav className="sticky top-0 z-50 backdrop-blur-md bg-gray-900/80 border-b border-gray-800 p-4">
  <div className="max-w-7xl mx-auto flex justify-between items-center">
    <h1 className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
      CRYPTO-PULSE
    </h1>
    <div className="flex gap-8 font-medium">
      <Link to="/" className="text-gray-400 hover:text-white transition-colors">Market</Link>
      <Link to="/analysis" className="text-gray-400 hover:text-white transition-colors">Analysis</Link>
    </div>
  </div>
</nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analysis" element={<Analysis />} />
        </Routes>
      </Router>
    </CryptoProvider>
  );
}
export default App;
