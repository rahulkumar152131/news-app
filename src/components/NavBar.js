import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../firebase';
import { useEffect, useState } from 'react';


function NavBar() {
    const [user, setUser] = useState();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user);
        })
    }, [])
    const navigate = useNavigate();
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">News App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" >
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
                    </Nav>
                    <Nav style={{ color: "brown" }}>
                        {user ? (
                            <>
                                <Nav.Link href="#link" onClick={() => navigate('/favourite')}>Favourite</Nav.Link>
                                <Nav.Link onClick={() => {
                                    signOut(auth)
                                    navigate('/user/sign-in')
                                }
                                }>Sign out</Nav.Link>

                            </>
                        ) : (
                            <>
                                <Nav.Link onClick={() => navigate('/user/sign-up')}>Sign up</Nav.Link>
                                <Nav.Link onClick={() => navigate('/user/sign-in')}>Sign in</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;