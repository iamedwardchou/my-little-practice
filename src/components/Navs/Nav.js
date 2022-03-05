import React from "react";
import { Link } from "react-router-dom";
import busLogo from "../../images/bus_logo.svg"
import languageIcon from "../../images/iconoir_language.svg";
import { Container, Nav, Navbar, Button } from "react-bootstrap";

const BusNav = () => {
  return (
    <section className="header navigation">
      <Container className="px-0">
        <Navbar
          expand="sm"
          className="d-flex justify-content-between align-items-center"
        >
          <Navbar.Brand className="navbar-brand" to="/">
            <img src={busLogo} alt="logo pic" className="bus-logo" />
          </Navbar.Brand>
          {/* <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" > */}

          <Nav className="mb-2 mb-sm-0">
            {/* <li className="nav-item">
            </li> */}
            <Nav.Link as={Link} to="/Search" className="text-dark fw-bold ms-2">
              附近站牌
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/Search"
              className=" text-dark fw-bold ms-3"
            >
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
          <Nav className="language-change align-items-center">
            <Nav.Link className="navbar-brand me-0 pe-0" href="#">
              <img src={languageIcon} alt="logo pic" height="35px" />
            </Nav.Link>
            <Nav.Link className="border-dark border-end fw-bold py-0">
              中文
            </Nav.Link>
            <Nav.Link className="py-0"> 英文</Nav.Link>
          </Nav>
          {/* </Navbar.Collapse> */}
        </Navbar>
      </Container>
    </section>
  );
};

export default BusNav;
