import React from 'react';
import ServicePageTemplate from '../components/ServicePageTemplate';
import brandGuidePdf from '../assets/brochures/brand-guide-holistic-copy.pdf';
import brandingGuidePdf from '../assets/brochures/branding-guide.pdf';
import aggarwalPdf from '../assets/brochures/aggarwal-2025.pdf';
import brandGuidePreview from '../assets/brochures/previews/brand-guide-holistic-copy.jpg';
import brandingGuidePreview from '../assets/brochures/previews/branding-guide.jpg';
import aggarwalPreview from '../assets/brochures/previews/aggarwal-2025.jpg';

const logoIntro = [
    'A logo is not just a symbol. It is the visual shortcut people use to remember your brand, trust your offer, and recognize your presence instantly across every touchpoint.',
    'Our approach to logo design combines brand strategy, distinctive visual thinking, and practical application, so your identity works beautifully on social media, packaging, presentations, websites, and beyond.',
];

const logoBenefits = [
    'Distinct logo systems crafted for stronger brand recall',
    'Visual identity thinking rooted in positioning, not decoration',
    'Scalable logo usage across digital, print, and packaging',
    'Sharper first impressions through form, typography, and balance',
];

const logoServices = [
    {
        title: 'Primary Logo Creation',
        description: 'Develop a signature logo mark that reflects your brand personality and gives your business a clear visual identity.',
    },
    {
        title: 'Adaptive Logo Variations',
        description: 'Build alternate logo versions, icons, and simplified lockups that stay consistent across every digital and print format.',
    },
    {
        title: 'Brand Mark Direction',
        description: 'Shape the surrounding visual language so the logo feels premium, cohesive, and strategically aligned with your brand.',
    },
];

const Logo = () => {
    return (
        <ServicePageTemplate
            accent="#138d90"
            accentEnd="#0c6e70"
            accentSoft="#1fb2b5"
            accentShadow="rgba(10, 95, 96, 0.18)"
            heroTitle="Logo Design That Builds Instant Recognition"
            heroDescription="Your logo should do more than look attractive. It should make your brand feel memorable, trustworthy, and distinctive from the very first impression."
            introTitle="Why a Strong Logo Matters"
            introParagraphs={logoIntro}
            benefitsTitle="Why Strong Logo Design Matters"
            benefitsIntro="A logo becomes the anchor of your entire brand system. When it is clear, strategic, and versatile, it helps every other touchpoint feel stronger."
            benefits={logoBenefits}
            servicesTitle="Our Logo Design Services"
            services={logoServices}
            workImages={['/images/logo-1.jpeg', '/images/logo-2.jpeg', '/images/logo-3.jpeg', '/images/logo-4.jpg', '/images/logo-5.png']}
            workPdfs={[
                { label: 'Brand Guide Holistic', url: brandGuidePdf, previewUrl: brandGuidePreview },
                { label: 'Branding Guide', url: brandingGuidePdf, previewUrl: brandingGuidePreview },
                { label: 'Aggarwal 2025', url: aggarwalPdf, previewUrl: aggarwalPreview },
            ]}
            ctaTitle="Ready to Build a Logo People Remember?"
            ctaDescription="Let's create a logo identity that feels sharp, premium, and ready to scale with your brand."
        />
    );
};

export default Logo;
