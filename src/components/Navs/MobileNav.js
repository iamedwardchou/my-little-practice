import React, { useState } from "react";
import { Link } from "react-router-dom";
import BusNav from "./Nav";
import busLogo from "../../images/mobile_bus_logo.svg";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const MobileNav = () => {
  const [open, setOpen] = useState(false);

  const hamburgerIcon = (
    <AiOutlineMenu className="hamburger" onClick={() => setOpen(!open)} />
  );
  const closeBtn = (
    <AiOutlineClose className="hamburger" onClick={() => setOpen(!open)} />
  );

  return (
    <div className="mobile-nav">
      <Container>
        <Navbar expand="sm" className="d-flex justify-content-between">
        <Navbar.Brand className="navbar-brand" to="/">
          <img src={busLogo} alt="logo pic" className="bus-logo" />
        </Navbar.Brand>
          <Nav className="flex-row align-items-center">
            <Nav.Link as={Link} to="/Search" className="text-dark fw-bold ms-2">
              附近站牌
            </Nav.Link>
            <AiOutlineMenu
              className="hamburger"
              onClick={() => setOpen(!open)}
            />
          </Nav>
        </Navbar>
      </Container>
      {open && <MobileModal open={open} setOpen={setOpen} />}
    </div>
  );
};

const MobileModal = ({ open, setOpen }) => {
  return (
    <>
      <Navbar className="mobile-modal flex-column">
        <Navbar.Brand className="navbar-brand ms-3 d-flex flex-row justify-content-between">
          <img src={busLogo} alt="logo pic" className="bus-logo" />
          <AiOutlineClose
            className="close-btn d-block"
            onClick={() => setOpen(!open)}
          />
        </Navbar.Brand>
        <Nav className="flex-column ">
          <Nav.Link as={Link} to="/Search" className=" text-dark fw-bold ms-3">
            路線規劃
          </Nav.Link>
          <Nav.Link as={Link} to="/Search" className="text-dark fw-bold ms-3">
            站點搜尋
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/Search"
            className="nav-link text-dark fw-bold ms-3 "
          >
            我的收藏
          </Nav.Link>
        </Nav>
      </Navbar>
    </>
  );
};

export default MobileNav;
