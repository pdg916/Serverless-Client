import React, {useState, useEffect} from "react";
import {Nav, Navbar, NavItem} from "react-bootstrap";
import Routes from "./Routes"
import "./App.css";
import { Auth } from "aws-amplify";
import { AppContext} from "./libs/contextLib";
import {LinkContainer} from "react-router-bootstrap";
import { Link, useHistory } from "react-router-dom";
function App() {
  const history = useHistory();
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  
  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
  
    setIsAuthenticating(false);
  }
  async function handleLogout() {
    await Auth.signOut();
  
    userHasAuthenticated(false);
  
    history.push("/login");
  }
  return (
    !isAuthenticating && (
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/" id="b1">비싼노트 | 생각은 부자를 만든다.</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              {isAuthenticated ? (
                <>
                  <LinkContainer to="/settings">
                    <NavItem>후원하기</NavItem>
                  </LinkContainer>
                  <NavItem onClick={handleLogout} >로그아웃</NavItem>
                </>
              ) : (
                <>
                  <LinkContainer to="/signup">
                    <NavItem >회원가입</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <NavItem >로그인</NavItem>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <AppContext.Provider
          value={{ isAuthenticated, userHasAuthenticated }}
        >
          <Routes />
        </AppContext.Provider>
      </div>
    )
  );
}

export default App;