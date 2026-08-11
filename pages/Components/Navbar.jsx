
// Navbar.js
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Navbar = ({ handleToggleMode, mode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
    // console.log(isOpen)
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 991);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
<nav className={`navbar navbar-expand-lg navbar-${mode} bg-${mode}`}>

      <div className="container-fluid">
        <Link href="/" className="navbar-brand mx-2">
        TODOs List
        </Link>
        {isSmallScreen && (
  <div
  className={`navbar-toggle mx-2 ${isOpen ? 'open' : ''}`}
  onClick={toggleNavbar}
  style={{ cursor: 'pointer' }}
>
  <div
    className="bar"
    style={{
      backgroundColor: mode === 'light' ? 'black' : 'white',
      cursor: 'pointer',
    }}
  ></div>

  <div
    className="bar"
    style={{
      backgroundColor: mode === 'light' ? 'black' : 'white',
      cursor: 'pointer',
    }}
  ></div>
</div>
        )}
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-2">
            <li className="nav-item">
              <Link href="/" className="nav-link active" aria-current="page">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/Components/About" className="nav-link active">
                About
              </Link>
            </li>
          </ul>

          <div className="form-check form-switch mx-2">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              onChange={handleToggleMode}
              defaultChecked={mode === 'dark'}
            />
            <label
              className={`form-check-label text-${mode === 'light' ? 'dark' : 'light'}`}
              htmlFor="flexSwitchCheckDefault"
            >
              {mode === 'dark' ? 'Enable Light Mode' : 'Enable Dark Mode'}
            </label>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
