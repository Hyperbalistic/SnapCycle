import React from 'react';
import './About.css';

export default function About() {
    return (
        <div className="about-container">
            <div className="decorative-circles">
                <div className="circle circle-1"></div>
                <div className="circle circle-2"></div>
                <div className="circle circle-3"></div>
            </div>
            
            <h1>About SnapCycle</h1>
            <p className="about-intro">Making recycling easier and more accessible than ever before with the power of AI</p>
            
            <div className="about-box slide-right">
                <h2>Our Mission</h2>
                <p>We aim to promote reuse and recycling by making it easy to identify and recycle items</p>
            </div>

            <div className="about-box slide-left">
                <h2>How We Help</h2>
                <p>We provide a platform to teach users easy and efficient ways to properly recycle items</p>
            </div>

            <div className="about-box slide-right">
                <h2>Our Impact</h2>
                <p>Making recycling knowledge more accessible, we're helping to create a cleaner, more sustainable future for our planet</p>
            </div>

            <div className="about-box slide-left">
                <h2>Technology</h2>
                <p>The AI recognition system is trained on thousands of items to provide accurate recycling guidance</p>
            </div>
        </div>
    );
} 