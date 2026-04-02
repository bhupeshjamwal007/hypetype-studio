import React from 'react';
import ServicePageTemplate from '../components/ServicePageTemplate';

const adBenefits = [
    'End-to-end commercial ad production from concept to execution',
    'Scriptwriting and creative direction tailored to your brand',
    'High-quality video production for digital and TV campaigns',
    'Performance-driven ad creatives optimized for conversions',
    'Short-form content for social media and paid ads',
    'Post-production, editing, and motion graphics',
];

const adServices = [
    {
        title: 'Commercial Film Production',
        description: 'Create high-impact ad films that combine storytelling, visuals, and strategy to capture attention fast.',
    },
    {
        title: 'Paid Ad Creative Systems',
        description: 'Develop conversion-focused ad creatives designed for digital campaigns across social, video, and performance channels.',
    },
    {
        title: 'Editing & Motion Graphics',
        description: 'Polish every campaign with sharp edits, motion design, and post-production built for modern brand storytelling.',
    },
];

const CommercialAds = () => {
    return (
        <ServicePageTemplate
            accent="#d85656"
            accentEnd="#b63c3c"
            accentSoft="#ea6a6a"
            accentShadow="rgba(144, 36, 36, 0.18)"
            heroTitle="High-Impact Commercials That Drive Results"
            heroDescription="We create powerful ad films and commercial content that capture attention, tell compelling stories, and convert viewers into customers across digital and traditional platforms."
            benefitsTitle="What You Get with Our Ad Production"
            benefitsIntro="Bring your brand to life with high-impact visuals. Our Ad Production delivers creative concepts, professional-quality content, and compelling storytelling designed to capture attention, engage your audience, and drive real results."
            benefits={adBenefits}
            servicesTitle="Our Commercial & Ads Services"
            services={adServices}
            ctaTitle="Ready to Create Commercials That Convert?"
            ctaDescription="Let's produce ad content that grabs attention, strengthens your brand, and moves your audience to act."
        />
    );
};

export default CommercialAds;
