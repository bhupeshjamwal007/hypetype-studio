import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useMatch, Navigate } from 'react-router-dom';
import './App.css';
import AboutUs from './About_Us';
import ContactUs from './Contact_Us';
import Home from './HypeType';
import Services from './Services';
import Branding from './Services/Branding';
import ArtistManagement from './Services/Artist_management';
import BrochureMenu from './Services/Brochure_Menu';
import CommercialAds from './Services/Commercial&Ads';
import EventManagement from './Services/Event_Management';
import Logo from './Services/Logo_Designing';
import Packaging from './Services/Packaging';
import PerformanceMarketing from './Services/Performance_Marketing';
import SocialMedia from './Services/Social_Media';
import WebAppsDevelopment from './Services/Web&Apps_Development';
import Header from './components/header';
import Footer from './components/footer';

/** Home is the peel-stack at /. Legacy aliases are redirected to root. No global site footer there — the page embeds its own footer on the last stack slide. */
function isHomePath(pathname) {
    const trimmed = (pathname || '/').replace(/\/+$/, '') || '/';
    const lower = trimmed.toLowerCase();
    if (lower === '/') return true;
    return false;
}

function AppShell() {
    const location = useLocation();
    const matchRoot = useMatch({ path: '/', end: true });
    const hideGlobalFooter = Boolean(matchRoot) || isHomePath(location.pathname);
    const showGlobalFooter = !hideGlobalFooter;

    return (
        <div className="app-container">
            <Header />
            <main className="app-main">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about-us/" element={<AboutUs />} />
                    <Route path="/contact-us/" element={<ContactUs />} />

                    <Route path="/services" element={<Services />} />
                    <Route path="/services/branding/" element={<Branding />} />
                    <Route path="/services/branding/logo/" element={<Logo />} />
                    <Route path="/services/branding/packaging/" element={<Packaging />} />
                    <Route path="/services/branding/brochure-menu/" element={<BrochureMenu />} />

                    <Route path="/services/social-media-marketing/" element={<SocialMedia />} />
                    <Route path="/services/performance-marketing/" element={<PerformanceMarketing />} />
                    <Route path="/services/commercial-ads/" element={<CommercialAds />} />
                    <Route path="/services/web-development/" element={<WebAppsDevelopment />} />
                    <Route path="/services/artist-management/" element={<ArtistManagement />} />
                    <Route path="/services/event-management/" element={<EventManagement />} />
                </Routes>
            </main>
            {showGlobalFooter ? <Footer /> : null}
        </div>
    );
}

function App() {
    return (
        <Router>
            <AppShell />
        </Router>
    );
}

export default App;
