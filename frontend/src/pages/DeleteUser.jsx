// src/pages/DeleteUser.jsx

import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import api from '../utils/api';

const DeleteUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await api.delete(`/auth/deleteuser/${id}`);
          if (res.data.status) {
            Swal.fire('Deleted!', 'The user has been deleted.', 'success');
            navigate('/admindashboard');
          }
        } catch {
          Swal.fire('Error!', 'There was an issue deleting the user.', 'error');
        }
      } else {
        navigate('/admindashboard');
      }
    });
  }, [id, navigate]);

  return null;
};

export default DeleteUser;
