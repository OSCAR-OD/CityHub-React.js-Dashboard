import {useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTheme, selectCurrentTheme } from './authSlice';

function ThemeProvider({ children }) {
  const mode = useSelector(selectCurrentTheme);
  const dispatch = useDispatch();
  const [loadedTheme, setLoadedTheme] = useState(false);

useEffect(() => {
  const savedMode = localStorage.getItem('themeMode');
  if (savedMode) {
    dispatch(setTheme(savedMode));
  }
}, [dispatch]);

useEffect(() => {
  if (!loadedTheme) {
    loadTheme();
    setLoadedTheme(true);
  }
  localStorage.setItem('themeMode', mode);
}, [mode, loadedTheme]);

function loadTheme() {
  const theme = localStorage.getItem('themeMode') || 'light';
  document.body.classList.add(`theme-${theme}`);
}

  return (
    <div >
     {children}
    </div>
  );
}

export default ThemeProvider;

