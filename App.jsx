function AppShell() {
    const location = useLocation();
    
    // 1. Force everything to lowercase so it matches exactly
    const currentPath = location.pathname.toLowerCase();

    // 2. Define the exact paths where the footer MUST be hidden
    // We include the empty string, the slash, and the full page name
    const hiddenPaths = ['', '/', '/hypetype', '/hypetype-page', '/hypetype-page/'];

    // 3. Check if currentPath is in our hidden list
    const isHome = hiddenPaths.includes(currentPath);
    
    // Debugging: This will show in your browser console (F12) 
    // to tell us why it's showing or hiding.
    console.log("Current Path:", currentPath, "Hide Footer?", isHome);

    return (
        <div className="app-container">
            <Header />
            <main className="app-main">
                <Routes>
                    {/* Handle the root and redirect to our main page */}
                    <Route path="/" element={<Navigate to="/HypeType-page" replace />} />
                    <Route path="/HypeType" element={<Navigate to="/HypeType-page" replace />} />
                    
                    <Route path="/HypeType-page" element={<Home />} />
                    
                    {/* All other routes */}
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

                    {/* Catch-all */}
                    <Route path="*" element={<Navigate to="/HypeType-page" replace />} />
                </Routes>
            </main>

            {/* ONLY show footer if NOT on home */}
            {!isHome && <Footer />}
        </div>
    );
}
