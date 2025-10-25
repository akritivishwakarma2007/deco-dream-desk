import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/Button";
import { Heart, User, Settings, LogOut } from "lucide-react";
import { useState } from "react";
import "./Header.css";
import "../styles.css";

const Header = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Mock user state - will be replaced with actual auth
  const user = {
    name: "Demo User",
    role: "admin" // or "user" - set to admin for demo
  };

  const handleLogout = () => {
    // TODO: Implement logout functionality with Supabase
    console.log("Logout clicked");
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <Link to="/" className="header-logo">
            <div className="header-logo-icon"></div>
            <span className="header-logo-text">
              DecorDream
            </span>
          </Link>
          
          <nav className="header-nav">
            <Link 
              to="/" 
              className={`header-nav-link ${isActive("/") ? "active" : ""}`.trim()}
            >
              Browse Decorations
            </Link>
            <Link 
              to="/wishlist" 
              className={`header-nav-link ${isActive("/wishlist") ? "active" : ""}`.trim()}
            >
              Wishlist
            </Link>
            <Link 
              to="/dashboard" 
              className={`header-nav-link ${isActive("/dashboard") ? "active" : ""}`.trim()}
            >
              Dashboard
            </Link>
            {user.role === "admin" && (
              <Link 
                to="/admin" 
                className={`header-nav-link ${isActive("/admin") ? "active" : ""}`.trim()}
              >
                Admin Panel
              </Link>
            )}
          </nav>
        </div>

        <div className="header-actions">
          <Link to="/wishlist">
            <Button variant="ghost" size="icon">
              <Heart style={{ width: '1.25rem', height: '1.25rem' }} />
            </Button>
          </Link>
          
          <div className="dropdown">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="dropdown-trigger"
            >
              <User style={{ width: '1.25rem', height: '1.25rem' }} />
            </Button>
            <div className={`dropdown-menu ${isDropdownOpen ? 'open' : ''}`.trim()}>
              <Link to="/dashboard" className="dropdown-item">
                <User style={{ marginRight: '0.5rem', width: '1rem', height: '1rem' }} />
                Profile
              </Link>
              {user.role === "admin" && (
                <Link to="/admin" className="dropdown-item">
                  <Settings style={{ marginRight: '0.5rem', width: '1rem', height: '1rem' }} />
                  Admin Panel
                </Link>
              )}
              <button onClick={handleLogout} className="dropdown-item">
                <LogOut style={{ marginRight: '0.5rem', width: '1rem', height: '1rem' }} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;