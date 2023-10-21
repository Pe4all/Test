import React, { useEffect } from 'react';

import styles from './header.module.scss';
import theme from '../../styles/theme.module.scss';

import logo from '../../images/logo.svg';
import { ReactComponent as Theme } from '../../images/theme.svg';

import AuthorsSelect from './header-buttons/AuthorsSelect';
import LocationsSelect from './header-buttons/LocationsSelect';
import InputName from './header-buttons/InputName';
import InputYear from './header-buttons/InputYear';

function Header() {
  const handleLogoClick = () => {
    window.location.reload();
  };

  const handleLogoKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      window.location.reload();
    }
  };

  useEffect(() => {
    const handleThemeToggle = () => {
      document.body.classList.toggle(`${theme.lightTheme}`);
    };

    const themeToggle = document.getElementById('switch-theme');
    if (themeToggle) {
      themeToggle.addEventListener('click', handleThemeToggle);
    }

    return () => {
      if (themeToggle) {
        themeToggle.removeEventListener('click', handleThemeToggle);
      }
    };
  }, []);

  return (
    <header>
      <div className={styles.headerTop}>
        <button
          className={styles.logoButton}
          onClick={handleLogoClick}
          onKeyDown={handleLogoKeyPress}
          type="button"
        >
          <img src={logo} alt="logo" />
        </button>
        <Theme
          id="switch-theme"
          className={styles.switchTheme}
          aria-label="switch theme"
        />
      </div>
      <div className={styles.headerButtons}>
        <InputName />
        <AuthorsSelect placeHolder="Author" />
        <LocationsSelect placeHolder="Location" />
        <InputYear placeHolder="Created" />
      </div>
    </header>
  );
}

export default Header;
