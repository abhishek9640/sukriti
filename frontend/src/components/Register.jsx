import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(''); // Reset error state before submission

        try {
            const result = await axios.post('http://localhost:3001/register', { name, email, password });
            console.log(result);
            
            if (result.data === "Already registered") {
                alert("E-mail already registered! Please Login to proceed.");
                navigate('/login');
            } else {
                alert("Registered successfully! Please Login to proceed.");
                navigate('/login');
            }
        } catch (err) {
            setError('An error occurred. Please try again later.'); // Handle error
            console.error(err);
        }
    }

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card" style={{ width: '30rem' }}>
                <div className="card-body">
                    <h2 className="card-title text-center">Register</h2>
                    {error && <div className="alert alert-danger">{error}</div>} {/* Error message */}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input 
                                type="text" 
                                id="name" 
                                className="form-control" 
                                placeholder="Enter Name"
                                onChange={(event) => setName(event.target.value)}
                                required 
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email Id</label>
                            <input 
                                type="email" 
                                id="email" 
                                className="form-control" 
                                placeholder="Enter Email"
                                onChange={(event) => setEmail(event.target.value)}
                                required 
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input 
                                type="password" 
                                id="password" 
                                className="form-control" 
                                placeholder="Enter Password"
                                onChange={(event) => setPassword(event.target.value)}
                                required 
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Register</button>
                    </form>
                    <p className="mt-3 text-center">Already have an account? <Link to='/login'>Login</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Register;
