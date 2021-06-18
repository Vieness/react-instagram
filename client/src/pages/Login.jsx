import React from 'react';
import {useDispatch} from "react-redux";
import {Formik} from "formik";
import {loginUser} from "../redux/actions/loginAction";

const Login = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Formik
          initialValues={{email: '', password: '', name: '', firstName: '', lastName: '', photo: ''}}
          validate={values => {
            const errors = {};
            if (!values.email) {
              errors.email = 'Required';
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }
            if (!values.password) {
              errors.password = 'Required';
            }
            return errors;
          }}

          onSubmit={(values, {setSubmitting}) => {
            dispatch(loginUser(values))
            setSubmitting(false)
          }}
      >
        {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              {errors.email && touched.email && errors.email}
              <input
                  type="email"
                  name="email"
                  placeholder={'email'}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
              />
              {errors.password && touched.password && errors.password}
              <input
                  type="password"
                  name="password"
                  placeholder={'password'}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
              />
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </form>
        )}
      </Formik>
    </>
  );
};

export default Login;
