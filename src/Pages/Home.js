import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "../Services/axiosInterceptor";
import {useForm} from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation } from "react-query";
import ReactLoading from "react-loading"
import * as yup from "yup"

const Home = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  const token = localStorage.getItem("token");
  const schema=yup.object({
    newpassword:yup.string().required("Password is required").matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
    "Password must contain at least 8 characters, one uppercase, one number and one special case character"),
    confirmpassword:yup.string().required("Confirm password is required").oneOf([yup.ref('newpassword'),null],"Password must match")
  })
  const {register,handleSubmit,formState:{errors}}=useForm({resolver:yupResolver(schema)})
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/login");
  };

  const handleChangePassword = async(data) => {
    const response = await axios.post("api/auth/change-password", data, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    alert(response.data.message);
    if (response.status === 200) {
      handleLogout();
    }
  };
  const {mutate,isLoading,isError} =useMutation(handleChangePassword)
  if(isLoading) {
    return (
      <div className="position-absolute top-50 start-50 translate-middle">
        <ReactLoading type={"spin"} color={"green"} height={200} width={200}></ReactLoading>
      </div>
    )
  }

  return (
    <section className="vh-100" style={{ backgroundColor: "#B9D6F3" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="https://marketplace.canva.com/EAFJhI0EBag/1/0/1600w/canva-blue-cute-dog-quotes-desktop-wallpaper-g8TNhcn4QCQ.jpg"
                    alt="login form"
                    className="img-fluid"
                    style={{ borderRadius: "1rem 0 0 1rem" }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <h1 className="h1 text-center">Home Page</h1>
                    <form onSubmit={handleSubmit(mutate)}>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <h2>Welcome</h2>
                        <span className="h3 fw-bold mb-0 mx-3">{name}</span>
                        <button
                          onClick={handleSubmit(handleLogout)}
                          className="btn btn-primary"
                        >
                          Logout
                        </button>
                      </div>

                      <h4
                        className="fw-normal mb-3 pb-3"
                        style={{ letterSpacing: "1px" }}
                      >
                        Change Password
                      </h4>

                      <div className="form-outline mb-4">
                        <input
                          placeholder="Enter New Password"
                          name="newpassword"
                          type="password"
                          className="form-control form-control-lg"
                          {...register("newpassword")}
                        />
                      </div>
                      <p style={{color:"red"}}>{errors.newpassword?.message}</p>


                      <div className="form-outline mb-4">
                        <input
                          placeholder="Confirm Your Password"
                          type="password"
                          name="confirmpassword"
                          className="form-control form-control-lg"
                          {...register("confirmpassword")}
                        />
                      </div>
                      <p style={{color:"red"}}>{errors.confirmpassword?.message}</p>


                      <div className="pt-1 mb-4">
                        <button
                          className="btn btn-dark btn-lg btn-block"
                          type="submit"
                        >
                          Change Password
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;