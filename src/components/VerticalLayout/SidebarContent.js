import React, { useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";


// //Import Scrollbar
import SimpleBar from "simplebar-react";

// MetisMenu
import MetisMenu from "metismenujs";
import withRouter from "components/Common/withRouter";
import { Link } from "react-router-dom";

//Images and Icons
import dashLogo from "../../assets/icons/home-03.png"
import branchesLogo from "../../assets/icons/building-06.png"
import rolesLogo from "../../assets/icons/user-shield-01.png"
import usersLogo from "../../assets/icons/user-group.png"
import cardschemeLogo from "../../assets/icons/setting-05.png"
import cardprofileLogo from "../../assets/icons/credit-card-pos.png"
import cardrequestLogo from "../../assets/icons/credit-card-accept.png"
import stocksLogo from "../../assets/icons/chart-bar-line.png"
import cardsLogo from "../../assets/icons/credit-card.png"
import blockcardLogo from "../../assets/icons/credit-card-not-found.png"
import authlistLogo from "../../assets/icons/list.png"
import authqueueLogo from "../../assets/icons/layers-three-01.png"
import trailLogo from "../../assets/icons/map-01.png"
import accountLogo from "../../assets/icons/user.png"
import logoutLogo from "../../assets/icons/logout-02.png"
import cardinfraLogo from "../../assets/images/Vector.png"


//i18n
import { withTranslation } from "react-i18next";

const SidebarContent = props => {
  const ref = useRef();
  const activateParentDropdown = useCallback((item) => {
    item.classList.add("active");
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];

    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show"); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }, []);

  const removeActivation = (items) => {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i];
      const parent = items[i].parentElement;

      if (item && item.classList.contains("active")) {
        item.classList.remove("active");
      }
      if (parent) {
        const parent2El =
          parent.childNodes && parent.childNodes.lenght && parent.childNodes[1]
            ? parent.childNodes[1]
            : null;
        if (parent2El && parent2El.id !== "side-menu") {
          parent2El.classList.remove("mm-show");
        }

        parent.classList.remove("mm-active");
        const parent2 = parent.parentElement;

        if (parent2) {
          parent2.classList.remove("mm-show");

          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.remove("mm-active"); // li
            parent3.childNodes[0].classList.remove("mm-active");

            const parent4 = parent3.parentElement; // ul
            if (parent4) {
              parent4.classList.remove("mm-show"); // ul
              const parent5 = parent4.parentElement;
              if (parent5) {
                parent5.classList.remove("mm-show"); // li
                parent5.childNodes[0].classList.remove("mm-active"); // a tag
              }
            }
          }
        }
      }
    }
  };

  const path = useLocation();
  const activeMenu = useCallback(() => {
    const pathName = path.pathname;
    let matchingMenuItem = null;
    const ul = document.getElementById("side-menu");
    const items = ul.getElementsByTagName("a");
    removeActivation(items);

    for (let i = 0; i < items.length; ++i) {
      if (pathName === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
  }, [path.pathname, activateParentDropdown]);

  useEffect(() => {
    ref.current.recalculate();
  }, []);

  useEffect(() => {
    new MetisMenu("#side-menu");
    activeMenu();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    activeMenu();
  }, [activeMenu]);

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }

  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">

            <li style={{ marginTop: 24, marginBottom: 12, }}>
              <Link to="/dashboardLapo" >
                <img src={dashLogo} height={17} width={17} style={{ marginRight: 14, }} />
                <span>{props.t("Dashboard")}</span>
              </Link>
            </li>

            <li className="menu-title">{props.t("Main Menu")} </li>

            <li>
              <Link to="/#" >
                <img src={branchesLogo} height={17} width={17} style={{ marginRight: 14, }} />
                <span>{props.t("Branches")}</span>
              </Link>
            </li>

            <li>
              <Link to="/#" >
                <img src={rolesLogo} height={17} width={17} style={{ marginRight: 14, }} />
                <span>{props.t("Roles")}</span>
              </Link>
            </li>

            <li>
              <Link to="/#" >
                <img src={usersLogo} height={17} width={17} style={{ marginRight: 14, }} />
                <span>{props.t("Users")}</span>
              </Link>
            </li>

            <li>
              <Link to="/#">
                <img src={cardschemeLogo} height={17} width={17} style={{ marginRight: 14, }} />
                <span>{props.t("Card Scheme")}</span>
              </Link>
            </li>

            <li>
              <Link to="/card-profile">
                <img src={cardprofileLogo} height={17} width={17} style={{ marginRight: 14, }} />
                <span>{props.t("Card Profile")}</span>
              </Link>
            </li>

            <li>
              <Link to="/card-request">
                <img src={cardrequestLogo} height={17} width={17} style={{ marginRight: 14, }} />
                <span>{props.t("Card Request")}</span>
              </Link>
            </li>

            <li>
              <Link to="/#">
                <img src={stocksLogo} height={17} width={17} style={{ marginRight: 14, }} />
                <span>{props.t("Stock")}</span>
              </Link>
            </li>

            <li>
              <Link to="/#">
                <img src={cardsLogo} height={17} width={17} style={{ marginRight: 14, }} />
                <span>{props.t("Cards")}</span>
              </Link>
            </li>

            <li>
              <Link to="/#">
                <img src={blockcardLogo} height={17} width={17} style={{ marginRight: 14, }} />
                <span>{props.t("Block/Unblock Card")}</span>
              </Link>
            </li>

            <li>
              <Link to="/#">
                <img src={authlistLogo} height={17} width={17} style={{ marginRight: 14, }} />
                <span>{props.t("Authorization List")}</span>
              </Link>
            </li>

            <li>
              <Link to="/#">
                <img src={authqueueLogo} height={17} width={17} style={{ marginRight: 14, }} />
                <span>{props.t("Authorization Queue")}</span>
              </Link>
            </li>

            <li>
              <Link to="/#">
                <img src={trailLogo} height={17} width={17} style={{ marginRight: 14, }} />
                <span>{props.t("Trail")}</span>
              </Link>
            </li>

            <li>
              <Link to="/#">
                <img src={accountLogo} height={17} width={17} style={{ marginRight: 14, }} />
                <span>{props.t("Account")}</span>
              </Link>
            </li>

            <li>
              <Link to="/#" style={{ marginTop: 100, marginBottom: 40, }}>
                <img src={logoutLogo} height={17} width={17} style={{ marginRight: 14, }} />
                <span>{props.t("Logout")}</span>
              </Link>
            </li>

            <li className="menu-title">{props.t("Powerd By")} </li>

            <li>
              <Link to="/#">
                <img src={cardinfraLogo} height={41} width={93} />
                <span>{props.t("")}</span>
              </Link>
            </li>

          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  );
};

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withRouter(withTranslation()(SidebarContent));