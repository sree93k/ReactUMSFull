import React from 'react';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom'; 

const adminDashboard = () => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate('/admin/edit'); 
  };

  const handleDelete = () => {
    navigate('/admin/dashboard');
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
            <tr>
              <td>1</td>
              <td>Jasna</td>
              <td>jasna@gmail.com</td>
              <td>Image</td>
              <td>Verified</td>
              <td>
                <button
                  onClick={handleEdit}
                  className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>

  );
};

export default adminDashboard;
