import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import withRouter from "components/Common/withRouter";
import "assets/scss/datatables.scss";

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb";
import { getWallet as onGetWallet } from "store/actions";
import WalletActivities from "./walletActivities";
import WalletStats from "./walletStats";
import WalletOverView from "./walletOverView";

//redux
import { useSelector, useDispatch } from "react-redux";

const CryptoWallet = () => {

  //meta title
  document.title = "Admin Management | LAPO Web App ";

  const dispatch = useDispatch();

  const { wallet } = useSelector(state => ({
    wallet: state.crypto.wallet
  }));

  const [isMenu, setIsMenu] = useState(false);

  useEffect(() => {
    dispatch(onGetWallet());
  }, [onGetWallet]);

  const toggleMenu = () => {
    setIsMenu(!isMenu);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Settings" breadcrumbItem="Admin" />
          {!isEmpty(wallet) && (
            <Row>
              <Col xl="12">
                <WalletStats
                  wallet={wallet}
                  isMenu={isMenu}
                  toggleMenu={toggleMenu}
                />
              </Col>
            </Row>
          )}
          <Row>
            <Col lg="12">
              {!isEmpty(wallet["walletHistory"]) && (
                <WalletActivities />
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

CryptoWallet.propTypes = {
  wallet: PropTypes.any,
  onGetWallet: PropTypes.func,
};

export default withRouter(CryptoWallet);
