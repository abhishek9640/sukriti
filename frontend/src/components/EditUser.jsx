import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const EditUserModal = ({ user, onUpdate, onClose }) => {
  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [password, setPassword] = useState(''); // State for password
  const [successMessage, setSuccessMessage] = useState(''); // State for success message

  // UseEffect to reset the form when the user prop changes
  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setPassword(''); 
    setSuccessMessage(''); 
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedData = { name, email };
      if (password) { // Include password only if it's provided
        updatedData.password = password;
      }

      // Send PUT request to update user data
      const response = await axios.put(`http://localhost:3001/users/${user._id}`, updatedData);
      onUpdate(response.data);

      // Set success message
      setSuccessMessage('User updated successfully!');

      // Clear input fields after successful update
      setName('');
      setEmail('');
      setPassword('');
      
      // Optionally close the modal after a short delay
      setTimeout(onClose, 2000); // Close modal after 2 seconds
    } catch (error) {
      console.error("Error updating user:", error);
      // Handle error as needed
    }
  };

  return (
    <div className="modal fade show" style={{ display: 'block' }} aria-modal="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit User</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {successMessage && <div className="alert alert-success">{successMessage}</div>} {/* Success message */}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required 
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input 
                  type="email" 
                  className="form-control" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
              <div className="mb-3">
                <label className="form-label">New Password</label>
                <input 
                  type="password" 
                  className="form-control" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                />
              </div>
              <button type="submit" className="btn btn-primary">Update</button>
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// Prop validation
EditUserModal.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string,
    email: PropTypes.string.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditUserModal;
