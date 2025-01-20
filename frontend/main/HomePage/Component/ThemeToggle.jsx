import  { useRef } from 'react';

function ThemeToggle({ theme, toggleTheme }) {
  const buttonRef = useRef(null);
  const isRotating = useRef(false);

  const handleClick = () => {
    if (isRotating.current) return;
    
    isRotating.current = true;
    toggleTheme();
    
    buttonRef.current.style.transform = 'rotate(360deg)';
    setTimeout(() => {
      buttonRef.current.style.transform = '';
      isRotating.current = false;
    }, 300);
  };

  return (
    <button 
      ref={buttonRef}
      className="theme-toggle" 
      onClick={handleClick}
    >
      <i className={`fas ${theme === 'dark' ? 'fa-moon' : 'fa-sun'}`}></i>
    </button>
  );
}

export default ThemeToggle;
