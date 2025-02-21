import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardBody,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import getUserProfile from "common/realBackend/authentication/getUserProfile";

const WalletStats = ({ isMenu, toggleMenu }) => {
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await getUserProfile();
        setWallet(data.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  if (!wallet) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardBody>
        <div className="d-flex">
          <div className="me-4">
            <img src={wallet.profileImageUrl} alt="Profile" style={{ width: '50px', borderRadius: '50%' }} />
          </div>

          <div className="flex-grow-1">
            <div className="text-muted">
              <h5>{wallet.fullName}</h5>
              <p className="mb-1">{wallet.email}</p>
              <p className="mb-0">Id no: {wallet.id}</p>
            </div>
          </div>

          <Dropdown isOpen={isMenu} toggle={toggleMenu} className="ms-2">
            <DropdownToggle tag="i" className="text-muted">
              <i className="mdi mdi-dots-horizontal font-size-18" />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem href="#">Action</DropdownItem>
              <DropdownItem href="#">Another action</DropdownItem>
              <DropdownItem href="#">Something else</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </CardBody>
    </Card>
  );
};

WalletStats.propTypes = {
  isMenu: PropTypes.bool,
  toggleMenu: PropTypes.func,
};

export default WalletStats;
