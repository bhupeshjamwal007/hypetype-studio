import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Footer from './components/footer';

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

/** Tunes peel timing, optional continuous hero-thumb animation, and lazy video for Safari / low-end mobile. */
function computeHomePerf() {
    if (typeof window === 'undefined') {
        return {
            reducedMotion: false,
            lowEndMobile: false,
            lite: false,
            pageAnimationMs: 520,
            transitionCooldownMs: 700,
            skipThumbLoop: false,
        };
    }

    let reducedMotion = false;
    try {
        reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch {
        /* Safari private mode / older browsers */
    }

    let coarse = false;
    let narrow = false;
    try {
        coarse = window.matchMedia('(pointer: coarse)').matches;
        narrow = window.matchMedia('(max-width: 768px)').matches;
    } catch {
        /* ignore */
    }

    const cores = typeof navigator.hardwareConcurrency === 'number' ? navigator.hardwareConcurrency : 8;
    const memory = navigator.deviceMemory;
    const conn = navigator.connection;
    const saveData = conn?.saveData === true;
    const slowNet = conn != null && /^(slow-2g|2g)$/i.test(conn.effectiveType || '');

    const lowEndMobile =
        saveData ||
        slowNet ||
        (coarse && narrow && (cores <= 4 || (typeof memory === 'number' && memory <= 4)));

    const lite = reducedMotion || lowEndMobile;
    const pageAnimationMs = reducedMotion ? 0 : lowEndMobile ? 600 : 1200;
    const transitionCooldownMs = reducedMotion ? 120 : lowEndMobile ? 560 : 700;

    return {
        reducedMotion,
        lowEndMobile,
        lite,
        pageAnimationMs,
        transitionCooldownMs,
        skipThumbLoop: reducedMotion || lowEndMobile,
    };
}

const Home = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const perf = useMemo(() => computeHomePerf(), []);

    const [sliderThankYou, setSliderThankYou] = useState(false);
    const [loadVideoIframe, setLoadVideoIframe] = useState(() => {
        if (typeof window === 'undefined') return false;
        return /^#(video-page|services-page|about-page|footer-page)/.test(window.location.hash);
    });
    const [animationProgress, setAnimationProgress] = useState(() => (
        typeof window !== 'undefined' && /^#(video-page|services-page|about-page|footer-page)/.test(window.location.hash) ? 1 : 0
    ));
    const heroPageRef = useRef(null);
    const videoSectionRef = useRef(null);
    const animationProgressRef = useRef(animationProgress);
    const touchStartYRef = useRef(null);

    useEffect(() => {
        const thumb = document.getElementById('thumb');
        const container = document.getElementById('sliderContainer');
        if (!thumb || !container) {
            return undefined;
        }

        const BASE = 6;
        let isDragging = false;
        let animationFrameId = null;
        let direction = 1;
        let currentX = BASE;
        let lastTimestamp = 0;
        let navigateTimerId = null;

        const getUnlockMaxX = () => Math.max(container.offsetWidth - thumb.offsetWidth - BASE, BASE);

        const getAnimHigh = () => {
            const unlockMax = getUnlockMaxX();
            const available = unlockMax - BASE;
            const span = Math.min(30, Math.max(15, Math.round(available * 0.08)));
            return Math.min(BASE + span, unlockMax);
        };

        const cancelAnimation = () => {
            if (animationFrameId != null) {
                window.cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
        };

        const animateThumb = (timestamp) => {
            if (isDragging) {
                animationFrameId = null;
                return;
            }

            if (!lastTimestamp) {
                lastTimestamp = timestamp;
            }

            const delta = timestamp - lastTimestamp;
            lastTimestamp = timestamp;

            const animHigh = getAnimHigh();
            const speed = 0.024;
            currentX += direction * delta * speed;

            if (currentX >= animHigh) {
                currentX = animHigh;
                direction = -1;
            } else if (currentX <= BASE) {
                currentX = BASE;
                direction = 1;
            }

            thumb.style.left = `${currentX}px`;
            animationFrameId = window.requestAnimationFrame(animateThumb);
        };

        const startAutoMotion = () => {
            if (isDragging || animationFrameId != null) return;
            lastTimestamp = 0;
            animationFrameId = window.requestAnimationFrame(animateThumb);
        };

        const startDrag = () => {
            cancelAnimation();
            isDragging = true;
            thumb.style.transition = 'none';
        };

        const onMove = (e) => {
            if (!isDragging) return;
            if (e.cancelable && e.type === 'touchmove') {
                e.preventDefault();
            }

            const clientX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
            const rect = container.getBoundingClientRect();
            const halfW = thumb.offsetWidth / 2;
            let x = clientX - rect.left - halfW;
            const maxX = getUnlockMaxX();

            if (x < BASE) x = BASE;
            if (x >= maxX) {
                x = maxX;
                isDragging = false;
                currentX = x;
                thumb.style.left = `${x}px`;
                thumb.style.transition = 'left 0.2s ease-out';
                setSliderThankYou(true);
                navigateTimerId = window.setTimeout(() => {
                    navigateTimerId = null;
                    navigate('/contact-us');
                }, 1000);
                return;
            }

            currentX = x;
            thumb.style.left = `${x}px`;
        };

        const onEnd = () => {
            if (!isDragging) return;

            cancelAnimation();
            isDragging = false;
            thumb.style.transition = 'left 0.35s ease-out';
            thumb.style.left = `${BASE}px`;
            currentX = BASE;
            lastTimestamp = 0;
            direction = 1;
            window.setTimeout(() => {
                if (!perf.skipThumbLoop) startAutoMotion();
            }, 360);
        };

        const onResize = () => {
            const unlockMax = getUnlockMaxX();
            const animHigh = getAnimHigh();
            const cap = isDragging ? unlockMax : animHigh;
            currentX = Math.min(Math.max(currentX, BASE), cap);
            thumb.style.left = `${currentX}px`;
        };

        thumb.addEventListener('mousedown', startDrag);
        thumb.addEventListener('touchstart', startDrag, { passive: true });

        window.addEventListener('mousemove', onMove);
        window.addEventListener('touchmove', onMove, { passive: false });
        window.addEventListener('mouseup', onEnd);
        window.addEventListener('touchend', onEnd);
        window.addEventListener('resize', onResize);

        if (!perf.skipThumbLoop) {
            startAutoMotion();
        }

        return () => {
            if (navigateTimerId != null) {
                window.clearTimeout(navigateTimerId);
            }
            cancelAnimation();
            thumb.removeEventListener('mousedown', startDrag);
            thumb.removeEventListener('touchstart', startDrag);
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('touchmove', onMove);
            window.removeEventListener('mouseup', onEnd);
            window.removeEventListener('touchend', onEnd);
            window.removeEventListener('resize', onResize);
        };
    }, [navigate, perf.skipThumbLoop]);

    useEffect(() => {
        const hero = heroPageRef.current;
        if (!hero) return undefined;

        const viewport = Math.max(window.innerHeight, 1);
        const progress = animationProgress;
        const heroOpacity = 1 - progress;
        const heroLift = -viewport * progress;

        hero.style.setProperty('--hero-fade-opacity', `${heroOpacity}`);
        hero.style.setProperty('--hero-fade-translate', `${heroLift}px`);
        hero.style.setProperty('--peel-visibility', 'visible');
        hero.style.setProperty('--page-active', progress >= 0.98 ? 'none' : 'auto');

        const video = videoSectionRef.current;
        if (video) {
            const videoOpacity = progress;
            const videoScale = 0.98 + (0.02 * progress);
            const videoLift = (1 - progress) * 64;
            video.style.setProperty('--video-fade-opacity', `${videoOpacity}`);
            video.style.setProperty('--video-fade-scale', `${videoScale}`);
            video.style.setProperty('--video-fade-translate', `${videoLift}px`);
        }
    }, [animationProgress]);

    useEffect(() => {
        animationProgressRef.current = animationProgress;
    }, [animationProgress]);

    useEffect(() => {
        const updateAnimationProgress = (delta) => {
            const current = animationProgressRef.current;
            const next = clamp(current + delta, 0, 1);
            if (Math.abs(next - current) < 0.0001) return;
            animationProgressRef.current = next;
            setAnimationProgress(next);
        };

        const shouldConsumeForAnimation = (deltaY) => {
            const atTop = window.scrollY <= 1;
            if (!atTop) return false;
            const progress = animationProgressRef.current;
            if (deltaY > 0 && progress < 1) return true;
            if (deltaY < 0 && progress > 0) return true;
            return false;
        };

        const onWheel = (event) => {
            if (!shouldConsumeForAnimation(event.deltaY)) return;
            event.preventDefault();
            updateAnimationProgress(event.deltaY * 0.0016);
        };

        const onTouchStart = (event) => {
            touchStartYRef.current = event.touches[0]?.clientY ?? null;
        };

        const onTouchMove = (event) => {
            const touchY = event.touches[0]?.clientY;
            const startY = touchStartYRef.current;
            if (touchY == null || startY == null) return;
            const deltaY = startY - touchY;
            if (!shouldConsumeForAnimation(deltaY)) {
                touchStartYRef.current = touchY;
                return;
            }
            event.preventDefault();
            touchStartYRef.current = touchY;
            updateAnimationProgress(deltaY * 0.0022);
        };

        const onTouchEnd = () => {
            touchStartYRef.current = null;
        };

        window.addEventListener('wheel', onWheel, { passive: false });
        window.addEventListener('touchstart', onTouchStart, { passive: true });
        window.addEventListener('touchmove', onTouchMove, { passive: false });
        window.addEventListener('touchend', onTouchEnd);

        return () => {
            window.removeEventListener('wheel', onWheel);
            window.removeEventListener('touchstart', onTouchStart);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('touchend', onTouchEnd);
        };
    }, []);

    useEffect(() => {
        const videoSection = videoSectionRef.current;
        if (!videoSection || loadVideoIframe) return undefined;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries.some((entry) => entry.isIntersecting)) {
                    setLoadVideoIframe(true);
                    observer.disconnect();
                }
            },
            { root: null, threshold: 0.15 }
        );

        observer.observe(videoSection);
        return () => observer.disconnect();
    }, [loadVideoIframe]);

    useEffect(() => {
        const hashToId = {
            '#home-page': 'home-page',
            '#video-page': 'video-page',
            '#services-page': 'services-page',
            '#about-page': 'about-page',
            '#footer-page': 'footer-page',
        };

        const targetId = hashToId[location.hash];
        if (!targetId) return;

        if (targetId !== 'home-page') {
            window.requestAnimationFrame(() => {
                setLoadVideoIframe(true);
                setAnimationProgress(1);
            });
            animationProgressRef.current = 1;
        }

        const target = document.getElementById(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [location.hash]);

    return (
        <div className={`home-layout home-layout--single-peel${perf.lite ? ' home-layout--lite' : ''}`}>
            <div className="peel-scroll-region">
                <div className="peel-stage">
                    <section className="peel-page peel-page--single hero-page" id="home-page" ref={heroPageRef}>
                        <div className="content welcome-text">
                            <span className="eyebrow">HYPETYPE - Brand Growth Studio</span>
                            <h1 className="brand-title">Visibility without direction is noise.</h1>
                            <div className="hero-description-container">
                                <p className="meta-description">
                                    <span className="strategy-tag">We build brands that scale.</span>
                                </p>
                                <p className="sub-description">
                                    Driven by data, creativity, and performance marketing. Scalable strategies for growing brands, powerful results without enterprise-level costs.
                                </p>
                            </div>
                            <div className="slide-to-unlock" id="sliderContainer">
                                <div className="thumb" id="thumb" style={{ left: '6px' }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2b3a55" strokeWidth="3" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </div>
                                {sliderThankYou ? (
                                    <span className="slide-thankyou" aria-live="polite">
                                        <span className="slide-thankyou-tick" aria-hidden="true">✓</span>
                                        Thank You
                                    </span>
                                ) : (
                                    <span className="text">Let&apos;s Talk</span>
                                )}
                            </div>
                        </div>
                    </section>

                    <section className="peel-page home-flow-page video-page" id="video-page" ref={videoSectionRef}>
                        <div className="content video-fullscreen-layout">
                            <div className="video-container video-fullscreen-frame">
                                {loadVideoIframe ? (
                                    <iframe
                                        title="HypeType Video"
                                        src="https://www.youtube.com/embed/23g5HBOg3Ic"
                                        allow="autoplay; encrypted-media; fullscreen"
                                        loading="lazy"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                        frameBorder="0"
                                        allowFullScreen
                                    />
                                ) : (
                                    <div className="video-embed-placeholder" aria-hidden="true">
                                        <span className="video-embed-placeholder-label">Video loads when you open this slide</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>

                    <section className="peel-page home-flow-page services-page" id="services-page">
                        <div className="content services-content">
                            <span className="eyebrow">What We Do</span>
                            <h2 className="brand-title">Full-Stack <span>Growth</span></h2>
                            <p className="sub-description">
                                From iconic branding to performance-led marketing, we provide the tools your business needs to dominate the market.
                            </p>
                            <div className="pyramid-grid">
                                <div className="card-row top-row">
                                    <Link to="/Services/Branding" className="service-card"><div className="service-icon" aria-hidden="true">🎯</div><h3 className="card-title">Branding</h3><span className="learn-more-btn">Learn More</span></Link>
                                    <Link to="/Services/Social_Media" className="service-card"><div className="service-icon" aria-hidden="true">📱</div><h3 className="card-title">Social Media</h3><span className="learn-more-btn">Learn More</span></Link>
                                    <Link to="/Services/Performance_Marketting" className="service-card"><div className="service-icon" aria-hidden="true">📈</div><h3 className="card-title">Performance Marketing</h3><span className="learn-more-btn">Learn More</span></Link>
                                    <Link to="/Services/Commercial&Ads" className="service-card"><div className="service-icon" aria-hidden="true">🎬</div><h3 className="card-title">Commercials And Ads</h3><span className="learn-more-btn">Learn More</span></Link>
                                </div>
                                <div className="card-row bottom-row">
                                    <Link to="/Services/Web&AppsDevelopment" className="service-card"><div className="service-icon" aria-hidden="true">💻</div><h3 className="card-title">Website & Mobile Apps Development</h3><span className="learn-more-btn">Learn More</span></Link>
                                    <Link to="/Services/Artist_Management" className="service-card"><div className="service-icon" aria-hidden="true">🎤</div><h3 className="card-title">Artist Management</h3><span className="learn-more-btn">Learn More</span></Link>
                                    <Link to="/Services/Event_Management" className="service-card"><div className="service-icon" aria-hidden="true">🎭</div><h3 className="card-title">Event Management</h3><span className="learn-more-btn">Learn More</span></Link>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="peel-page home-flow-page about-stack-page" id="about-page">
                        <div className="content about-content about-stack-content">
                            <div className="about-main">
                                <span className="about-badge">About HYPETYPE</span>
                                <h2 className="brand-title">Where Performance <span>Drives Growth</span></h2>
                                <p className="sub-description vision-text">
                                    Our vision is to become a full-spectrum creative and growth partner for brands that want direction, clarity, and measurable momentum.
                                </p>
                                <div className="footer-cta-wrapper">
                                    <Link to="/About_Us" className="main-cta">Start Your Project</Link>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="peel-page home-flow-page about-stack-page" id="footer-page">
                        <div className="content about-content about-stack-content services-content">
                            <Footer isHome style={{ marginTop: 0, overflow: 'visible' }} />
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Home;
