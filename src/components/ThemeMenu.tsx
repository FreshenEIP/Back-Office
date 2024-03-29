import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import '../assets/css/thememenu.css';
import themeAction from '../redux/actions/themeActions';
import React from 'react';

const mode_settings = [
  {
    id: 'light',
    name: 'Light',
    background: 'light-background',
    class: 'theme-mode-light',
  },
  {
    id: 'dark',
    name: 'Dark',
    background: 'dark-background',
    class: 'theme-mode-dark',
  },
];

const color_settings = [
  {
    id: 'blue',
    name: 'Blue',
    background: 'blue-color',
    class: 'theme-color-blue',
  },
  {
    id: 'red',
    name: 'Red',
    background: 'red-color',
    class: 'theme-color-red',
  },
  {
    id: 'cyan',
    name: 'Cyan',
    background: 'cyan-color',
    class: 'theme-color-cyan',
  },
  {
    id: 'green',
    name: 'Green',
    background: 'green-color',
    class: 'theme-color-green',
  },
  {
    id: 'orange',
    name: 'Orange',
    background: 'orange-color',
    class: 'theme-color-orange',
  },
];

const clickOutsideRef = (content_ref, toggle_ref) => {
  document.addEventListener('mousedown', (e) => {
    if (toggle_ref.current && toggle_ref.current.contains(e.target)) {
      content_ref.current.classList.toggle('active');
    } else {
      if (content_ref.current && !content_ref.current.contains(e.target)) {
        content_ref.current.classList.remove('active');
      }
    }
  });
};

const ThemeMenu = () => {
  const [currMode, setCurrMode] = useState('light');
  const [currColor, setCurrColor] = useState('blue');
  const menu_ref = useRef(null);
  const menu_toggle_ref = useRef(null);
  const dispatch = useDispatch();

  clickOutsideRef(menu_ref, menu_toggle_ref);

  const setActiveMenu = () => {
    menu_ref.current.classList.add('active');
  };
  const closeMenu = () => {
    menu_ref.current.classList.remove('active');
  };
  const setMode = (mode) => {
    setCurrMode(mode.id);
    localStorage.setItem('themeMode', mode.class);
    dispatch(themeAction.setMode(mode.class));
  };
  const setColor = (color) => {
    setCurrColor(color.id);
    localStorage.setItem('themeColor', color.class);
    dispatch(themeAction.setColor(color.class));
  };

  useEffect(() => {
    const themeClass = mode_settings.find(
      (el) => el.class === localStorage.getItem('themeMode'),
    );
    const colorClass = color_settings.find(
      (el) => el.class === localStorage.getItem('themeColor'),
    );

    if (themeClass !== undefined) setCurrMode(themeClass.id);
    if (colorClass !== undefined) setCurrColor(colorClass.id);
  }, []);

  return (
    <div>
      <button
        ref={menu_toggle_ref}
        className='dropdown__toggle'
        onClick={() => setActiveMenu()}
      >
        <i className='bx bx-palette' />
      </button>
      <div ref={menu_ref} className='theme-menu'>
        <h4>Theme settings</h4>
        <button className='theme-menu__close' onClick={() => closeMenu()}>
          <i className='bx bx-x' />
        </button>
        <div className='theme-menu__select'>
          <span>Choose mode</span>
          <ul className='mode-list'>
            {mode_settings.map((item, index) => (
              <li key={index} onClick={() => setMode(item)}>
                <div
                  className={`mode-list__color ${item.background} ${
                    item.id === currMode ? 'active' : ''
                  }`}
                >
                  <i className='bx bx-check' />
                </div>
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className='theme-menu__select'>
          <span>Choose color</span>
          <ul className='mode-list'>
            {color_settings.map((item, index) => (
              <li key={index} onClick={() => setColor(item)}>
                <div
                  className={`mode-list__color ${item.background} ${
                    item.id === currColor ? 'active' : ''
                  }`}
                >
                  <i className='bx bx-check' />
                </div>
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ThemeMenu;
