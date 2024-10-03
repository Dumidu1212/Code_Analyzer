import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";


const DeleteUser = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/auth/deleteuser/${id}`)
          .then((res) => {
            if (res.data.status) {
              Swal.fire({
                title: "Deleted!",
                text: "The user has been deleted.",
                icon: "success"
              });
              navigate("/admindashboard");
            }
          })
          .catch((err) => {
            console.error("Error deleting user:", err);
            Swal.fire({
              title: "Error!",
              text: "There was an issue deleting the user.",
              icon: "error"
            });
          });
      }
      else{
        navigate('/admindashboard');
      }
    });
  }, []);
};

export default DeleteUser;
