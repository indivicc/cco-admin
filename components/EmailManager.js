// Updated EmailManager.js to integrate the new design system
import React, { useState } from 'react';
import {
  BaseButton,
  BaseInput,
  BaseCard,
  H1,
  H2
} from './DesignSystem/BaseComponents';

const EmailManager = () => {
  const [emails, setEmails] = useState([]);
  const [newEmail, setNewEmail] = useState('');
  const [error, setError] = useState('');

  const handleAddEmail = (e) => {
    e.preventDefault();
    if (!newEmail) {
      setError('Email cannot be empty');
      return;
    }
    setEmails([...emails, newEmail]);
    setNewEmail('');
    setError('');
  };

  const handleRemoveEmail = (email) => {
    setEmails(emails.filter((e) => e !== email));
  };

  return (
    <BaseCard>
      <H2>Email Manager</H2>
      <form onSubmit={handleAddEmail} style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
        <BaseInput
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          placeholder="Enter new email"
        />
        <BaseButton type="submit">Add Email</BaseButton>
      </form>
      {error && (
        <p
          style={{
            color: 'red',
            fontStyle: 'italic',
            marginBottom: '16px'
          }}
        >
          {error}
        </p>
      )}
      <div>
        {emails.length === 0 ? (
          <p>No emails added yet</p>
        ) : (
          emails.map((email, index) => (
            <BaseCard
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '8px'
              }}
            >
              <span>{email}</span>
              <BaseButton variant="secondary" onClick={() => handleRemoveEmail(email)}>
                Remove
              </BaseButton>
            </BaseCard>
          ))
        )}
      </div>
    </BaseCard>
  );
};

export default EmailManager;
