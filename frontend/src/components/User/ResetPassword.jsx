import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword, clearErrors } from '../../actions/userAction';
import { useSnackbar } from 'notistack';
import BackdropLoader from '../Layouts/BackdropLoader';
import MetaData from '../Layouts/MetaData';
import FormSidebar from './FormSidebar';

const ResetPassword = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();

  const { error, success, loading } = useSelector((state) => state.forgotPassword);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword.length < 8) {
      enqueueSnackbar("Password length must be atleast 8 characters", { variant: "warning" });
      return;
    }
    if (newPassword !== confirmPassword) {
      enqueueSnackbar("Password Doesn't Match", { variant: "error" });
      return;
    }

    const formData = new FormData();
    formData.set("password", newPassword);
    formData.set("confirmPassword", confirmPassword);
    dispatch(resetPassword(params.token, formData));
  }

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
    if (success) {
      enqueueSnackbar("Password Updated Successfully", { variant: "success" });
      navigate("/login")
    }
  }, [dispatch, error, success, navigate, enqueueSnackbar]);

  return (
    <>
      <MetaData title="Password Reset | Organic" />

      {loading && <BackdropLoader />}
      <main class="w-full py-16 px-4">

        {/* <!-- row --> */}
        <div class="flex md:w-6/6 lg:w-5/6 xl:w-4/6 sm:mt-4 m-auto mb-7 bg-gray-100 shadow">

          <FormSidebar
            title="Reset Password"
            tag="Get access to your Orders, Wishlist and Recommendations"
          />

          {/* <!-- login column --> */}
          <div class="flex-1 overflow-hidden">
            <h2 className="text-center text-2xl font-semibold mt-6 text-black">Reset Password</h2>

            {/* <!-- edit info container --> */}
            <div class="text-center py-10 px-4 sm:px-14">

              {/* <!-- input container --> */}
              <form onSubmit={handleSubmit}>

                <div class="flex flex-col w-full gap-4">

                  <TextField
                    fullWidth
                    label="New Password"
                    type="password"
                    name="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <TextField
                    fullWidth
                    label="Confirm New Password"
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />

                  {/* <!-- button container --> */}
                  <div class="flex flex-col gap-2.5 mt-2 mb-12">
                    <p class="text-md text-black font-medium text-left">By continuing, you agree to Organic's <a href="/" class="text-primary-green"> Terms of Use</a> and <a href="/" class="text-primary-green"> Privacy Policy.</a></p>
                    <button type="submit" class="block w-full bg-primary-green text-md font-medium text-white px-10 py-3 rounded-full shadow-lg capitalize hover:bg-black my-2">Submit</button>
                  </div>
                  {/* <!-- button container --> */}

                </div>
              </form>
              {/* <!-- input container --> */}

              <Link to="/register" className="font-semibold text-md text-primary-green">New to Green Organic? Create an account</Link>
            </div>
            {/* <!-- edit info container --> */}

          </div>
          {/* <!-- login column --> */}
        </div>
        {/* <!-- row --> */}

      </main>
    </>
  );
};

export default ResetPassword;
