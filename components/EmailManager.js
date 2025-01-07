// components/EmailManager.js
import React, { useState } from 'react';
import * as DesignSystem from '../styles/design-system';
import { 
  BaseButton, 
  BaseInput, 
  BaseCard, 
  H2 
} from './DesignSystem/BaseComponents';

const EmailManager = ({ customers }) => {
  const [emailType, setEmailType] = useState('transactional');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [recipients, setRecipients] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState('');
  const [selectedCustomers, setSelectedCustomers] = useState([]);

  const handleSendEmail = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setStatus('sending...');

    try {
      const finalRecipients = selectedCustomers.length > 0
        ? selectedCustomers
        : recipients.split(',').map(email => email.trim());

      const response = await fetch('https://cco-six.vercel.app/api/admin/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: emailType,
          subject,
          content,
          recipients: finalRecipients,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('email sent successfully');
        if (emailType !== 'template') {
          setSubject('');
          setContent('');
          setRecipients('');
          setSelectedCustomers([]);
        }
      } else {
        setStatus(`error: ${data.error}`);
      }
    } catch (error) {
      setStatus(`error: ${error.message}`);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div style={{ 
      display: 'grid', 
      gap: `${DesignSystem.spacing.scale.lg}px` 
    }}>
      {/* Email Type Selection */}
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: `${DesignSystem.spacing.scale.md}px`,
          borderBottom: `1px solid ${DesignSystem.colors.secondary.accentGray}` 
        }}
      >
        {['transactional', 'newsletter', 'templates'].map(type => (
          <BaseButton
            key={type}
            variant={emailType === type ? 'primary' : 'secondary'}
            onClick={() => setEmailType(type)}
          >
            {type}
          </BaseButton>
        ))}
      </div>

      {/* Customer Selection */}
      {emailType === 'newsletter' && customers?.length > 0 && (
        <BaseCard>
          <H2 style={{ marginBottom: `${DesignSystem.spacing.scale.md}px` }}>
            select customers
          </H2>
          <div 
            style={{ 
              maxHeight: '300px', 
              overflowY: 'auto',
              border: `1px solid ${DesignSystem.colors.primary.blue}`,
              padding: `${DesignSystem.spacing.scale.sm}px` 
            }}
          >
            {customers.map(customer => (
              <div 
                key={customer.customer_id}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: `${DesignSystem.spacing.scale.sm}px`,
                  marginBottom: `${DesignSystem.spacing.scale.xs}px`
                }}
              >
                <input
                  type="checkbox"
                  id={`customer-${customer.customer_id}`}
                  checked={selectedCustomers.includes(customer.customer_id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedCustomers([...selectedCustomers, customer.customer_id]);
                    } else {
                      setSelectedCustomers(
                        selectedCustomers.filter(id => id !== customer.customer_id)
                      );
                    }
                  }}
                  style={{ 
                    accentColor: DesignSystem.colors.primary.blue 
                  }}
                />
                <label 
                  htmlFor={`customer-${customer.customer_id}`}
                  style={{ 
                    color: DesignSystem.colors.primary.blue,
                    cursor: 'pointer' 
                  }}
                >
                  {customer.customer_id}
                </label>
              </div>
            ))}
          </div>
        </BaseCard>
      )}

      {/* Email Form */}
      <form 
        onSubmit={handleSendEmail} 
        style={{ 
          display: 'grid', 
          gap: `${DesignSystem.spacing.scale.md}px` 
        }}
      >
        {emailType !== 'newsletter' && (
          <BaseCard>
            <H2 style={{ marginBottom: `${DesignSystem.spacing.scale.md}px` }}>
              recipients
            </H2>
            <BaseInput
              type="text"
              value={recipients}
              onChange={(e) => setRecipients(e.target.value)}
              placeholder="email@example.com, email2@example.com"
              style={{ textAlign: 'center' }}
            />
          </BaseCard>
        )}

        <BaseCard>
          <H2 style={{ marginBottom: `${DesignSystem.spacing.scale.md}px` }}>
            subject
          </H2>
          <BaseInput
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </BaseCard>

        <BaseCard>
          <H2 style={{ marginBottom: `${DesignSystem.spacing.scale.md}px` }}>
            content
          </H2>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            style={{
              width: '100%',
              fontFamily: DesignSystem.typography.fontFamily.primary,
              border: `2px solid ${DesignSystem.colors.primary.blue}`,
              padding: `${DesignSystem.spacing.scale.sm}px`,
              color: DesignSystem.colors.primary.blue,
              backgroundColor: DesignSystem.colors.primary.backgroundCream,
              resize: 'vertical'
            }}
          />
        </BaseCard>

        {status && (
          <p 
            style={{ 
              textAlign: 'center', 
              color: DesignSystem.colors.primary.blue, 
              fontStyle: 'italic' 
            }}
          >
            {status}
          </p>
        )}

        <BaseButton 
          type="submit" 
          disabled={isSending}
        >
          {isSending ? 'sending...' : 'send email'}
        </BaseButton>
      </form>
    </div>
  );
};

export default EmailManager;