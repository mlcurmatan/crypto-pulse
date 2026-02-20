import { useState, useRef, useEffect } from 'react';
import { useCrypto } from '../context/CryptoContext';
import { useFetchCrypto } from '../hooks/useFetchCrypto';
import MarketChart from '../components/MarketChart';
import { Search, Loader2, TrendingUp, TrendingDown } from 'lucide-react';

const Home = () => {
  const { coins } = useCrypto();
  const { loading, error } = useFetchCrypto();
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef(null);

  // Focus the search bar on mount (The "Laser Pointer")
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-cyan-400">
      <Loader2 className="w-12 h-12 animate-spin mb-4" />
     <p className="text-xl font-mono">SCANNING BLOCKCHAIN...</p>
    </div>
  );

  if (error) return <div className="p-10 text-red-500">Error: {error}</div>;

  return (
    <main className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Search Section */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search coins..."
            className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-10 focus:outline-none focus:border-cyan-500 transition-colors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <MarketChart />

        {/* Coin Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {filteredCoins.map(coin => (
            <div key={coin.id} className="bg-gray-800 p-5 rounded-xl border border-gray-700 hover:border-cyan-500 transition-all">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <img src={coin.image} alt={coin.name} className="w-8 h-8" />
                  <div>
                    <h3 className="font-bold">{coin.name}</h3>
                    <p className="text-gray-400 text-sm uppercase">{coin.symbol}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-mono text-lg">${coin.current_price.toLocaleString()}</p>
                  <div className={`flex items-center gap-1 text-sm ${coin.price_change_percentage_24h > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {coin.price_change_percentage_24h > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;