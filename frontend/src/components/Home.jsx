import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types'; // Import PropTypes
import EditUserModal from './EditUser';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/users');
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/users/${id}`);
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleUpdate = (updatedUser) => {
    setUsers(users.map(user => (user._id === updatedUser._id ? updatedUser : user)));
    setEditingUser(null);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Login Success Page</h1>
      <Link to='/login' className="btn btn-primary my-4">Logout</Link>

      <h2 className="text-center">Registered Users</h2>
      <div className="user-list">
        {users.length > 0 ? (
          users.map(user => (
            <div key={user._id} className="user-item d-flex justify-content-between align-items-center border p-2 mb-2">
              <p className="mb-0">{user.email}</p>
              <div>
                <button onClick={() => handleDelete(user._id)} className="btn btn-danger btn-sm me-2">Delete</button>
                <button onClick={() => setEditingUser(user)} className="btn btn-warning btn-sm">Edit</button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No users found.</p>
        )}
      </div>

      {editingUser && (
        <EditUserModal 
          user={editingUser} 
          onUpdate={handleUpdate} 
          onClose={() => setEditingUser(null)} 
        />
      )}
    </div>
  );
}

// Prop validation (if needed)
Home.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string,
      email: PropTypes.string.isRequired,
    })
  ),
};

export default Home;
