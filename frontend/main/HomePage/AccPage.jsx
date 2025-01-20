import { useUser } from "../src/UserContext";
import { useEffect, useState } from 'react';
import axios from 'axios';
import './home.css';
import { FaEdit, FaSignOutAlt } from 'react-icons/fa';
import ThemeToggle from './Component/ThemeToggle';
import Sidebar from './Component/Sidebar';
import BackgroundShapes from './Component/BackgroundShapes';

function Acc() {
    const [theme, setTheme] = useState('light');
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
    const { user, setUser } = useUser(); 
    const [userData, setUserData] = useState({
        Username: '',
        Email: '',
        Password: '',
        ProfilePicture: ''
    });

    const [isEditing, setIsEditing] = useState(false); // To toggle edit mode
    const [updatedData, setUpdatedData] = useState({ ...userData });

    // Fetch user data
    useEffect(() => {
        axios.get('http://localhost:8081/?value=a')
            .then(res => {
                console.log(res);
                setUserData(res.data[0]);
                setUpdatedData(res.data[0]); // Initialize updatedData with fetched data
            })
            .catch(err => console.log(err));
    }, []);

    const handleEditClick = () => {
        setIsEditing(true); // Enable edit mode
    };

    const handleLogoutClick = () => {
        setUser('Guest');
        console.log('Logout clicked');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSaveClick = () => {
        // Save updated data (e.g., call an API to update the data)
        console.log('Updated Data:', updatedData);
        setIsEditing(false); // Exit edit mode
        const email=userData.Email;
        setUserData(updatedData);
        axios.put(`http://localhost:8081/update?value=${email}`,userData)
                .then(res => {
                    console.log("Response:", res);
                    console.log("Username:", userData.Username);
                    if (res.data.message) 
                    {
                        alert(res.data.message); 
                    }
                    else{
                        setUser(userData.Username);
                    }
                })
                .catch(err => {
                    console.error("Error during Axios request:", err);
                }); // Save the updated data to userData
    };

    const handleCancelClick = () => {
        setIsEditing(false); // Exit edit mode without saving
        setUpdatedData(userData); // Revert to original userData
    };

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
      };
    
      const toggleSidebar = () => {
        setIsSidebarExpanded(prev => !prev);
      };
    
    return (
        <div className="body-dup2">
                        <BackgroundShapes />
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <Sidebar isExpanded={isSidebarExpanded} toggleSidebar={toggleSidebar} />
        <div className="user-details-container">

                    
            {/* Profile Picture */}
            <img
                className="profile-pic"
                src={updatedData.ProfilePicture || '../public/user.png'}
                alt="User Profile"
            />

            <h2>User Details</h2>
            <p>
                <span className="detail-label">Username:</span>
                {isEditing ? (
                    <input
                        type="text"
                        name="Username"
                        value={updatedData.Username}
                        onChange={handleInputChange}
                    />
                ) : (
                    <span className="detail-value">{updatedData.Username}</span>
                )}
            </p>
            <p>
                <span className="detail-label">Email:</span>
                
                    <span className="detail-value">{updatedData.Email}</span>
            </p>
            <p>
                <span className="detail-label">Password:</span>
                {isEditing ? (
                    <input
                        type="password"
                        name="Password"
                        value={updatedData.Password}
                        onChange={handleInputChange}
                    />
                ) : (
                    <span className="detail-value">{updatedData.Password}</span>
                )}
            </p>

            {/* Button container */}
            <div className="button-container">
                {isEditing ? (
                    <>
                        <button className="button save-btn" onClick={handleSaveClick}>
                            Save
                        </button>
                        <button className="button cancel-btn" onClick={handleCancelClick}>
                            Cancel
                        </button>
                    </>
                ) : (
                    <button className="button edit-btn" onClick={handleEditClick}>
                        <FaEdit /> Edit
                    </button>
                )}
                <button className="button logout-btn" onClick={handleLogoutClick}>
                    <FaSignOutAlt /> Logout
                </button>
            </div>
        </div>
        </div>
    );
}

export default Acc;
