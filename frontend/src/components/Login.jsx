import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(''); // Reset error state before each submission

        try {
            const result = await axios.post('http://localhost:3001/login', { email, password });
            console.log(result);

            if (result.data === "Success") {
                console.log("Login Success");
                alert('Login successful!');
                navigate('/home');
            } else {
                setError('Incorrect password! Please try again.'); // Set error message
            }
        } catch (err) {
            setError('An error occurred. Please try again later.'); // Handle error
            console.error(err);
        } finally {
            setLoading(false); // Reset loading state
        }
    }

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card" style={{ width: '30rem' }}>
                <div className="card-body">
                    <h2 className="card-title text-center">Login</h2>
                    {error && <div className="alert alert-danger">{error}</div>} {/* Error message */}
                    <form onSubmit={handleSubmit}>
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
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Loading...' : 'Login'}
                        </button>
                    </form>
                    <p className="mt-3 text-center">Dont have an account? <Link to='/register'>Register</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Login;
