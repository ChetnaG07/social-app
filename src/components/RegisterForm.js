import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

import { register } from "../redux/actions/userActions";
import { Link } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa";

import { AiFillCloseCircle } from "react-icons/ai";

const validationSchema = yup.object({
  name: yup
    .string()
    .min(6, "Please provide Full Name...")
    .required("Name is required"),
  email: yup.string().email("Please provide a valid Email..").required(),
  photoUrl: yup.string(),
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required(),
});

function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error } = useSelector((state) => state.auth);

  const onSubmit = async (values) => {
    const { confirmPassword, ...data } = values;
    console.log("data", data);
    await dispatch(register({ ...data })).then(() => navigate("/"));
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      photoUrl: "",
    },
    validateOnBlur: true,
    validationSchema,
    onSubmit,
  });

  console.log("err", error);

  return (
    <div className="auth-form-sec">
      <div className="auth-topbar">
        <FaLinkedin />
      </div>
      <div className="auth-form-inn">
        <div className="auth-form">
          <h2>Register</h2>
          <p className="sub-heading">
            Alredy a User? Please <Link to="/">Login</Link>{" "}
          </p>
          {error ? (
            <span className="error-msg text-danger">
              <AiFillCloseCircle /> {error}
            </span>
          ) : null}
          <form onSubmit={formik.handleSubmit}>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter Name.."
            />
            {formik.errors.name ? (
              <span className="text-danger error-msg">
                {formik.errors.name}
              </span>
            ) : null}
            <input
              type="text"
              name="email"
              className="form-control"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter Email.."
            />
            {formik.errors.email ? (
              <span className="text-danger error-msg">
                {formik.errors.email}
              </span>
            ) : null}
            <input
              type="text"
              name="photoUrl"
              className="form-control"
              value={formik.values.photoUrl}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter Photo URL(Optional).."
            />

            <input
              type="password"
              name="password"
              className="form-control"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter Password.."
            />
            {formik.errors.password ? (
              <span className="text-danger error-msg">
                {formik.errors.password}
              </span>
            ) : null}
            <input
              type="password"
              name="confirmPassword"
              className="form-control"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter Password again.."
            />
            {formik.errors.confirmPassword ? (
              <span className="text-danger error-msg">
                {formik.errors.confirmPassword}
              </span>
            ) : null}
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-info mt-3"
                disabled={!formik.isValid}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
