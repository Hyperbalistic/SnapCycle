import React from 'react';
import './HowItWorks.css';

export default function HowItWorks() {
    return (
        <div className="container">
            <h1>How to use SnapCycle</h1>
            <p></p>
            
            <div className="box">
                <h2>Step 1</h2>
                <p>Upload or take a photo of the item you want to recycle</p>
            </div>

            <div className="box">
                <h2>Step 2</h2>
                <p>Once the photo is uploaded, click the "SnapCycle!" button</p>
            </div>

            <div className="box">
                <h2>Step 3</h2>
                <p>Our AI will analyze the photo and determine the item's material</p>
            </div>

            <div className="box">
                <h2>Step 4</h2>
                <p>Read the instructions on how to recycle the item</p>
            </div>

            <div className="box">
                <h2>Step 5</h2>
                <p>Dispose of the item in the correct way</p>
            </div>
        </div>
    );
} 