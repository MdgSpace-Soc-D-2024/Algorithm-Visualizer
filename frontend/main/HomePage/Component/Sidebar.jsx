import {useNavigate} from 'react-router-dom';


function Sidebar({ isExpanded, toggleSidebar }) {
  const navigate=useNavigate();
  const menuItems = [
    { icon: '🏠', text: 'Home' , navlink:'/home'},
    { icon: '🔍', text: 'Search' },
    { icon: '💻', text: 'Feedback',navlink:'/feedback' },
    { icon: '⚙️', text: 'Account' , navlink:'/acc'},
    { icon: '❓', text: 'Help' }
  ];

  return (
    <nav className={`sidebar ${isExpanded ? 'expanded' : ''}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 12h18M3 6h18M3 18h18"/>
        </svg>
      </button>
      {menuItems.map((item, index) => (
        <div key={index} className="menu-item" onClick={()=>{navigate(item.navlink)}}>
          <div className="menu-icon">{item.icon}</div>
          <span className="menu-text">{item.text}</span>
        </div>
      ))}
    </nav>
  );
}

export default Sidebar;