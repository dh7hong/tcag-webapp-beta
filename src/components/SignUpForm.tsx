'use client';

import { useState } from 'react';
import Input from './Input';
import Dropdown from './Dropdown';
import Button from './Button';

export default function SignUpForm() {
  const [form, setForm] = useState({
    phoneNumber: '',
    password: '',
    age: '',
    gender: 'Male',
    preferredStyle: 'Casual',
    heightCm: '',
    preferredSize: 'M',
    preferredColors: 'Black',
    bodyType: 'Average',
    shoppingFrequency: 'Monthly',
    avgSpend: '10,000 KRW - 30,000 KRW',
  });

  const [verificationCode, setVerificationCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [codeSent, setCodeSent] = useState(false);

  const handleChange = (field: string, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const handleSendCode = async () => {
    const res = await fetch('/api/sendVerification', {
      method: 'POST',
      body: JSON.stringify({ phoneNumber: form.phoneNumber }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      setCodeSent(true);
      alert('Verification code has been sent.');
    } else {
      alert('Failed to send verification code.');
    }
  };

  const handleVerifyCode = async () => {
    const res = await fetch('/api/verifyCode', {
      method: 'POST',
      body: JSON.stringify({ phoneNumber: form.phoneNumber, code: verificationCode }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      setIsVerified(true);
      alert('Your phone number is verified!');
    } else {
      alert('Incorrect verification code. Try again.');
    }
  };

  const handleSubmit = async () => {
    if (!isVerified) return alert('Please verify your phone number first.');

    const res = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      alert('Signup successful!');
    } else {
      alert('Signup failed.');
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-darkCard p-8 rounded-xl shadow-lg space-y-4">
      <Input
        placeholder="Phone Number"
        value={form.phoneNumber}
        onChange={(e) => handleChange('phoneNumber', e.target.value)}
      />

      <Button onClick={handleSendCode}>
        {codeSent ? 'Resend Verification Code' : 'Send Verification Code'}
      </Button>

      {codeSent && !isVerified && (
        <>
          <Input
            placeholder="Enter Verification Code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <Button onClick={handleVerifyCode}>Verify Code</Button>
        </>
      )}

      {isVerified && (
        <p className="text-green-400 font-semibold">✅ Verified successfully!</p>
      )}

      <Input
        type="password"
        placeholder="Password"
        onChange={(e) => handleChange('password', e.target.value)}
      />
      <Input
        placeholder="Age"
        onChange={(e) => handleChange('age', e.target.value)}
      />
      <Dropdown
        options={['Male', 'Female', 'Other']}
        value={form.gender}
        onChange={(v) => handleChange('gender', v)}
      />
      <Dropdown
        options={['Casual', 'Formal', 'Sporty']}
        value={form.preferredStyle}
        onChange={(v) => handleChange('preferredStyle', v)}
      />
      <Input
        placeholder="Height (cm)"
        onChange={(e) => handleChange('heightCm', e.target.value)}
      />
      <Dropdown
        options={['XS', 'S', 'M', 'L', 'XL']}
        value={form.preferredSize}
        onChange={(v) => handleChange('preferredSize', v)}
      />
      <Dropdown
        options={[
          'Black','White','Gray','Blue','Red',
          'Green','Yellow','Pink','Brown','Beige'
        ]}
        value={form.preferredColors}
        onChange={(v) => handleChange('preferredColors', v)}
      />
      <Dropdown
        options={['Slim', 'Average', 'Athletic', 'Plus-size']}
        value={form.bodyType}
        onChange={(v) => handleChange('bodyType', v)}
      />
      <Dropdown
        options={['Weekly', 'Monthly', 'Seasonally']}
        value={form.shoppingFrequency}
        onChange={(v) => handleChange('shoppingFrequency', v)}
      />
      <Dropdown
        options={[
          '10,000 KRW - 30,000 KRW','30,000 KRW - 60,000 KRW',
          '60,000 KRW - 100,000 KRW','100,000 KRW - 200,000 KRW',
          '200,000 KRW - 400,000 KRW','400,000 KRW - 700,000 KRW',
          '700,000 KRW - 1,000,000 KRW','1,000,000 KRW - 2,000,000 KRW','2,000,000 KRW+'
        ]}
        value={form.avgSpend}
        onChange={(v) => handleChange('avgSpend', v)}
      />

      <Button onClick={handleSubmit}>Sign Up</Button>
    </div>
  );
}
