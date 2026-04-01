import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation();
    const [servicesOpen, setServicesOpen] = useState(false);
    const [brandingOpen, setBrandingOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const dropdownRef = useRef(null);
    const brandingRef = useRef(null);
    const mobileMenuRef = useRef(null);

    useEffect(() => {
        setServicesOpen(false);
        setBrandingOpen(false);
        setMobileMenuOpen(false);
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }
    }, [location.pathname, location.hash]);

    useEffect(() => {
        const handlePointerDown = (event) => {
            if (!dropdownRef.current?.contains(event.target)) {
                setServicesOpen(false);
                setBrandingOpen(false);
            }

            if (!brandingRef.current?.contains(event.target)) {
                setBrandingOpen(false);
            }

            if (!mobileMenuRef.current?.contains(event.target)) {
                setMobileMenuOpen(false);
            }
        };

        window.addEventListener('pointerdown', handlePointerDown);
        return () => {
            window.removeEventListener('pointerdown', handlePointerDown);
        };
    }, []);

    const closeServicesMenu = () => {
        setServicesOpen(false);
        setBrandingOpen(false);
        setMobileMenuOpen(false);
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }
    };

    return (
        <header className="site-header">
            <div className="site-header-inner">
                <Link to="/" className="logo" aria-label="HYPETYPE home">
                    <span className="logo-wordmark">
                        hypetype
                        <span className="logo-dot" aria-hidden="true" />
                    </span>
                </Link>

                <div className={`site-nav-group${mobileMenuOpen ? ' is-open' : ''}`} ref={mobileMenuRef}>
                    <button
                        type="button"
                        className="mobile-menu-toggle"
                        onClick={() => {
                            setMobileMenuOpen((current) => !current);
                            setServicesOpen(false);
                            setBrandingOpen(false);
                        }}
                        aria-expanded={mobileMenuOpen}
                        aria-label="Open navigation menu"
                    >
                        <span />
                        <span />
                        <span />
                    </button>

                    <nav className="site-nav" aria-label="Primary navigation">
                        <a href="/#home-page">Home</a>
                        <div
                            className={`site-nav-dropdown${servicesOpen ? ' is-open' : ''}`}
                            ref={dropdownRef}
                        >
                            <div className="site-nav-dropdown-head">
                                <Link to="/services" className="site-nav-dropdown-link" onClick={closeServicesMenu}>Services</Link>
                                <button
                                    type="button"
                                    className="site-nav-dropdown-trigger"
                                    onClick={(event) => {
                                        setServicesOpen((current) => !current);
                                        event.currentTarget.blur();
                                    }}
                                    aria-expanded={servicesOpen}
                                    aria-haspopup="true"
                                    aria-label="Open services menu"
                                >
                                    ▾
                                </button>
                            </div>
                            <div className="site-nav-dropdown-menu" role="menu" aria-label="Services submenu">
                                <Link to="/services" onClick={closeServicesMenu}>All Services</Link>
                                <div className={`site-nav-submenu${brandingOpen ? ' is-open' : ''}`} ref={brandingRef}>
                                    <button
                                        type="button"
                                        className="site-nav-submenu-trigger"
                                        onClick={(event) => {
                                            setBrandingOpen((current) => !current);
                                            event.currentTarget.blur();
                                        }}
                                        aria-expanded={brandingOpen}
                                        aria-haspopup="true"
                                    >
                                        Branding ▸
                                    </button>
                                    <div className="site-nav-submenu-panel">
                                        <Link to="/services/logo" onClick={closeServicesMenu}>Logo</Link>
                                        <Link to="/services/packaging" onClick={closeServicesMenu}>Packaging</Link>
                                        <Link to="/services/brochure-menu" onClick={closeServicesMenu}>Brochure & Menu</Link>
                                    </div>
                                </div>
                                <Link to="/services/social-media" onClick={closeServicesMenu}>Social Media</Link>
                                <Link to="/services/performance-marketing" onClick={closeServicesMenu}>Performance Marketing</Link>
                                <Link to="/services/commercial-and-ads" onClick={closeServicesMenu}>Commercial & Ads</Link>
                                <Link to="/services/web-apps-development" onClick={closeServicesMenu}>Web & Apps Development</Link>
                                <Link to="/services/artist-management" onClick={closeServicesMenu}>Artist Management</Link>
                                <Link to="/services/event-management" onClick={closeServicesMenu}>Event Management</Link>
                            </div>
                        </div>
                        <Link to="/about-us">About</Link>
                        <Link to="/contact-us">Contact</Link>
                    </nav>

                    <Link to="/contact-us" className="header-cta">Let's Talk</Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
