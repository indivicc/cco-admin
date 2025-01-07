// components/EmailManager.js
import React, { useState } from 'react';

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
    <div className="space-y-12">
      {/* Email Type Selection */}
      <div className="flex justify-center space-x-12 border-b border-[#3856DD] border-opacity-20">
        {['transactional', 'newsletter', 'templates'].map(type => (
          <button
            key={type}
            onClick={() => setEmailType(type)}
            className={`pb-4 tracking-wide relative font-serif ${
              emailType === type 
                ? 'text-[#3856DD]' 
                : 'text-[#3856DD] opacity-60 hover:opacity-100'
            }`}
          >
            {type}
            {emailType === type && (
              <div className="absolute bottom-0 left-0 w-full h-px bg-[#3856DD]" />
            )}
          </button>
        ))}
      </div>

      {/* Customer Selection */}
      {emailType === 'newsletter' && customers?.length > 0 && (
        <div className="space-y-4">
          <label className="block text-[#3856DD] opacity-60 tracking-wide font-serif">
            select customers
          </label>
          <div className="max-h-40 overflow-y-auto border border-[#3856DD] border-opacity-20 p-4">
            {customers.map(customer => (
              <label key={customer.customer_id} className="flex items-center space-x-2 py-1">
                <input
                  type="checkbox"
                  checked={selectedCustomers.includes(customer.customer_id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedCustomers([...selectedCustomers, customer.customer_id]);
                    } else {
                      setSelectedCustomers(selectedCustomers.filter(id => id !== customer.customer_id));
                    }
                  }}
                  className="text-[#3856DD]"
                />
                <span className="text-[#3856DD] font-serif">{customer.customer_id}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Email Form */}
      <form onSubmit={handleSendEmail} className="space-y-8">
        {emailType !== 'newsletter' && (
          <div className="space-y-4">
            <label className="block text-[#3856DD] opacity-60 tracking-wide font-serif">
              recipients
            </label>
            <input
              type="text"
              value={recipients}
              onChange={(e) => setRecipients(e.target.value)}
              placeholder="email@example.com, email2@example.com"
              className="w-full p-4 border border-[#3856DD] border-opacity-20 focus:border-[#3856DD] outline-none text-[#3856DD] tracking-wide placeholder:text-[#3856DD] placeholder:opacity-60 font-serif"
            />
          </div>
        )}

        <div className="space-y-4">
          <label className="block text-[#3856DD] opacity-60 tracking-wide font-serif">
            subject
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-4 border border-[#3856DD] border-opacity-20 focus:border-[#3856DD] outline-none text-[#3856DD] tracking-wide font-serif"
          />
        </div>

        <div className="space-y-4">
          <label className="block text-[#3856DD] opacity-60 tracking-wide font-serif">
            content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            className="w-full p-4 border border-[#3856DD] border-opacity-20 focus:border-[#3856DD] outline-none text-[#3856DD] tracking-wide font-serif"
          />
        </div>

        {status && (
          <p className="text-center text-[#3856DD] opacity-60 italic tracking-wide font-serif">
            {status}
          </p>
        )}

        <button
          type="submit"
          disabled={isSending}
          className="w-full bg-[#3856DD] text-[#FFF6F0] p-4 tracking-wide hover:opacity-90 transition-opacity disabled:opacity-50 font-serif"
        >
          {isSending ? 'sending...' : 'send email'}
        </button>
      </form>
    </div>
  );
};

export default EmailManager;