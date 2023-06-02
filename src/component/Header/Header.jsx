import React, { useEffect, useRef } from 'react';
import HStyle from "./Header.module.css";

const Header = ({ onHeaderHeight }) => {
  const headerRef = useRef(null);

  useEffect(() => {
    if (headerRef.current) {
      const height = headerRef.current.clientHeight;
      onHeaderHeight(height);
    }
  }, [onHeaderHeight]);

  return (
    <header className={HStyle.header} ref={headerRef}>
      header
    </header>
  );
};

export default Header;
