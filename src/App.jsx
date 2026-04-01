import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import AboutUs from './About_Us';
import ContactUs from './Contact_Us';
import Home from './Home';
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

function AppShell() {
    const location = useLocation();
    const showGlobalFooter = location.pathname !== '/';

    useEffect(() => {
        const thumb = document.getElementById('thumb');
        const container = document.getElementById('sliderContainer');
        let isDragging = false;

        if (thumb && container) {
            const startDrag = () => {
                isDragging = true;
                thumb.style.transition = 'none';
            };

            thumb.onmousedown = startDrag;
            thumb.ontouchstart = startDrag;

            const onMove = (e) => {
                if (!isDragging) return;

                const clientX = e.clientX || (e.touches ? e.touches[0].clientX : 0);
                const rect = container.getBoundingClientRect();

                let x = clientX - rect.left - 30;
                const maxX = rect.width - thumb.offsetWidth - 6;

                if (x < 6) x = 6;
                if (x > maxX) {
                    x = maxX;
                    isDragging = false;
                    window.location.href = '/contact';
                }

                thumb.style.left = `${x}px`;
            };

            const onEnd = () => {
                if (!isDragging) return;

                isDragging = false;
                thumb.style.transition = 'left 0.3s ease-out';
                thumb.style.left = '6px';
            };

            window.addEventListener('mousemove', onMove);
            window.addEventListener('touchmove', onMove, { passive: false });
            window.addEventListener('mouseup', onEnd);
            window.addEventListener('touchend', onEnd);

            return () => {
                window.removeEventListener('mousemove', onMove);
                window.removeEventListener('touchmove', onMove);
                window.removeEventListener('mouseup', onEnd);
                window.removeEventListener('touchend', onEnd);
            };
        }
    }, []);

    return (
        <div className="app-container">
            <Header />
            <main className="app-main">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="/About_Us" element={<AboutUs />} />
                    <Route path="/contact-us" element={<ContactUs />} />
                    <Route path="/Contact_Us" element={<ContactUs />} />
                    <Route path="/services/branding" element={<Branding />} />
                    <Route path="/Services/Branding" element={<Branding />} />
                    <Route path="/services/logo" element={<Logo />} />
                    <Route path="/services/packaging" element={<Packaging />} />
                    <Route path="/services/brochure-menu" element={<BrochureMenu />} />
                    <Route path="/services/social-media" element={<SocialMedia />} />
                    <Route path="/Services/Social_Media" element={<SocialMedia />} />
                    <Route path="/services/performance-marketing" element={<PerformanceMarketing />} />
                    <Route path="/Services/Performance_Marketting" element={<PerformanceMarketing />} />
                    <Route path="/services/commercial-and-ads" element={<CommercialAds />} />
                    <Route path="/Services/Commercial&Ads" element={<CommercialAds />} />
                    <Route path="/services/web-apps-development" element={<WebAppsDevelopment />} />
                    <Route path="/Services/Web&AppsDevelopment" element={<WebAppsDevelopment />} />
                    <Route path="/services/artist-management" element={<ArtistManagement />} />
                    <Route path="/Services/Artist_Management" element={<ArtistManagement />} />
                    <Route path="/services/event-management" element={<EventManagement />} />
                    <Route path="/Services/Event_Management" element={<EventManagement />} />
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
