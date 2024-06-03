const handleDeleteAccount = async () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
  
    swalWithBootstrapButtons.fire({
      title: "Confirm Delete Account?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        const deleteConfirmed = async () => {
          try {
            dispatch(deleteUserStart());
            console.log("delete success 0");
            const res = await fetch(`/server/user/delete/${currentUser._id}`, {
              method: 'DELETE',
            });
            const data = await res.json();
            console.log("delete success 1", data);
            if (data.success === false) {
              dispatch(deleteUserFailure(data));
              return;
            }
            console.log("delete success 2");
            dispatch(deleteUserSuccess(data));
            navigate('/user/signin');
          } catch (error) {
            dispatch(deleteUserFailure(error));
          }
        };
        deleteConfirmed();
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          title: "Cancelled",
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
      }
    });
  };
  