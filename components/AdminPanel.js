// components/AdminPanel.js
import React, { useState, useEffect } from 'react';
import EmailManager from './EmailManager';
import { getCustomers, getProducts, getVerifications } from '../utils/api-client';

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('customers');
  const [error, setError] = useState('');
  const [customers, setCustomers] = useState([]);
  const [prints, setPrints] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated, activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'customers') {
        const data = await getCustomers();
        setCustomers(data);
      } else if (activeTab === 'prints') {
        const data = await getProducts();
        setPrints(data);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      setError('error loading data');
    }
    setLoading(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('invalid password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FFF6F0] flex items-center justify-center p-6">
        <div className="w-full max-w-lg text-center">
          <h1 className="text-[#3856DD] text-4xl mb-2 font-serif tracking-wide">
            carbon copy originals
          </h1>
          <p className="text-[#3856DD] opacity-60 mb-16 italic tracking-wide">
            admin interface
          </p>
          
          <form onSubmit={handleLogin} className="space-y-6 bg-white p-12">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="enter password"
              className="w-full p-4 border border-[#3856DD] border-opacity-20 focus:border-[#3856DD] outline-none text-[#3856DD] text-center tracking-wide placeholder:text-[#3856DD] placeholder:opacity-60 font-serif"
            />

            {error && (
              <p className="text-[#3856DD] opacity-60 italic tracking-wide">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-[#3856DD] text-[#FFF6F0] p-4 tracking-wide hover:opacity-90 transition-opacity font-serif"
            >
              login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF6F0]">
      {/* Header */}
      <header className="bg-[#3856DD] text-[#FFF6F0] py-12">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h1 className="font-serif text-4xl mb-2 tracking-wide">
            carbon copy originals
          </h1>
          <p className="opacity-60 tracking-wide">admin interface</p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-[#3856DD] border-opacity-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex justify-center space-x-12">
            {['customers', 'prints', 'emails'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 tracking-wide relative font-serif ${
                  activeTab === tab 
                    ? 'text-[#3856DD]' 
                    : 'text-[#3856DD] opacity-60 hover:opacity-100'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 w-full h-px bg-[#3856DD]" />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white p-12">
          {loading ? (
            <p className="text-center text-[#3856DD] opacity-60 italic">loading...</p>
          ) : (
            <>
              {activeTab === 'customers' && (
                <div>
                  <h2 className="text-[#3856DD] text-2xl mb-8 tracking-wide font-serif">
                    customers
                  </h2>
                  <div className="space-y-6">
                    {customers.map((customer) => (
                      <div 
                        key={customer.customer_id}
                        className="border border-[#3856DD] border-opacity-20 p-4"
                      >
                        <p className="text-[#3856DD] font-serif">
                          {customer.customer_id}
                        </p>
                        <p className="text-[#3856DD] opacity-60 text-sm">
                          {customer.total_purchases} purchases · 
                          last purchase: {new Date(customer.last_purchase).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'emails' && (
                <div>
                  <h2 className="text-[#3856DD] text-2xl mb-8 tracking-wide font-serif">
                    email management
                  </h2>
                  <EmailManager customers={customers} />
                </div>
              )}

              {activeTab === 'prints' && (
                <div>
                  <h2 className="text-[#3856DD] text-2xl mb-8 tracking-wide font-serif">
                    print generator
                  </h2>
                  <div className="space-y-6">
                    {prints.map((print) => (
                      <div 
                        key={print.shopify_product_id}
                        className="border border-[#3856DD] border-opacity-20 p-4"
                      >
                        <p className="text-[#3856DD] font-serif">
                          {print.title || print.shopify_product_id}
                        </p>
                        <p className="text-[#3856DD] opacity-60 text-sm">
                          status: {print.is_sold ? 'sold' : 'available'} ·
                          verification: {print.verification_code || 'none'}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;