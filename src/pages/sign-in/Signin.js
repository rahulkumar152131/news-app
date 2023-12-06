import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './style.scss';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';

function Signin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    async function handleForm(e) {
        e.preventDefault();
        try {

            const signInUserCredential = await signInWithEmailAndPassword(auth, email, password);
            const signInUser = signInUserCredential.user;
            // console.log("User logged in:", signInUser);
            // setEmail("");
            // setPassword("");
            navigate("/")
        } catch (error) {
            console.log(error);
            // const errorCode = error.code;
        }
    }

    return (
        <Form className='sign-in-form' onSubmit={(e) => handleForm(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}

export default Signin;