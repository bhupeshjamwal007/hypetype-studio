function AppShell() {
    const location = useLocation();
    
    // 1. Create the helper variable (convert to lowercase to be safe)
    const currentPath = location.pathname.toLowerCase();

    // 2. Define which paths should NOT have a global footer
    const hideFooterPaths = ['/', '/hypetype', '/hypetype-page'];

    // 3. Check if the current path is in that hidden list
    const showGlobalFooter = !hideFooterPaths.includes(currentPath);

    return (
        <div className="app-container">
            <Header />
            <main className="app-main">
                <Routes>
                    {/* Redirect BOTH the empty domain and /HypeType to your main page */}
                    <Route path="/" element={<Navigate to="/HypeType-page" replace />} />
                    <Route path="/HypeType" element={<Navigate to="/HypeType-page" replace />} />
                    
                    <Route path="/HypeType-page" element={<Home />} />
                    
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

                    {/* Catch-all for typos */}
                    <Route path="*" element={<Navigate to="/HypeType-page" replace />} />
                </Routes>
            </main>
            {showGlobalFooter && <Footer />}
        </div>
    );
}
