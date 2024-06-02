import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom'; 

const adminDashboard = () => {
  const [users,setUsers]=useState([])
  const navigate = useNavigate();

  useEffect(()=>{
     const ftechUsers=async()=>{
      try {
        
        const res=await fetch('/server/admin/allUsers',{
          method:'GET',
          headers:{
              'Content-Type':'application/json'
          },
        })
       const allUsers=await res.json()
       console.log("step3 All data Latest step1 ",allUsers);
       setUsers(allUsers)
      } catch (error) {
        console.log(error);
      }
     }
     ftechUsers()
      
  },[])

  const handleEdit = (userId) => {
    navigate(`/admin/edit/${userId}`);
  };



  const handleDelete = async (userId) => {
    try {
      await fetch(`/server/admin/deleteUser/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      // Refresh users list after delete
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className='relative h-screen '>

      <div className=" relative z-10 mt-4  mx-auto  items-center justify-center  bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full  overflow-auto">
        <h1 className="text-3xl font-bold mb-4 text-center">Dashboard</h1>
        <Table striped bordered hover className="min-w-full">
          <thead>
            <tr>
              <th>SI NO</th>
              <th>Name</th>
              <th>Email ID</th>
              <th>Image</th>
              <th>Verified</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td><img src={user.profilePicture} alt="" /></td>
                <td>{user.verified ? "Yes" : "No"}</td>
                <td>
                  <button
                    onClick={() => handleEdit(user._id)}
                    className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>

  );
};

export default adminDashboard;
