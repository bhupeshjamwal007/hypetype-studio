import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xpqodqra';
const REDIRECT_DELAY_MS = 2600;

const ContactUs = () => {
    const navigate = useNavigate();
    const [phone, setPhone] = useState('');
    const [isInvalid, setIsInvalid] = useState(false);
    const [submitPhase, setSubmitPhase] = useState('idle');
    const [submitError, setSubmitError] = useState('');
    const redirectTimerRef = useRef(null);

    useEffect(() => () => {
        if (redirectTimerRef.current) {
            window.clearTimeout(redirectTimerRef.current);
        }
    }, []);

    const phoneError = useMemo(() => {
        if (!isInvalid) return '';
        if (phone.length === 0) return 'Please enter your phone number.';
        if (phone.length !== 10) return 'Please enter a valid 10-digit mobile number.';
        return '';
    }, [isInvalid, phone]);

    const handlePhoneChange = (event) => {
        const digitsOnly = event.target.value.replace(/[^0-9]/g, '').slice(0, 10);
        setPhone(digitsOnly);
        if (isInvalid && digitsOnly.length === 10) {
            setIsInvalid(false);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitError('');

        if (phone.length !== 10) {
            setIsInvalid(true);
            return;
        }

        setSubmitPhase('submitting');

        const form = event.currentTarget;
        const formData = new FormData(form);

        try {
            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                body: formData,
                headers: { Accept: 'application/json' },
            });

            let data = null;
            try {
                data = await response.json();
            } catch {
                data = null;
            }

            if (response.ok) {
                setSubmitPhase('success');
                if (redirectTimerRef.current) {
                    window.clearTimeout(redirectTimerRef.current);
                }
                redirectTimerRef.current = window.setTimeout(() => {
                    redirectTimerRef.current = null;
                    navigate('/#home-page');
                }, REDIRECT_DELAY_MS);
                return;
            }

            setSubmitPhase('idle');
            const errMsg = data?.error || data?.errors?.[0]?.message || 'Something went wrong. Please try again.';
            setSubmitError(typeof errMsg === 'string' ? errMsg : 'Please try again later.');
        } catch {
            setSubmitPhase('idle');
            setSubmitError('Network error. Please check your connection and try again.');
        }
    };

    return (
        <div className="contact-page">
            {submitPhase === 'success' ? (
                <div className="contact-thankyou-backdrop" role="status" aria-live="polite">
                    <div className="contact-thankyou-card">
                        <span className="contact-thankyou-tick" aria-hidden="true">✓</span>
                        <p className="contact-thankyou-title">Thank You For Contacting Us</p>
                        <p className="contact-thankyou-sub">Taking you home…</p>
                    </div>
                </div>
            ) : null}
            <main className="contact-main">
                <div className="contact-container">
                    <div className="contact-header-block">
                        <h1>Work with HYPETYPE</h1>
                        <p>Let&apos;s build something amazing together</p>
                    </div>

                    <form className="contact-form" onSubmit={handleSubmit} noValidate>
                        <div className="form-group">
                            <label htmlFor="full_name">Name <span>*</span></label>
                            <input id="full_name" type="text" name="full_name" placeholder="Enter name" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="brand_name">Brand Name <span>*</span></label>
                            <input id="brand_name" type="text" name="brand_name" placeholder="Enter your brand name" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email <span>*</span></label>
                            <input id="email" type="email" name="email" placeholder="Enter email" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone_number">Phone <span>*</span></label>
                            <div className="phone-input-wrapper">
                                <span className="phone-country-code">+91</span>
                                <input
                                    id="phone_number"
                                    type="tel"
                                    name="phone_number"
                                    placeholder="81234 56789"
                                    inputMode="numeric"
                                    value={phone}
                                    onChange={handlePhoneChange}
                                    className={isInvalid ? 'input-invalid' : ''}
                                    required
                                />
                            </div>
                            {phoneError ? <p className="phone-error-message">{phoneError}</p> : null}
                        </div>

                        <div className="form-group">
                            <label htmlFor="requirement">Requirement <span>*</span></label>
                            <textarea id="requirement" name="requirement" rows="4" placeholder="Tell us about your project..." required />
                        </div>

                        {submitError ? <p className="contact-form-error">{submitError}</p> : null}

                        <button type="submit" className="submit-btn" disabled={submitPhase === 'submitting'}>
                            {submitPhase === 'submitting' ? 'Sending…' : 'Request Callback'}
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default ContactUs;
