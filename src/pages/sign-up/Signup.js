import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './style.scss';
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { useDispatch } from 'react-redux';
import { actions } from '../../redux/reducers/newsReducer';


function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const auth = getAuth();
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email, password);

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(auth.currentUser, {
                displayName: name,
            });
            const signInUserCredential = await signInWithEmailAndPassword(auth, email, password);
            const signInUser = signInUserCredential.user;
            dispatch(actions.setUserDetails({ name: signInUser.displayName, email: signInUser.email }));
            setName("");
            setEmail("");
            setPassword("");
            navigate("/");
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <Form className='sign-in-container' onSubmit={(e) => handleSubmit(e)}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Name</Form.Label>
                <Form.Control type="string" placeholder="Enter Name" onChange={(e) => setName(e.target.value)} />
            </Form.Group>
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

export default Signup;