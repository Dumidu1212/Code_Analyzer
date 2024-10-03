import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const DeleteFeedback = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Show the confirmation prompt first
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // If the user confirms, delete the feedback
        axios
          .delete(`http://localhost:5000/API/deleteFeedback/${id}`)
          .then((res) => {
            if (res.data.status) {
              Swal.fire('Deleted!', 'Your feedback has been deleted.', 'success');
              // Navigate back to feedback list after deletion
              navigate('/feedback');
            }
          })
          .catch((err) => {
            console.error('Error deleting feedback:', err);
            Swal.fire('Error!', 'Failed to delete the feedback.', 'error');
          });
      } else {
        // If the user cancels, navigate back without deleting
        navigate('/feedback');
      }
    });
  }, [id, navigate]);

  return <></>;
};

export default DeleteFeedback;
