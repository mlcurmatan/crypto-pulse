import { useRef, useEffect } from 'react'; // Removed useState
import { useCrypto } from '../context/CryptoContext';
import { useFetchCrypto } from '../hooks/useFetchCrypto';
import { useLocalStorage } from '../hooks/useLocalStorage'; // Import our hook
import MarketChart from '../components/MarketChart';
import { Search, Loader2, TrendingUp, TrendingDown } from 'lucide-react';

const Home = () => {
  const { coins, currency, setCurrency } = useCrypto();
  const { loading, error } = useFetchCrypto();
  
  // SWAP: Changed useState("") to useLocalStorage
  const [searchTerm, setSearchTerm] = useLocalStorage("crypto_search_term", "");
  
  const inputRef = useRef(null);

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
        
        {/* Persistent Search and Button Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
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
          
          <button 
            onClick={() => setCurrency(currency === 'usd' ? 'eur' : 'usd')}
            className="px-6 py-3 bg-gray-800 border border-gray-700 rounded-lg uppercase font-mono font-bold text-cyan-400 hover:bg-gray-700 transition-all min-w-[80px]"
          >
            {currency}
          </button>
        </div>

        <MarketChart />

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
                  <p className="font-mono text-lg">
                    {currency === 'usd' ? '$' : '€'}{coin.current_price.toLocaleString()}
                  </p>
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