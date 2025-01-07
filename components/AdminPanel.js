// components/AdminPanel.js
import React, { useState, useEffect } from 'react';
import * as DesignSystem from '../styles/design-system';
import { 
  BaseButton, 
  BaseInput, 
  BaseCard, 
  H1, 
  H2 
} from './DesignSystem/BaseComponents';
import EmailManager from './EmailManager';
import { getCustomers, getProducts } from '../utils/api-client';

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
      setError('Error loading data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div 
        style={{
          minHeight: '100vh', 
          backgroundColor: DesignSystem.colors.primary.backgroundCream,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: DesignSystem.spacing.scale.lg + 'px'
        }}
      >
        <BaseCard 
          style={{
            width: '100%',
            maxWidth: '500px',
            textAlign: 'center'
          }}
        >
          <H1 style={{ marginBottom: DesignSystem.spacing.scale.md + 'px' }}>
            carbon copy originals
          </H1>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: DesignSystem.spacing.scale.md + 'px' }}>
            <BaseInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="enter password"
              style={{ textAlign: 'center' }}
            />
            {error && (
              <p 
                style={{ 
                  color: DesignSystem.colors.semantic.error, 
                  fontStyle: 'italic' 
                }}
              >
                {error}
              </p>
            )}
            <BaseButton type="submit">
              login
            </BaseButton>
          </form>
        </BaseCard>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: DesignSystem.colors.primary.backgroundCream 
    }}>
      {/* Header */}
      <header 
        style={{
          backgroundColor: DesignSystem.colors.primary.blue,
          color: DesignSystem.colors.primary.backgroundCream,
          padding: `${DesignSystem.spacing.scale.lg}px 0`,
          textAlign: 'center'
        }}
      >
        <H1>carbon copy originals</H1>
        <p style={{ opacity: 0.6 }}>admin interface</p>
      </header>

      {/* Navigation */}
      <nav 
        style={{
          backgroundColor: 'white',
          borderBottom: `1px solid ${DesignSystem.colors.secondary.accentGray}`,
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        {['customers', 'prints', 'emails'].map(tab => (
          <BaseButton
            key={tab}
            variant={activeTab === tab ? 'primary' : 'secondary'}
            onClick={() => setActiveTab(tab)}
            style={{ 
              margin: `${DesignSystem.spacing.scale.sm}px ${DesignSystem.spacing.scale.md}px`,
              textTransform: 'lowercase'
            }}
          >
            {tab}
          </BaseButton>
        ))}
      </nav>

      {/* Main Content */}
      <main 
        style={{
          maxWidth: DesignSystem.grid.maxWidth,
          margin: '0 auto',
          padding: `${DesignSystem.spacing.scale.lg}px ${DesignSystem.spacing.scale.md}px`
        }}
      >
        <BaseCard>
          {loading ? (
            <p 
              style={{ 
                textAlign: 'center', 
                color: DesignSystem.colors.primary.blue,
                fontStyle: 'italic'
              }}
            >
              loading...
            </p>
          ) : (
            <>
              {activeTab === 'customers' && (
                <div>
                  <H2 style={{ marginBottom: DesignSystem.spacing.scale.md + 'px' }}>
                    customers
                  </H2>
                  <div style={{ display: 'grid', gap: DesignSystem.spacing.scale.md + 'px' }}>
                    {customers.map((customer) => (
                      <BaseCard 
                        key={customer.customer_id}
                        style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          alignItems: 'center' 
                        }}
                      >
                        <div>
                          <p 
                            style={{ 
                              color: DesignSystem.colors.primary.blue,
                              fontWeight: DesignSystem.typography.weights.bold 
                            }}
                          >
                            {customer.customer_id}
                          </p>
                          <p 
                            style={{ 
                              color: DesignSystem.colors.secondary.textGray,
                              fontSize: '0.8rem' 
                            }}
                          >
                            {customer.total_purchases} purchases · 
                            last purchase: {new Date(customer.last_purchase).toLocaleDateString()}
                          </p>
                        </div>
                        <BaseButton variant="secondary">
                          view details
                        </BaseButton>
                      </BaseCard>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'emails' && (
                <div>
                  <H2 style={{ marginBottom: DesignSystem.spacing.scale.md + 'px' }}>
                    email management
                  </H2>
                  <EmailManager customers={customers} />
                </div>
              )}

              {activeTab === 'prints' && (
                <div>
                  <H2 style={{ marginBottom: DesignSystem.spacing.scale.md + 'px' }}>
                    print generator
                  </H2>
                  <div style={{ display: 'grid', gap: DesignSystem.spacing.scale.md + 'px' }}>
                    {prints.map((print) => (
                      <BaseCard 
                        key={print.shopify_product_id}
                        style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          alignItems: 'center' 
                        }}
                      >
                        <div>
                          <p 
                            style={{ 
                              color: DesignSystem.colors.primary.blue,
                              fontWeight: DesignSystem.typography.weights.bold 
                            }}
                          >
                            {print.title || print.shopify_product_id}
                          </p>
                          <p 
                            style={{ 
                              color: DesignSystem.colors.secondary.textGray,
                              fontSize: '0.8rem' 
                            }}
                          >
                            status: {print.is_sold ? 'sold' : 'available'} · 
                            verification: {print.verification_code || 'none'}
                          </p>
                        </div>
                        <BaseButton variant="secondary">
                          view print
                        </BaseButton>
                      </BaseCard>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </BaseCard>
      </main>
    </div>
  );
};

export default AdminPanel;