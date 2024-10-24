import React, { useState } from 'react';
import { RiDeleteBinFill } from 'react-icons/ri';
import { UserService } from '../../services/user-service';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../redux/features/authentication/UserSlice';
import { getCookie } from '../../utils/cookieUtils';
import { Modal, Button } from 'react-bootstrap';

interface User {
  userId: string;
  username: string;
  email: string;
  role: string;
  userImageUrl: string | null;
}

interface UserTableProps {
  users: User[];
}

const service = new UserService();

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  const dispatch = useDispatch();

  // State for showing/hiding confirmation modal
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  // Toggle modal visibility
  const handleShowModal = (userId: string) => {
    setSelectedUserId(userId);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUserId(null);
  };

  // Handle delete confirmation
  const handleDeleteUser = async () => {
    if (selectedUserId) {
      dispatch<any>(deleteUser(selectedUserId));
      setShowModal(false);
    }
  };

  return (
    <>
      <table className="user-table">
        <thead>
          <tr>
            <th>User Image</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.userId}>
              <td>
                {user.userImageUrl ? (
                  <img
                    src={user.userImageUrl}
                    alt={user.username}
                    className="user-image"
                  />
                ) : (
                  'No Image'
                )}
              </td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td style={{ color: '#0056B3' }}>{user.role}</td>
              <td>
                <button
                  className="user-delete-btn"
                  disabled={user.userId === getCookie('userId')}
                  style={{
                    cursor:
                      user.userId === getCookie('userId') ? 'not-allowed' : 'pointer',
                  }}
                  onClick={() => handleShowModal(user.userId)}
                >
                  <RiDeleteBinFill
                    style={{ color: 'red', fontSize: '30px' }}
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header className="modal-header-custom" closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-custom">
          <p>Are you sure you want to delete this user?</p>
        </Modal.Body>
        <Modal.Footer className="modal-footer-custom">
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button className="btn-custom-confirm" onClick={handleDeleteUser}>
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserTable;
