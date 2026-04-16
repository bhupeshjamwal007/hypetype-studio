import React from 'react';
import { Link } from 'react-router-dom';

const Footer = ({ style: footerStyle }) => {
    return (
        <footer className="site-footer" id="contact-section" style={footerStyle}>
            <div className="site-footer-inner">
                <div className="about-inline-footer">
                    <div className="about-inline-footer-top">
                        <div className="footer-brand-block">
                            <Link to="/HypeType-page" className="footer-logo" aria-label="HYPETYPE – Home">
                                HYPETYPE
                            </Link>
                        </div>

                        <div className="footer-services-column">
                            <h4 className="footer-column-title">Quick Links</h4>
                            <div className="footer-service-links">
                                <Link to="/about-us">About us</Link>
                                <Link to="/">Our work</Link>
                                <Link to="/services">Services</Link>
                                <Link to="/">Our team</Link>
                                <Link to="/">News</Link>
                                <Link to="/">Careers</Link>
                            </div>
                        </div>

                        <div className="footer-services-column">
                            <h4 className="footer-column-title">Featured Work</h4>
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
                            <a href="/" className="footer-address-line">Navigate →</a>
                            <a
                                href="mailto:hypetypecreators@gmail.com"
                                className="footer-address-line"
                            >
                                ✉ hypetypecreators@gmail.com
                            </a>
                            <p className="footer-address-line">📞 96221-97382</p>
                        </div>
                    </div>

                    <div className="footer-bottom about-inline-footer-bottom">
                        <p>All Rights Reserved - Terms & Conditions - Privacy Policy</p>
                        <div className="footer-social-icons" aria-label="Social links">
                            <a href="/" aria-label="Twitter">𝕏</a>
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
    );
};

export default Footer;
