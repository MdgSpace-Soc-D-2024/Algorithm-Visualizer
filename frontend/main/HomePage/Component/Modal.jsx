import {useNavigate} from 'react-router-dom';

function Modal({ isOpen, onClose, algorithm }) {
  const navigate=useNavigate();
  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <img 
          className="modal-image" 
          src="/api/placeholder/740/414"
          alt="Algorithm Visualization" 
        />
        <h2 className="modal-title">{algorithm?.title}</h2>
        <p className="modal-description">{algorithm?.description}</p>
        <button 
          className="learn-more-btn"
          onClick={() => window.open(algorithm?.learnMoreUrl, '_blank')}
        >
          Learn More
        </button>
        <button  className="learn-more-btn"
          onClick={() => navigate(algorithm?.navlink)}>
          Visuaize
        </button>
      </div>
    </div>
  );
}

export default Modal;