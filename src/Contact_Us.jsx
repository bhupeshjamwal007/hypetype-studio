import React, { useMemo, useState } from 'react';
import './App.css';

const ContactUs = () => {
    const [phone, setPhone] = useState('');
    const [isInvalid, setIsInvalid] = useState(false);

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

    const handleSubmit = (event) => {
        if (phone.length !== 10) {
            event.preventDefault();
            setIsInvalid(true);
        }
    };

    return (
        <div className="contact-page">
            <main className="contact-main">
                <div className="contact-container">
                    <div className="contact-header-block">
                        <h1>Work with HYPETYPE</h1>
                        <p>Let&apos;s build something amazing together</p>
                    </div>

                    <form
                        action="https://formspree.io/f/xpqodqra"
                        method="POST"
                        className="contact-form"
                        onSubmit={handleSubmit}
                    >
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

                        <button type="submit" className="submit-btn">Request Callback</button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default ContactUs;
