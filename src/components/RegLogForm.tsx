"use client";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setUserDetails } from "@/lib/store/features/loginSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";

interface RegForm {
    mode : string
}

const RegLogForm: React.FC<RegForm> = ({ mode }) => {

//  const dispatch = useDispatch();

  const emailValid = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(edu\.np)$/;

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .matches(emailValid, "The domain should be .edu.np")
      .required("Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires an uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol")
      .required("Required"),
  });

  const RegisterSchema = LoginSchema.shape({
    college: Yup.string().required("Required"),
  });
  const industries = [
    { value: "Tech", label: "Tech" },
    { value: "Health", label: "Health" },
    { value: "Finance", label: "Finance" },
    { value: "Entrepreneurship", label: "Entrepreneurship" },
    { value: "Marketing", label: "Marketing" },
    { value: "Agriculture", label: "Agriculture" },
    { value: "Engineering", label: "Engineering" },
    { value: "Cyber Law", label: "Cyber Law" },
    { value: "Business and Management", label: "Business and Management" }
  ];

//   const handleLogin = async (values) => {
//     try {
//       const requestOptions = {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(values),
//       };
//       const res = await fetch(url, requestOptions);

//       if (!res.ok) {
//         console.error(`Error: ${res.status} - ${res.statusText}`);
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }

//       const data = await res.json();
//       console.log(data)
//       if (data.logedIn) {
//         dispatch(setUserDetails(data));
//         toast.success("Logged in successfully!");
//       } else {
//         toast.error("Login failed. Please check your credentials.");
//       }
//     } catch (error) {
//       console.error("Submission error:", error);
//       toast.error("An error occurred. Please try again.");
//     }
//   };

//   const handleRegister = async (values) => {
  
//     try {
//       const requestOptions = {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(values),
//       };
//       const res = await fetch(url, requestOptions);

//       if (!res.ok) {
//         console.error(`Error: ${res.status} - ${res.statusText}`);
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }

//       const data = await res.json();

//       if (data.register) {
//         toast.success("Registered successfully!");
//       } else {
//         toast.error("Email already exists.");
//       }
//     } catch (error) {
//       console.error("Submission error:", error);
//       toast.error("An error occurred. Please try again.");
//     }
//   };

//   const handleSubmit = (values) => {
//     if (mode === "Login") {
//       handleLogin(values);
//     } else {
//       handleRegister(values);
//     }
//   };




  const getTitleStyle = () =>
    "text-2xl font-bold text-[#008080] mb-4 font-opensans";

  const initialValues =
  
    {
          email: "",
          password: "",
        };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <ToastContainer />
      <Formik
        initialValues={initialValues}
        onSubmit={(values, {resetForm}) => {
        //   handleSubmit(values)
          resetForm()
        }
       
          
      }
        validationSchema={mode === "Register" ? RegisterSchema : LoginSchema}
      >
        {({values, errors, touched, setFieldValue }) => (
          <Form className="bg-white p-6 rounded shadow-md w-full max-w-sm">
            <h1 className={getTitleStyle()}>{mode}</h1>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-opensans"
                htmlFor="email"
              >
                Email
              </label>
              <Field
                name="email"
                placeholder="Email"
                type="email"
                className="mt-2 p-2 border rounded w-full"
              />
              {errors.email && touched.email ? (
                <div className="text-red-500 text-sm mt-1">{errors.email}</div>
              ) : null}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="password">
                Password
              </label>
              <Field
                name="password"
                placeholder="Password"
                type="password"
                className="mt-2 p-2 border rounded w-full"
              />
              {errors.password && touched.password ? (
                <div className="text-red-500 text-sm mt-1">
                  {errors.password}
                </div>
              ) : null}
            </div>
            <div className="mb-4 text-center">
              {mode === "Login" ? (
                <div className="text-gray-700">
                  <span>Don't have an account? </span>
                  <Link
                    href="/register"
                    className="text-blue-500 hover:underline"
                  >
                    Register
                  </Link>
                </div>
              ) : (
                <div className="text-gray-700">
                  <span>Already have an account? </span>
                  <Link href="/login" className="text-blue-500 hover:underline">
                    Login
                  </Link>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#008080] text-white p-2 rounded hover:bg-[#004D4D] transition duration-200"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegLogForm;