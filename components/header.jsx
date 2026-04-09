import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImage from '../assets/image/logo2.png';

const MENU_LEAVE_DELAY_MS = 180;

const Header = () => {
    const location = useLocation();
    const [servicesOpen, setServicesOpen] = useState(false);
    const [brandingOpen, setBrandingOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const dropdownRef = useRef(null);
    const brandingRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const servicesCloseTimerRef = useRef(null);
    const brandingCloseTimerRef = useRef(null);

    const clearServicesCloseTimer = () => {
        if (servicesCloseTimerRef.current != null) {
            window.clearTimeout(servicesCloseTimerRef.current);
            servicesCloseTimerRef.current = null;
        }
    };

    const clearBrandingCloseTimer = () => {
        if (brandingCloseTimerRef.current != null) {
            window.clearTimeout(brandingCloseTimerRef.current);
            brandingCloseTimerRef.current = null;
        }
    };

    useEffect(() => {
        return () => {
            clearServicesCloseTimer();
            clearBrandingCloseTimer();
        };
    }, []);

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
        clearServicesCloseTimer();
        clearBrandingCloseTimer();
        setServicesOpen(false);
        setBrandingOpen(false);
        setMobileMenuOpen(false);
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }
    };

    const handleServicesDropdownEnter = () => {
        clearServicesCloseTimer();
        setServicesOpen(true);
    };

    const handleServicesDropdownLeave = () => {
        clearServicesCloseTimer();
        servicesCloseTimerRef.current = window.setTimeout(() => {
            setServicesOpen(false);
            setBrandingOpen(false);
            servicesCloseTimerRef.current = null;
        }, MENU_LEAVE_DELAY_MS);
    };

    const handleBrandingEnter = () => {
        clearBrandingCloseTimer();
        clearServicesCloseTimer();
        setBrandingOpen(true);
    };

    const handleBrandingLeave = () => {
        clearBrandingCloseTimer();
        brandingCloseTimerRef.current = window.setTimeout(() => {
            setBrandingOpen(false);
            brandingCloseTimerRef.current = null;
        }, MENU_LEAVE_DELAY_MS);
    };

    return (
        <header className="site-header">
            <div className="site-header-inner">
                <Link to="/" className="logo" aria-label="HYPETYPE home">
                    <img src={logoImage} alt="HYPETYPE" className="logo-image" />
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
                        <a href="/">Home</a>
                        <div
                            className={`site-nav-dropdown${servicesOpen ? ' is-open' : ''}`}
                            ref={dropdownRef}
                            onMouseEnter={handleServicesDropdownEnter}
                            onMouseLeave={handleServicesDropdownLeave}
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
                                <div
                                    className={`site-nav-submenu${brandingOpen ? ' is-open' : ''}`}
                                    ref={brandingRef}
                                    onMouseEnter={handleBrandingEnter}
                                    onMouseLeave={handleBrandingLeave}
                                >
                                    <Link to="/services/Branding"
                                        onClick={closeServicesMenu}

                                        
                                        className="site-nav-submenu-trigger"
                                        onClick={(event) => {
                                            setBrandingOpen((current) => !current);
                                            event.currentTarget.blur();
                                        }}
                                        aria-expanded={brandingOpen}
                                        aria-haspopup="true"
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            width: '100%',
                                            textDecoration: 'none',
                                            color: 'inherit',
                                            boxSizing: 'border-box'
                                        }}
                                    >
                                        <span>Branding</span>
                                        <span>▸</span>
                                    </Link>
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
                        <Link to="/About_Us" onClick={closeServicesMenu}>About</Link>
                        <Link to="/contact-us">Contact</Link>
                    </nav>

                    <Link to="/contact-us" className="header-cta">Let's Talk →</Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
