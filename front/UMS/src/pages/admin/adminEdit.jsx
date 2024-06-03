import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../../../firbase'; 
import { updateUserStart, updateUserSuccess, updateUserFailure } from '../../redux/user/userSlice';
import Swal from 'sweetalert2'

const AdminEdit = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentAdmin } = useSelector((state) => state.admin);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const fileRef = useRef(null);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  useEffect(() => {
    
    const fetchUserData = async () => {
      try {
        console.log("step 0");
        const res = await fetch(`/server/admin/editUser/${userId}`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log("step 1");
        const data = await res.json();
        console.log("the iuser data is",data);
        setFormData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, [userId]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    console.log("upload task",uploadTask);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        console.log("step 1");
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        console.log("step 2",error);
        setImageError(true);
      },
      () => {
        console.log("step 3");
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/server/admin/updateUser/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        Swal.fire({
          title: "Incorrect Password",
          icon:"error",
          timer: 1000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const b = Swal.getHtmlContainer().querySelector('b');
            if (b) {
              const timerInterval = setInterval(() => {
                b.textContent = `${Swal.getTimerLeft()}`;
              }, 100);
              Swal.getHtmlContainer().addEventListener('willClose', () => {
                clearInterval(timerInterval);
              });
            }
          }
        });
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
      Swal.fire({
        title: "Updated Successfully",
        icon:"success",
        timer: 1000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const b = Swal.getHtmlContainer().querySelector('b');
          if (b) {
            const timerInterval = setInterval(() => {
              b.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
            Swal.getHtmlContainer().addEventListener('willClose', () => {
              clearInterval(timerInterval);
            });
          }
        }
      });
      navigate('/admin/dashboard')
    } catch (error) {
      Swal.fire({
        title: error,
        icon:"error",
        timer: 1000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const b = Swal.getHtmlContainer().querySelector('b');
          if (b) {
            const timerInterval = setInterval(() => {
              b.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
            Swal.getHtmlContainer().addEventListener('willClose', () => {
              clearInterval(timerInterval);
            });
          }
        }
      });
      dispatch(updateUserFailure(error));
    }
  };

  const handleChangePassword = () => {
    console.log("user id is",userId);
    navigate(`/admin/changepassword/${userId}`);
  };

  const handleBackButton = () => {
    navigate('/admin/dashboard');
  };

  return (
    <div className="relative h-screen">
      <div className="relative mt-3 z-10 p-3 max-w-lg mx-auto bg-white bg-opacity-75 rounded-lg text-center">
        <button
          onClick={handleBackButton}
          className="bg-blue-700 text-white p-1 rounded-lg uppercase hover:opacity-95 w-half"
        >
          Back
        </button>
        <h1 className="text-3xl font-semibold my-7">Edit Profile </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
          
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <img
            onClick={() => fileRef.current.click()}
            src={formData.profilePicture }
            alt="profile"
            className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
          />
          <p className="text-sm self-center">
            {imageError ? (
              <span className="text-red-700">Error Uploading Image(file size must be less than 2MB)</span>
            ) : (
              imagePercent > 0 && imagePercent < 100 ? (
                <span className="text-blue-700">{`Uploading: ${imagePercent}%`}</span>
              ) : (
                imagePercent === 100 && <span className="text-green-700">Image Uploaded Successfully</span>
              )
            )}
          </p>
          <input
            name="username"
            type="text"
            placeholder="Name"
            value={formData.username || ''}
            className="bg-slate-100 p-3 rounded-lg"
            onChange={handleChange}
          />
          <input
            name="email"
            type="text"
            placeholder="Email"
            value={formData.email || ''}
            className="bg-slate-100 p-3 rounded-lg"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 w-full"
          >
            {loading ? 'Loading...' : 'Update'}
          </button>
        </form>

        <button
          onClick={handleChangePassword}
          className="bg-red-600 text-white p-3 rounded-lg uppercase hover:opacity-95 w-full mt-4"
        >
          Need to change password?
        </button>
      </div>
    </div>
  );
};

export default AdminEdit;
