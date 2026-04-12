import React, { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import logoImage from '../assets/image/logo2.png';

const LEGAL_CONTENT = {
    terms: {
        title: 'Terms and Conditions',
        effectiveFrom: 'Effective From: April 2026',
        sections: [
            {
                heading: '1. Acceptance of Terms',
                paragraphs: [
                    'This agreement is a legally binding contract between you, whether personally or on behalf of an entity (the "User" or "You"), and The Hype Type (the "Company," "We," "Us," or "Our"). By accessing the website located at https://thehypetype.com/ (the "Website"), you acknowledge that you have read, understood, and agreed to be bound by all of these Terms and Conditions. If you do not agree with all of these terms, you are expressly prohibited from using the Website and must discontinue use immediately.'
                ]
            },
            {
                heading: '2. Services Provided',
                paragraphs: [
                    'The Company operates as a creative and growth agency providing services including but not limited to Brand Identity Design, Social Media Management, Performance Marketing, Web Development, and Artist Management (the "Services"). The specific terms of any professional engagement will be governed by a separate Service Level Agreement or Statement of Work.'
                ]
            },
            {
                heading: '3. Intellectual Property Rights',
                paragraphs: [
                    'The Website and its entire contents, features, and functionality are owned by the Company, its licensors, or other providers of such material. These materials are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws. You are granted a limited, non-exclusive, non-transferable, and revocable license to access the Website for personal, non-commercial use only.'
                ]
            },
            {
                heading: '4. User Obligations',
                paragraphs: [
                    'The User represents and warrants that any information submitted through the Website is true, accurate, and complete. The User agrees not to use the Website for any unlawful purpose or any purpose prohibited under these clauses. The User shall not attempt to interfere with the proper working of the Website or circumvent any security measures.'
                ]
            },
            {
                heading: '5. Disclaimer of Warranties',
                paragraphs: [
                    'The Website and Services are provided on an as-is and as-available basis. The Company makes no representations or warranties of any kind, express or implied, as to the operation of the Website or the information, content, or materials included therein. To the full extent permissible by applicable law, the Company disclaims all warranties, including but not limited to implied warranties of merchantability and fitness for a particular purpose.'
                ]
            },
            {
                heading: '6. Limitation of Liability',
                paragraphs: [
                    'To the maximum extent permitted by law, the Company shall not be liable for any damages of any kind arising from the use of the Website or from any information, content, materials, or products included on the Website. This includes, without limitation, direct, indirect, incidental, punitive, and consequential damages.'
                ]
            },
            {
                heading: '7. Governing Law',
                paragraphs: [
                    'These Terms and Conditions and your use of the Website are governed by and construed in accordance with the laws of India. Any legal action or proceeding related to your access to or use of the Website shall be instituted in the courts of Jammu and Kashmir.'
                ]
            }
        ]
    },
    privacy: {
        title: 'Privacy Policy',
        effectiveFrom: 'Effective From: April 2026',
        sections: [
            {
                heading: '1. Information We Collect',
                paragraphs: [
                    'The Hype Type (the "Company," "We," "Us," or "Our") collects personal information that you voluntarily provide when you express interest in our Services. This data may include your name, contact information, email address, and professional details. We also collect certain information automatically when you visit the Website, such as your Internet Protocol (IP) address, browser characteristics, and operating system.'
                ]
            },
            {
                heading: '2. Legal Basis for Processing',
                paragraphs: [
                    'We process your personal information to fulfill our contractual obligations, comply with legal requirements, and pursue our legitimate business interests. Where required by law, we will obtain your explicit consent before processing your personal data for marketing purposes.'
                ]
            },
            {
                heading: '3. Disclosure of Your Information',
                paragraphs: [
                    'The Company may share information we have collected about you in certain situations. Your information may be disclosed to third-party vendors, service providers, contractors, or agents who perform services for us or on our behalf and require access to such information to do that work. We do not share, sell, rent, or trade any of your information with third parties for their promotional purposes.'
                ]
            },
            {
                heading: '4. Data Retention',
                paragraphs: [
                    'We will only keep your personal information for as long as it is necessary for the purposes set out in this Privacy Policy, unless a longer retention period is required or permitted by law. When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information.'
                ]
            },
            {
                heading: '5. Security of Your Information',
                paragraphs: [
                    'We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.'
                ]
            },
            {
                heading: '6. Contact Information',
                paragraphs: [
                    'For questions or concerns regarding this Privacy Policy or our data practices, please contact the Company at the following:',
                    'Email: hypetypecreators@gmail.com',
                    'Phone: +91 96221-97382'
                ]
            }
        ]
    }
};

const Footer = ({ style: footerStyle, isHome = false }) => {
    const footerRootClass = `site-footer${isHome ? ' site-footer--home' : ''}`;
    const [activeLegalKey, setActiveLegalKey] = useState(null);

    const activeLegal = useMemo(() => {
        if (!activeLegalKey) return null;
        return LEGAL_CONTENT[activeLegalKey] ?? null;
    }, [activeLegalKey]);

    useEffect(() => {
        if (!activeLegalKey) return undefined;

        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                setActiveLegalKey(null);
            }
        };

        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [activeLegalKey]);

    useEffect(() => {
        if (!activeLegalKey) return undefined;
        const body = typeof window !== 'undefined' ? window.document?.body : null;
        if (!body) return undefined;
        body.classList.add('legal-modal-open');
        return () => {
            body.classList.remove('legal-modal-open');
        };
    }, [activeLegalKey]);

    const quickLinksBlock = (
        <div className="footer-services-column">
            <h4 className="footer-column-title">Quick Links</h4>
            <div className="footer-service-links">
                <Link to="/about-us">About us</Link>
                {/*<Link to="/">Our work</Link>*/}
                <Link to="/services">Services</Link>
                {/*<Link to="/">Our team</Link>
                <Link to="/">News</Link>
                <Link to="/">Careers</Link>*/}
            </div>
        </div>
    );

    const serviceLinksBlock = (
        <div className="footer-services-column">
            <h4 className="footer-column-title">{isHome ? 'Services' : 'Featured Work'}</h4>
            <div className="footer-service-links">
                <Link to="/services/branding">Branding</Link>
                <Link to="/services/performance-marketing">Performance Marketing</Link>
                <Link to="/services/social-media">Social Media</Link>
                <Link to="/services/commercial-and-ads">Commercial And Ads</Link>
                <Link to="/services/web-apps-development">Web And Apps</Link>
                <Link to="/services/artist-management">Artist Management</Link>
                <Link to="/services/event-management">Event Management</Link>
            </div>
        </div>
    );

    const officeBlock = (
        <div className="footer-meta">
            <h4 className="footer-column-title">Our Office</h4>
            <div className="footer-address-list">
                <div className="footer-address-item">
                    <img src="https://flagcdn.com/w40/in.png" alt="India flag" className="footer-flag" />
                    <div>
                        <p className="footer-address-country">Jammu, India</p>
                    </div>
                </div>
                <div className="footer-address-item">
                    <img src="https://flagcdn.com/w40/ca.png" alt="Canada flag" className="footer-flag" />
                    <div>
                        <p className="footer-address-country">Alberta, Canada</p>
                    </div>
                </div>
            </div>
            <a href="/" className="footer-address-line">Navigate -{'>'}</a>
            <a
                href="mailto:info@thehypetype.com"
                className="footer-address-line"
            >
                Email: info@thehypetype.com
            </a>
            <p className="footer-address-line">Phone: 96221-97382</p>
        </div>
    );

    const legalModal = activeLegal ? (
        <div
            className="legal-modal-overlay"
            role="presentation"
            onClick={() => setActiveLegalKey(null)}
        >
            <div
                className="legal-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="legal-modal-title"
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    type="button"
                    className="legal-modal-close"
                    aria-label="Close policy popup"
                    onClick={() => setActiveLegalKey(null)}
                >
                    x
                </button>
                <h3 className="legal-modal-title" id="legal-modal-title">{activeLegal.title}</h3>
                <p className="legal-modal-effective">{activeLegal.effectiveFrom}</p>

                <div className="legal-modal-content">
                    {activeLegal.sections.map((section) => (
                        <section className="legal-modal-section" key={section.heading}>
                            <h4>{section.heading}</h4>
                            {section.paragraphs.map((paragraph) => (
                                <p key={`${section.heading}-${paragraph.slice(0, 30)}`}>{paragraph}</p>
                            ))}
                        </section>
                    ))}
                </div>
            </div>
        </div>
    ) : null;

    const portalTarget = typeof window !== 'undefined' ? window.document?.body : null;

    return (
        <>
            <footer className={footerRootClass} id="contact-section" style={footerStyle}>
                <div className="site-footer-inner">
                    <div className="about-inline-footer">
                        {isHome ? (
                            <>
                                <div className="home-footer-logo-row">
                                    <div className="footer-brand-block">
                                        <Link to="/" className="footer-logo" aria-label="HYPETYPE - Home">
                                            <img src={logoImage} alt="HYPETYPE" className="footer-logo-image" />
                                        </Link>
                                    </div>
                                </div>
                                <div className="home-footer-divider" aria-hidden="true" />
                                <div className="about-inline-footer-top home-footer-columns">
                                    {quickLinksBlock}
                                    {serviceLinksBlock}
                                    {officeBlock}
                                </div>
                            </>
                        ) : (
                            <div className="about-inline-footer-top">
                                <div className="footer-brand-block">
                                    <Link to="/" className="footer-logo" aria-label="HYPETYPE - Home">
                                        <img src={logoImage} alt="HYPETYPE" className="footer-logo-image" />
                                    </Link>
                                </div>

                                {quickLinksBlock}
                                {serviceLinksBlock}
                                {officeBlock}
                            </div>
                        )}

                        <div className="footer-bottom about-inline-footer-bottom">
                            <p className="footer-legal-text">
                                All Rights Reserved -
                                <button
                                    type="button"
                                    className="footer-legal-link"
                                    onClick={() => setActiveLegalKey('terms')}
                                >
                                    Terms & Conditions
                                </button>
                                -
                                <button
                                    type="button"
                                    className="footer-legal-link"
                                    onClick={() => setActiveLegalKey('privacy')}
                                >
                                    Privacy Policy
                                </button>
                            </p>
                            <div className="footer-social-icons" aria-label="Social links">
                                <a href="/" aria-label="Twitter">X</a>
                                <a href="/" aria-label="Facebook">f</a>
                                <a href="/" className="footer-instagram-link" aria-label="Instagram">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" aria-hidden="true">
                                        <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.9-26.9 26.9-14.9 0-26.9-12-26.9-26.9s12-26.9 26.9-26.9c14.9 0 26.9 12 26.9 26.9zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                                    </svg>
                                </a>
                                <a href="/" aria-label="LinkedIn">in</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {legalModal ? (portalTarget ? createPortal(legalModal, portalTarget) : legalModal) : null}
        </>
    );
};

export default Footer;
