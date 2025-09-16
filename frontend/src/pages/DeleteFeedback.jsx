import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import api from '../utils/api';

const DeleteFeedback = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to delete this feedback!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await api.delete(`/api/feedback/deleteFeedback/${id}`);
          if (res.data.status) {
            Swal.fire('Deleted!', 'Your feedback has been deleted.', 'success');
            window.location.reload(); // Force a page reload to refresh the feedback list
          }
        } catch {
          Swal.fire('Error!', 'Failed to delete the feedback.', 'error');
        }
      } else {
        navigate('/feedback');
      }
    });
  }, [id, navigate]);

  return null;
};

export default DeleteFeedback;
