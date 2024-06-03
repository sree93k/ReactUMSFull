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

  const handleToggleVerified = async (userId, currentStatus) => {
    try {
      console.log("yess");
      console.log("userid",userId,"and ",currentStatus);
      const res = await fetch(`/server/admin/updateVerifiedStatus/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ verified: !currentStatus })
      });
      
      if (res.ok) {
        // Update the state to reflect the change
        setUsers(users.map(user =>
          user._id === userId ? { ...user, verified: !currentStatus } : user
        ));
      } else {
        console.log('Error updating verification status');
      }
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
              <th className=' text-center align-middle'>SI NO</th>
              <th className=' text-center align-middle'>Name</th>
              <th className=' text-center align-middle'>Email ID</th>
              <th className=' text-center align-middle'>Image</th>
              <th className=' text-center align-middle'>Verified</th>
              <th className=' text-center align-middle'>Edit</th>
              <th className=' text-center align-middle'>Delete</th>
            </tr>
          </thead>
          <tbody >
            {users.map((user, index) => (
              <tr key={user._id}>
                <td className=' text-center align-middle'>{index + 1}</td>
                <td className=' align-middle'>{user.username}</td>
                <td className=' align-middle'>{user.email}</td>
                <td className=' text-center align-middle'><img className='w-16 h-16 object-cover' src={user.profilePicture} alt="" /></td>
          
                <td className='text-center align-middle'>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={user.verified}
                      onChange={() => handleToggleVerified(user._id, user.verified)}
                      className="sr-only peer"
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-white-800 rounded-full peer dark:bg-red-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                  </label>
                </td>

                <td className='  align-middle'>
                  <button
                    onClick={() => handleEdit(user._id)}
                    className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                </td>
                <td className=' align-middle'>
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
