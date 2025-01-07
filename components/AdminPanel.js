// Updated AdminPanel.js to integrate new design system
import React, { useState, useEffect } from 'react';
import * as DesignSystem from '../styles/design-system';
import {
  BaseButton,
  BaseInput,
  BaseCard,
  H1,
  H2
} from './DesignSystem/BaseComponents';
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
        <BaseCard style={{ width: '100%', maxWidth: '500px', textAlign: 'center' }}>
          <H1 variant="default" style={{ marginBottom: DesignSystem.spacing.scale.md + 'px' }}>
            carbon copy originals
          </H1>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: DesignSystem.spacing.scale.md + 'px' }}>
            <BaseInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              style={{ textAlign: 'center' }}
            />
            {error && (
              <p style={{ color: DesignSystem.colors.semantic.error, fontStyle: 'italic' }}>
                {error}
              </p>
            )}
            <BaseButton type="submit">Login</BaseButton>
          </form>
        </BaseCard>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: DesignSystem.colors.primary.backgroundCream }}>
      <header
        style={{
          backgroundColor: DesignSystem.colors.primary.blue,
          color: DesignSystem.colors.primary.backgroundCream,
          padding: `${DesignSystem.spacing.scale.lg}px 0`,
          textAlign: 'center',
          fontFamily: 'Courier New, monospace'
        }}
      >
        <H1 variant="onBlue">carbon copy originals</H1>
        <p style={{ opacity: 0.6 }}>admin interface</p>
      </header>

      <nav
        style={{
          backgroundColor: 'white',
          borderBottom: `1px solid ${DesignSystem.colors.secondary.accentGray}`,
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        {['customers', 'prints', 'emails'].map((tab) => (
          <BaseButton
            key={tab}
            variant={activeTab === tab ? 'primary' : 'secondary'}
            onClick={() => setActiveTab(tab)}
            style={{
              margin: `${DesignSystem.spacing.scale.sm}px ${DesignSystem.spacing.scale.md}px`,
              textTransform: 'lowercase',
            }}
          >
            {tab}
          </BaseButton>
        ))}
      </nav>

      <main
        style={{
          maxWidth: DesignSystem.grid.maxWidth,
          margin: '0 auto',
          padding: `${DesignSystem.spacing.scale.lg}px ${DesignSystem.spacing.scale.md}px`
        }}
      >
        <BaseCard>
          {loading ? (
            <p style={{ textAlign: 'center', color: DesignSystem.colors.primary.blue, fontStyle: 'italic' }}>
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
                      <BaseCard key={customer.customer_id}>
                        <p>{customer.customer_id}</p>
                      </BaseCard>
                    ))}
                  </div>
                </div>
              )}
              {activeTab === 'prints' && (
                <div>
                  <H2 style={{ marginBottom: DesignSystem.spacing.scale.md + 'px' }}>
                    prints
                  </H2>
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
