import React from 'react';
//import logo from './logo.svg';
import './App.css';
import './styles/color.css'
import './styles/general.css'

//import RButton from './components/RButton/RButton'
import RFixPhpTags from './components/RFixPhpTags/RFixPhpTags'

function App() {
  const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const themeClass = isDark || true ? 'dark-theme' : 'light-theme';
  const appClass ='App '+themeClass;
  return (
    <div className={appClass} id="App">
      <header className="App-header">
        <RFixPhpTags></RFixPhpTags>
      </header>
    </div>
  );
}

export default App;
