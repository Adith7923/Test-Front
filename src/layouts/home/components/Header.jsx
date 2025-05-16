import React, { useState } from "react";
import styles from "../Home.module.css";
import { BsX, BsList } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import Modal from "../../common/components/Modal";
import LoginBox from "../../common/components/LoginBox";

const Header = ({
  menuItems,
  imageSrc,
  button,
  type,
  showMenu = true,
  showMenuInSidebar = true,
  showResponsiveMenu = true,
}) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleOpenLoginModal = () => {
    const userSession = secureLocalStorage.getItem("userSession") || {};
    const isLoggedIn = !!userSession.userId;

    if (isLoggedIn) {
      const roleId = userSession.roleId;
      navigateBasedOnRole(roleId);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleRegisterClick = () => {
    handleOpenLoginModal();
  };

  const loginBoxProps = {
    title: "Log In with Google",
    buttonText: "LogIn",
    onCancel: handleCloseLoginModal,
  };

  const navigateBasedOnRole = (roleId) => {
    switch (roleId) {
      case 3:
        navigate("/student/profile");
        break;
      case 2:
        navigate("/mentor/profile");
        break;
      case 1:
        navigate("/admin/student");
        break;
      default:
        console.error("Unknown role ID:", roleId);
        break;
    }
  };

  return (
    <div className={`${styles["header-container"]}`}>
      <div
        className={`${styles["header-sidebar"]} ${showSidebar ? styles.show : ""}`}
      >
        <div className={`${styles["header-menuresponsive"]}`}>
          {showResponsiveMenu &&
            showMenuInSidebar &&
            menuItems.map((item, index) => (
              <a
                key={index}
                className={`${styles["header-menuitemresponsive"]}`}
                href="#"
                onClick={() => {
                  item.onClick(item.name);
                  toggleSidebar();
                }}
              >
                {item.name}
              </a>
            ))}
          <div
            onClick={handleOpenLoginModal}
            className={`${styles["header-button"]}`}
          >
            {button}
          </div>
        </div>

        <div
          className={`${styles["header-sidebaricon"]}`}
          onClick={toggleSidebar}
        >
          <div className={`${styles["header-titleresponsive"]}`}>
            <img
              src={imageSrc}
              className={`${styles["header-image"]}`}
              alt="Icon"
            />
          </div>
          {showSidebar ? (
            <BsX className={`${styles["header-crossicon"]}`} />
          ) : (
            <BsList className={`${styles["header-hamburger"]}`} />
          )}
        </div>
      </div>

      <div className={`${styles["header-title"]}`}>
        <img
          src={imageSrc}
          className={`${styles["header-image"]}`}
          alt="Icon"
        />
      </div>

      {showMenu && (
        <div className={`${styles["header-menu"]}`}>
          {menuItems.map((item, index) =>
            type === "link" ? (
              <Link
                key={index}
                className={`${styles["header-menuitem"]}`}
                to={item.link}
                onClick={() => item.onClick(item.name)}
              >
                {item.name}
              </Link>
            ) : (
              <a
                key={index}
                className={`${styles["header-menuitem"]}`}
                href={item.atag}
                onClick={() => item.onClick(item.name)}
              >
                {item.name}
              </a>
            )
          )}
        </div>
      )}

      <div
        onClick={handleOpenLoginModal}
        className={`${styles["header-button"]}`}
      >
        {button}
      </div>
    </div>
  );
};

export default Header;
