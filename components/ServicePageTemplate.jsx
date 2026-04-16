import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist';
import pdfWorkerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import './ServiceTemplate.css';

GlobalWorkerOptions.workerSrc = pdfWorkerSrc;

const PdfPreviewCard = ({ pdf, onOpen, onDownload, buttonLabel = "Download Brochure", showPreviewButton = true }) => {
    return (
        <article className="pdf-card">
            <button
                type="button"
                className="pdf-preview-button"
                onClick={() => onOpen(pdf)}
                aria-label={`Preview ${pdf.label}`}
            >
                {pdf.previewUrl ? (
                    <img src={pdf.previewUrl} alt={`${pdf.label} first page preview`} className="pdf-preview-image" />
                ) : <div className="pdf-preview-fallback">Preview unavailable</div>}
            </button>
            <h3 className="pdf-card-title">{pdf.label || 'Project Brochure'}</h3>
            <div className="pdf-card-actions">
                {showPreviewButton && (
                    <button
                        type="button"
                        className="pdf-btn pdf-btn-view"
                        onClick={() => onOpen(pdf)}
                    >
                        See Our Brochure
                    </button>
                )}
                <button
                    type="button"
                    className="pdf-btn pdf-btn-download"
                    onClick={() => onDownload(pdf)}
                >
                    {buttonLabel}
                </button>
            </div>
        </article>
    );
};

const ServicePageTemplate = ({
    accent,
    accentEnd,
    accentSoft,
    accentShadow,
    eyebrow = 'By HYPETYPE Studio',
    heroTitle,
    heroDescription,
    heroCtaLabel = 'Start Your Brand Journey',
    introTitle,
    introParagraphs = [],
    benefitsTitle,
    benefitsIntro,
    benefits = [],
    servicesTitle,
    services = [],
    workVideos = [],
    workImages = [],
    workPdfs = [],
    pdfButtonLabel = "Download Brochure",
    pdfShowPreviewButton = true,
    ctaTitle,
    ctaDescription,
    ctaLabel = 'Book a Free Strategy Call',
}) => {
    const theme = {
        '--service-accent': accent,
        '--service-accent-end': accentEnd,
        '--service-accent-soft': accentSoft,
        '--service-accent-shadow': accentShadow,
    };

    const logoGridRef = useRef(null);

    const scrollLogoGrid = (direction) => {
        if (logoGridRef.current) {
            const scrollAmount = logoGridRef.current.clientWidth;
            logoGridRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };

    const [selectedImg, setSelectedImg] = useState(null);
    const [selectedPdf, setSelectedPdf] = useState(null);
    const [pdfViewerImage, setPdfViewerImage] = useState('');
    const [pdfViewerPage, setPdfViewerPage] = useState(1);
    const [pdfViewerTotalPages, setPdfViewerTotalPages] = useState(1);
    const [pdfViewerLoading, setPdfViewerLoading] = useState(false);
    const [pdfViewerError, setPdfViewerError] = useState('');

    useEffect(() => {
        let isCancelled = false;

        const renderPdfPage = async () => {
            if (!selectedPdf) {
                setPdfViewerImage('');
                setPdfViewerError('');
                setPdfViewerPage(1);
                setPdfViewerTotalPages(1);
                return;
            }

            try {
                setPdfViewerLoading(true);
                setPdfViewerError('');
                const response = await fetch(selectedPdf.url, { cache: 'no-store' });
                if (!response.ok) {
                    throw new Error('Unable to fetch brochure file');
                }
                const pdfBuffer = await response.arrayBuffer();
                const pdfData = new Uint8Array(pdfBuffer);
                const doc = await getDocument({
                    data: pdfData,
                    disableWorker: true,
                    useWorkerFetch: false,
                }).promise;
                const totalPages = doc.numPages || 1;
                const safePage = Math.min(Math.max(pdfViewerPage, 1), totalPages);
                const page = await doc.getPage(safePage);
                const viewport = page.getViewport({ scale: 1.3 });
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                if (!ctx) {
                    throw new Error('Canvas context unavailable');
                }

                canvas.width = Math.floor(viewport.width);
                canvas.height = Math.floor(viewport.height);

                await page.render({
                    canvasContext: ctx,
                    viewport,
                }).promise;

                if (!isCancelled) {
                    setPdfViewerImage(canvas.toDataURL('image/jpeg', 0.95));
                    setPdfViewerTotalPages(totalPages);
                    if (safePage !== pdfViewerPage) {
                        setPdfViewerPage(safePage);
                    }
                }

                await doc.destroy();
            } catch (error) {
                console.error('Brochure render failed:', error);
                if (!isCancelled) {
                    setPdfViewerError('Unable to load brochure pages.');
                    setPdfViewerImage('');
                }
            } finally {
                if (!isCancelled) {
                    setPdfViewerLoading(false);
                }
            }
        };

        renderPdfPage();

        return () => {
            isCancelled = true;
        };
    }, [selectedPdf, pdfViewerPage]);

    const closePdfViewer = () => {
        setSelectedPdf(null);
        setPdfViewerImage('');
        setPdfViewerError('');
        setPdfViewerPage(1);
        setPdfViewerTotalPages(1);
        setPdfViewerLoading(false);
    };

    const openPdfViewer = (pdf) => {
        setSelectedPdf(pdf);
        setPdfViewerPage(1);
    };

    const downloadBrochure = (pdf) => {
        fetch(pdf.url)
            .then((response) => response.blob())
            .then((blob) => {
                const blobUrl = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = blobUrl;
                link.download = pdf.url.split('/').pop() || 'brochure.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(blobUrl);
            })
            .catch(() => {
                window.location.href = pdf.url;
            });
    };

    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                setSelectedImg(null);
                setSelectedPdf(null);
            }
        };

        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, []);

    return (
        <div className="branding-page" style={theme}>
            <section className="branding-hero">
                <div className="branding-shell branding-hero-shell">
                    <p className="branding-eyebrow">{eyebrow}</p>
                    <h1 className="branding-hero-title">{heroTitle}</h1>
                    <p className="branding-hero-description">{heroDescription}</p>
                    <Link to="/contact-us" className="branding-primary-cta">{heroCtaLabel}</Link>
                </div>
            </section>

            {introParagraphs.length > 0 && (
                <section className="branding-section branding-muted-section">
                    <div className="branding-shell branding-narrow-shell">
                        <h2 className="branding-section-title">{introTitle}</h2>
                        <div className="branding-section-copy branding-section-copy-stack">
                            {introParagraphs.map((paragraph) => (
                                <p key={paragraph}>{paragraph}</p>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <section className="branding-section branding-white-section">
                <div className="branding-shell branding-narrow-shell">
                    <h2 className="branding-section-title">{benefitsTitle}</h2>
                    <p className="branding-section-copy">{benefitsIntro}</p>
                    <div className="branding-benefits-grid">
                        {benefits.map((item) => (
                            <div key={item} className="branding-benefit-item">
                                <span className="branding-benefit-icon" aria-hidden="true">✓</span>
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="branding-section branding-muted-section branding-services-section">
                <div className="branding-shell">
                    <h2 className="branding-section-title branding-services-title">{servicesTitle}</h2>
                    <div className="branding-services-grid">
                        {services.map((service) => (
                            <article key={service.title} className="branding-service-card">
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {(workVideos.length > 0 || workImages.length > 0) && (
                <section className="branding-section branding-white-section work-section-container" style={theme}>
                    <div className="branding-shell">
                        
                        {/* 1. VIDEO SECTION (Only shows if videos exist) */}
                        {workVideos.length > 0 && (
                            <>
                                <h2 className="branding-section-title work-title">Our Work</h2>
                                <div className="media-flex-grid">
                                    {workVideos.map((videoSrc, index) => (
                                        <div key={`vid-${index}`} className="media-card">
                                            <video autoPlay muted loop playsInline>
                                                <source src={videoSrc} type="video/mp4" />
                                            </video>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        {/* 2. LOGO IMAGE GRID SECTION (Only shows if images exist) */}
                        {workImages.length > 0 && (
                            <div className="logo-image-wrapper" style={{ marginTop: workVideos.length > 0 ? '80px' : '0' }}>
                                <h2 className="branding-section-title work-title">Our Logo Work</h2>
                                <div className="carousel-shell">
                                    <button type="button" className="carousel-arrow" onClick={() => scrollLogoGrid('left')} aria-label="Scroll left">&#8592;</button>
                                    <div className="work-image-grid" ref={logoGridRef}>
                                        {workImages.map((imgSrc, index) => (
                                        <div
                                            key={`logo-${index}`}
                                            className="logo-card"
                                            onClick={() => setSelectedImg(imgSrc)}
                                            role="button"
                                            tabIndex={0}
                                            onKeyDown={(event) => {
                                                if (event.key === 'Enter' || event.key === ' ') {
                                                    event.preventDefault();
                                                    setSelectedImg(imgSrc);
                                                }
                                            }}
                                        >
                                            <img src={imgSrc} alt="Logo Design" />
                                        </div>
                                    ))}
                                    </div>
                                    <button type="button" className="carousel-arrow" onClick={() => scrollLogoGrid('right')} aria-label="Scroll right">&#8594;</button>
                                </div>
                            </div>
                        )}

                    </div>
                </section>
                        
            )}

            {selectedImg && (
                <div className="logo-popup-overlay" onClick={() => setSelectedImg(null)}>
                    <div className="logo-popup-content" onClick={(event) => event.stopPropagation()}>
                        <button
                            type="button"
                            className="close-btn"
                            aria-label="Close image preview"
                            onClick={() => setSelectedImg(null)}
                        >
                            ×
                        </button>
                        <img src={selectedImg} alt="Enlarged logo preview" />
                    </div>
                </div>
            )}

            {workPdfs.length > 0 && (
                <section className="branding-section branding-muted-section work-section-container brochure-section">
                    <div className="branding-shell">
                        <h2 className="branding-section-title work-title">Brochures</h2>
                        <div className="pdf-grid">
                            {workPdfs.map((pdf) => (
                                <PdfPreviewCard key={pdf.url} pdf={pdf} onOpen={openPdfViewer} onDownload={downloadBrochure} buttonLabel={pdfButtonLabel} showPreviewButton={pdfShowPreviewButton} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {selectedPdf && (
                <div className="logo-popup-overlay pdf-popup-overlay" onClick={closePdfViewer}>
                    <div className="pdf-popup-content" onClick={(event) => event.stopPropagation()}>
                        <button
                            type="button"
                            className="close-btn"
                            aria-label="Close brochure preview"
                            onClick={closePdfViewer}
                        >
                            ×
                        </button>
                        <h3 className="pdf-popup-title">{selectedPdf.label || 'Brochure Preview'}</h3>
                        <div className="pdf-viewer-toolbar">
                            <button
                                type="button"
                                className="pdf-btn pdf-btn-download"
                                disabled={pdfViewerLoading || pdfViewerPage <= 1}
                                onClick={() => setPdfViewerPage((page) => Math.max(1, page - 1))}
                            >
                                Prev
                            </button>
                            <span className="pdf-page-indicator">
                                Page {pdfViewerPage} of {pdfViewerTotalPages}
                            </span>
                            <button
                                type="button"
                                className="pdf-btn pdf-btn-download"
                                disabled={pdfViewerLoading || pdfViewerPage >= pdfViewerTotalPages}
                                onClick={() => setPdfViewerPage((page) => Math.min(pdfViewerTotalPages, page + 1))}
                            >
                                Next
                            </button>
                        </div>
                        <div className="pdf-popup-frame">
                            {pdfViewerLoading && <p className="pdf-popup-fallback">Loading brochure...</p>}
                            {!pdfViewerLoading && pdfViewerError && <p className="pdf-popup-fallback">{pdfViewerError}</p>}
                            {!pdfViewerLoading && !pdfViewerError && pdfViewerImage && (
                                <img
                                    src={pdfViewerImage}
                                    alt={`${selectedPdf.label || 'Brochure'} page ${pdfViewerPage}`}
                                    className="pdf-popup-image"
                                />
                            )}
                        </div>
                        <div className="pdf-popup-actions">
                            {pdfViewerError && (
                                <button
                                    type="button"
                                    className="pdf-btn pdf-btn-view"
                                    onClick={() => window.open(selectedPdf.url, '_blank', 'noopener,noreferrer')}
                                >
                                    Open File
                                </button>
                            )}
                            <button type="button" className="pdf-btn pdf-btn-download" onClick={() => downloadBrochure(selectedPdf)}>
                                Download Brochure
                            </button>
                        </div>
                    </div>
                </div>
            )}
            

            <section className="branding-cta-band">
                <div className="branding-shell branding-cta-shell">
                    <h2>{ctaTitle}</h2>
                    <p>{ctaDescription}</p>
                    <Link to="/contact-us" className="branding-primary-cta branding-band-cta">{ctaLabel}</Link>
                </div>
            </section>
        </div>
    );
};

export default ServicePageTemplate;
