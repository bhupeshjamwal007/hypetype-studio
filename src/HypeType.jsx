import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Footer from './components/footer';

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const LAST_STACK_INDEX = 4;
const PAGE_ANIMATION_MS = 520;
const WHEEL_THRESHOLD = 6;
const TOUCH_THRESHOLD = 10;
const TRANSITION_COOLDOWN_MS = 700;

const Home = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [sliderThankYou, setSliderThankYou] = useState(false);
    const pageRefs = useRef([]);
    const servicesScrollRef = useRef(null);
    const footerScrollRef = useRef(null);
    const [isNarrowStack, setIsNarrowStack] = useState(() => (
        typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
    ));
    const [footerScrollMaxPx, setFooterScrollMaxPx] = useState(null);
    const progressRef = useRef(0);
    const pageIndexRef = useRef(0);
    const animatingRef = useRef(false);
    const touchStartYRef = useRef(null);
    const snapFrameRef = useRef(null);
    const wheelDeltaAccumulatorRef = useRef(0);
    const lastTransitionAtRef = useRef(0);

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
                startAutoMotion();
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

        startAutoMotion();

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
    }, [navigate]);

    useEffect(() => {
        const applyPeelEffect = (progressValue) => {
            pageRefs.current.forEach((page, index) => {
                if (!page) return;

                const localProgress = clamp(progressValue - index, 0, 1);
                const isFuturePage = index > Math.floor(progressValue + 0.001);
                const rotateX = localProgress * -88;
                const fade = localProgress < 0.82
                    ? 1
                    : clamp(1 - ((localProgress - 0.82) / 0.18), 0, 1);
                const visibility = (localProgress >= 0.995 || isFuturePage) ? 'hidden' : 'visible';
                const pointerEvents = (localProgress >= 0.995 || isFuturePage) ? 'none' : 'auto';

                page.style.setProperty('--peel-translate', '0px');
                page.style.setProperty('--peel-rotate', `${rotateX}deg`);
                page.style.setProperty('--peel-scale', '1');
                page.style.setProperty('--peel-opacity', `${fade}`);
                page.style.setProperty('--peel-visibility', visibility);
                page.style.setProperty('--page-active', pointerEvents);
            });
        };

        const cancelAnimation = () => {
            if (snapFrameRef.current) {
                window.cancelAnimationFrame(snapFrameRef.current);
                snapFrameRef.current = null;
            }
        };

        const animateToProgress = (target) => {
            cancelAnimation();
            animatingRef.current = true;
            lastTransitionAtRef.current = Date.now();

            const start = performance.now();
            const initial = progressRef.current;
            const delta = target - initial;

            if (Math.abs(delta) < 0.001) {
                progressRef.current = target;
                applyPeelEffect(target);
                animatingRef.current = false;
                return;
            }

            const step = (now) => {
                const elapsed = now - start;
                const t = clamp(elapsed / PAGE_ANIMATION_MS, 0, 1);
                const eased = 1 - Math.pow(1 - t, 3);
                const next = initial + delta * eased;

                progressRef.current = next;
                applyPeelEffect(next);

                if (t < 1) {
                    snapFrameRef.current = window.requestAnimationFrame(step);
                    return;
                }

                progressRef.current = target;
                applyPeelEffect(target);
                snapFrameRef.current = null;
                animatingRef.current = false;
            };

            snapFrameRef.current = window.requestAnimationFrame(step);
        };

        const goToNextStackPage = () => {
            if (animatingRef.current) return;
            if (pageIndexRef.current >= LAST_STACK_INDEX) {
                return;
            }

            pageIndexRef.current += 1;
            animateToProgress(pageIndexRef.current);
        };

        const goToPreviousStackPage = () => {
            if (animatingRef.current) return;
            if (window.scrollY > 0) return;
            if (pageIndexRef.current <= 0) return;

            pageIndexRef.current -= 1;
            animateToProgress(pageIndexRef.current);
        };

        const shouldHandleStackScroll = () => {
            const scrollY = window.scrollY;
            return scrollY <= 1;
        };

        const shouldAllowServicesInnerScroll = (direction) => {
            if (window.innerWidth > 768) return false;
            if (pageIndexRef.current !== 2) return false;

            const scroller = servicesScrollRef.current;
            if (!scroller) return false;

            const maxScrollTop = scroller.scrollHeight - scroller.clientHeight;
            if (maxScrollTop <= 0) return false;

            if (direction > 0) {
                return scroller.scrollTop < maxScrollTop - 1;
            }

            return scroller.scrollTop > 1;
        };

        const shouldAllowFooterInnerScroll = (direction) => {
            if (window.innerWidth > 768) return false;
            if (pageIndexRef.current !== 4) return false;

            const scroller = footerScrollRef.current;
            if (!scroller) return false;

            const maxScrollTop = scroller.scrollHeight - scroller.clientHeight;
            if (maxScrollTop <= 0) return false;

            if (direction > 0) {
                return scroller.scrollTop < maxScrollTop - 1;
            }

            return scroller.scrollTop > 1;
        };

        const isTransitionCoolingDown = () => Date.now() - lastTransitionAtRef.current < TRANSITION_COOLDOWN_MS;

        const onWheel = (event) => {
            if (!shouldHandleStackScroll()) return;
            if (shouldAllowServicesInnerScroll(Math.sign(event.deltaY || 0))) return;
            if (shouldAllowFooterInnerScroll(Math.sign(event.deltaY || 0))) return;

            event.preventDefault();
            if (animatingRef.current || isTransitionCoolingDown()) return;

            wheelDeltaAccumulatorRef.current += event.deltaY;
            if (Math.abs(wheelDeltaAccumulatorRef.current) < WHEEL_THRESHOLD) return;

            const direction = wheelDeltaAccumulatorRef.current > 0 ? 1 : -1;
            wheelDeltaAccumulatorRef.current = 0;
            if (direction > 0) {
                goToNextStackPage();
                return;
            }

            goToPreviousStackPage();
        };

        const onTouchStart = (event) => {
            touchStartYRef.current = event.touches[0]?.clientY ?? null;
        };

        const onTouchMove = (event) => {
            const touchY = event.touches[0]?.clientY;
            const startY = touchStartYRef.current;
            if (touchY == null || startY == null) return;

            const deltaY = startY - touchY;
            if (!shouldHandleStackScroll()) return;
            if (shouldAllowServicesInnerScroll(Math.sign(deltaY || 0))) return;
            if (shouldAllowFooterInnerScroll(Math.sign(deltaY || 0))) return;

            event.preventDefault();
            if (animatingRef.current || isTransitionCoolingDown()) return;
            if (Math.abs(deltaY) < TOUCH_THRESHOLD) return;

            touchStartYRef.current = touchY;
            if (deltaY > 0) {
                goToNextStackPage();
                return;
            }

            goToPreviousStackPage();
        };

        const onTouchEnd = () => {
            touchStartYRef.current = null;
        };

        applyPeelEffect(progressRef.current);
        window.addEventListener('wheel', onWheel, { passive: false });
        window.addEventListener('touchstart', onTouchStart, { passive: true });
        window.addEventListener('touchmove', onTouchMove, { passive: false });
        window.addEventListener('touchend', onTouchEnd);

        return () => {
            window.removeEventListener('wheel', onWheel);
            window.removeEventListener('touchstart', onTouchStart);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('touchend', onTouchEnd);
            cancelAnimation();
            wheelDeltaAccumulatorRef.current = 0;
        };
    }, []);

    useEffect(() => {
        const mq = window.matchMedia('(max-width: 768px)');
        const sync = () => setIsNarrowStack(mq.matches);
        sync();
        mq.addEventListener('change', sync);
        return () => mq.removeEventListener('change', sync);
    }, []);

    const footerSectionRef = useRef(null);

    const measureFooterScrollRegion = () => {
        const section = footerSectionRef.current;
        if (!section) return;
        setFooterScrollMaxPx(Math.round(section.clientHeight));
    };

    useLayoutEffect(() => {
        if (!isNarrowStack) {
            setFooterScrollMaxPx(null);
            return undefined;
        }

        measureFooterScrollRegion();
        const rafId = requestAnimationFrame(() => {
            requestAnimationFrame(measureFooterScrollRegion);
        });

        const section = footerSectionRef.current;
        const vv = window.visualViewport;

        const onVvChange = () => {
            requestAnimationFrame(measureFooterScrollRegion);
        };

        window.addEventListener('resize', onVvChange);
        window.addEventListener('orientationchange', onVvChange);
        if (vv) {
            vv.addEventListener('resize', onVvChange);
            vv.addEventListener('scroll', onVvChange);
        }

        let ro;
        if (section && typeof ResizeObserver !== 'undefined') {
            ro = new ResizeObserver(onVvChange);
            ro.observe(section);
        }

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('resize', onVvChange);
            window.removeEventListener('orientationchange', onVvChange);
            if (vv) {
                vv.removeEventListener('resize', onVvChange);
                vv.removeEventListener('scroll', onVvChange);
            }
            if (ro) ro.disconnect();
        };
    }, [isNarrowStack]);

    useEffect(() => {
        const hashToIndex = {
            '#home-page': 0,
            '#video-page': 1,
            '#services-page': 2,
            '#about-page': 3,
            '#footer-page': 4,
        };

        const targetIndex = hashToIndex[location.hash];
        if (targetIndex == null) return;

        pageIndexRef.current = targetIndex;
        progressRef.current = targetIndex;

        pageRefs.current.forEach((page, index) => {
            if (!page) return;

            const localProgress = clamp(targetIndex - index, 0, 1);
            const isFuturePage = index > targetIndex;
            const rotateX = localProgress * -88;
            const fade = localProgress < 0.82
                ? 1
                : clamp(1 - ((localProgress - 0.82) / 0.18), 0, 1);
            const visibility = (localProgress >= 0.995 || isFuturePage) ? 'hidden' : 'visible';
            const pointerEvents = (localProgress >= 0.995 || isFuturePage) ? 'none' : 'auto';

            page.style.setProperty('--peel-translate', '0px');
            page.style.setProperty('--peel-rotate', `${rotateX}deg`);
            page.style.setProperty('--peel-scale', '1');
            page.style.setProperty('--peel-opacity', `${fade}`);
            page.style.setProperty('--peel-visibility', visibility);
            page.style.setProperty('--page-active', pointerEvents);
        });

        window.scrollTo({ top: 0, behavior: 'auto' });
    }, [location.hash]);

    const registerPage = (index) => (element) => {
        pageRefs.current[index] = element;
    };

    const setFooterPageRef = (index) => (element) => {
        pageRefs.current[index] = element;
        if (index === 4) {
            footerSectionRef.current = element;
        }
    };

    const footerStackStyle = isNarrowStack
        ? {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            width: '100%',
            ...(footerScrollMaxPx != null
                ? {
                    height: `${footerScrollMaxPx}px`,
                    maxHeight: `${footerScrollMaxPx}px`,
                }
                : {
                    bottom: 0,
                }),
            minHeight: 0,
            overflowY: 'auto',
            overflowX: 'hidden',
            WebkitOverflowScrolling: 'touch',
            overscrollBehavior: 'contain',
            justifyContent: 'flex-start',
            boxSizing: 'border-box',
            touchAction: 'pan-y',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            paddingBottom: 'max(24px, env(safe-area-inset-bottom, 0px))',
        }
        : undefined;

    return (
        <div className="home-layout">
            <div className="peel-scroll-region">
                <div className="peel-stage">
                    <section className="peel-page hero-page" id="home-page" ref={registerPage(0)}>
                        <div className="content welcome-text">
                            <span className="eyebrow">HYPETYPE Studio</span>
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

                    <section className="peel-page video-page" id="video-page" ref={registerPage(1)}>
                        <div className="content video-fullscreen-layout">
                            <div className="video-container video-fullscreen-frame">
                                <iframe
                                    title="HypeType Video"
                                    src="https://www.youtube.com/embed/23g5HBOg3Ic"
                                    allow="autoplay; encrypted-media"
                                    frameBorder="0"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                    </section>

                    <section className="peel-page services-page" id="services-page" ref={registerPage(2)}>
                        <div className="content services-content" ref={servicesScrollRef}>
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

                    <section className="peel-page about-stack-page" id="about-page" ref={registerPage(3)}>
                        <div className="content about-content about-stack-content">
                            <div className="about-main">
                                <span className="about-badge">About HYPETYPE</span>
                                <h2 className="brand-title">Where Performance <span>Drives Growth</span></h2>
                                <p className="sub-description vision-text">
                                    Our vision is to become a full-spectrum creative and growth partner for brands that want direction, clarity, and measurable momentum.
                                </p>
                                <div className="footer-cta-wrapper">
                                    <Link to="/contact-us" className="main-cta">Start Your Project</Link>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="peel-page about-stack-page" id="footer-page" ref={setFooterPageRef(4)}>
                        <div
                            className="content about-content about-stack-content services-content"
                            ref={footerScrollRef}
                            style={footerStackStyle}
                        >
                            <Footer style={{ marginTop: isNarrowStack ? 30 : 0, overflow: 'visible' }} />
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Home;
