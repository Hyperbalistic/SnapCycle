import React, { useState } from "react";

export default function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <nav className="nav">
            <a href="/" className="site-title">
                SnapCycle
            </a>
            
            <ul className={menuOpen ? "nav-links open" : "nav-links"}>
                <li>
                    <a href="/about">About</a>
                </li>
                <li>
                    <a href="/howitworks">How It Works</a>
                </li>
                <li>
                    <a href="/pastitems">Past Items</a>
                </li>
                <li>
                    <a href="/contactus">Contact Us</a>
                </li>
            </ul>
        </nav>
    );
}