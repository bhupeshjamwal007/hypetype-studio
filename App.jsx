function AppShell() {
    const location = useLocation();
    
    // 1. Get the path and make it lowercase
    const path = location.pathname.toLowerCase();

    // 2. TRUE if path is just "/" OR if it contains "hypetype"
    // This covers "/", "/HypeType-page", "/hypetype-page", etc.
    const isHome = path === '/' || path.includes('hypetype');

    return (
        <div className="app-container">
            <Header />
            <main className="app-main">
                <Routes>
                    {/* Redirect the root to your home page */}
                    <Route path="/" element={<Navigate to="/HypeType-page" replace />} />
                    <Route path="/HypeType" element={<Navigate to="/HypeType-page" replace />} />
                    
                    <Route path="/HypeType-page" element={<Home />} />
                    
                    {/* Services and other routes */}
                    <Route path="/services" element={<Services />} />
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="/contact-us" element={<ContactUs />} />
                    <Route path="/services/branding" element={<Branding />} />
                    <Route path="/services/social-media" element={<SocialMedia />} />
                    <Route path="/services/performance-marketing" element={<PerformanceMarketing />} />
                    <Route path="/services/commercial-and-ads" element={<CommercialAds />} />
                    <Route path="/services/web-apps-development" element={<WebAppsDevelopment />} />
                    <Route path="/services/artist-management" element={<ArtistManagement />} />
                    <Route path="/services/event-management" element={<EventManagement />} />
                    
                    {/* Any other sub-service pages you have... */}
                    <Route path="/services/logo" element={<Logo />} />
                    <Route path="/services/packaging" element={<Packaging />} />
                    <Route path="/services/brochure-menu" element={<BrochureMenu />} />

                    {/* Catch-all */}
                    <Route path="*" element={<Navigate to="/HypeType-page" replace />} />
                </Routes>
            </main>

            {/* The Footer will ONLY show if isHome is FALSE */}
            {!isHome && <Footer />}
        </div>
    );
}
