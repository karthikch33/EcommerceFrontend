import React from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import { Link } from 'react-router-dom';
import Container from '../components/Container';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import CustomInput from '../components/CustomInput';
import { forgotpasswordToken } from '../features/user/userSlice';

const ForgotPassword = () => {
  const dispatch = useDispatch();

  let schema = yup.object().shape({
    email: yup.string().email().required('Email Required To Search'), // Improved email validation
  });

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values);
      dispatch(forgotpasswordToken(values));
    },
  });

  return (
    <>
      <Meta title={'Reset Password'} />
      <BreadCrumb title="Reset Password" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-10 col-xl-4">
            <div className="login-card p-4">
              <h3 className="text-center fs-2">Reset Your Password</h3>
              <p className="text-center">Password can be reset with your mail!</p>
              <form onSubmit={formik.handleSubmit} className="gap-15 d-flex flex-column">
                <CustomInput
                  type="email"
                  name="email"
                  className="form-control"
                  id="email"
                  placeholder="Email"
                  onChange={formik.handleChange('email')}
                  onBlur={formik.handleBlur('email')}
                  value={formik.values.email}
                />

                {formik.touched.email && formik.errors.email && (
                  <div className="error">{formik.errors.email}</div>
                )}

                <div className="d-flex justify-content-center align-items-center gap-15 flex-column">
                  <button className="button" type="submit">
                    Submit
                  </button>
                  <Link to="/login" className="text-center text-dark">
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ForgotPassword;
