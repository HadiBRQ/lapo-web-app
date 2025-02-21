import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import NotificationDropdown from "./NotificationDropdown";

//i18n
import { withTranslation } from "react-i18next";
// Redux
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import withRouter from "components/Common/withRouter";

import avatarHolder from "../../../assets/icons/Avatar.png"


const ProfileMenu = props => {
  const [menu, setMenu] = useState(false);
  const [username, setUsername] = useState("Admin");
  const [profileImageUrl, setProfileImageUrl] = useState(avatarHolder);

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser"));
      setUsername(obj.firstName || "Admin"); // Fallback to "Admin" if firstName is not available
      setProfileImageUrl(obj.profileImageUrl || "defaultImageUrl"); // Provide a default image URL if not available
    }
  }, [props.success]);

  return (
    <React.Fragment>

      <Dropdown>
        <form className="app-search d-none d-lg-block">
          <div className="position-relative">
            <input
              type="text"
              className="form-control"
              placeholder="Search"
            />
            <span className="bx bx-search-alt" />
          </div>
        </form>
      </Dropdown>

      <NotificationDropdown />

      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item "
          id="page-header-user-dropdown"
          tag="button"
        >
          <img
            className="rounded-circle header-profile-user"
            src={avatarHolder}
            alt="Header Avatar"
          />
        </DropdownToggle>
      </Dropdown>
    </React.Fragment>
  );
};

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any
};

const mapStatetoProps = state => {
  const { error, success } = state.Profile;
  return { error, success };
};

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(ProfileMenu))
);
