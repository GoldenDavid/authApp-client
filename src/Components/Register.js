import React from "react";
import {useForm} from "react-hook-form"
import axios from "../Services/axiosInterceptor";
import { useNavigate, Link } from "react-router-dom";
import { useMutation } from "react-query";
import ReactLoading from "react-loading"
const Register = () => {
  const navigate = useNavigate();
  const {register,handleSubmit,errors}=useForm()

  const handleRegister = async (data) => {
    try {
      const response = await axios.post("api/auth/users/register", data);
      if (response.status === 201) {
        alert(response.data.message);
        navigate("/login");
      }
      return response.json()
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const {mutate,isLoading,isError} =useMutation(handleRegister)
  if(isLoading) {
    return (
      <ReactLoading type={"spin"} color={"green"} height={200} width={200} ></ReactLoading>
    )
  }

  if(isError) {
    return (
      <b>SERVER IS ERROR</b>
    )
  }
  return (
    <section className="vh-100" style={{ backgroundColor: "#95bfb0" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="https://images.squarespace-cdn.com/content/v1/5ceafba94ec8d50001998343/1604009374985-6W4RI3C26PEDRYHOAGQQ/Compassionate+Greeting_AdobeStock_280792377Handshake.jpg?format=1500w"
                    alt="login form"
                    className="img-fluid"
                    style={{ borderRadius: "1rem 0 0 1rem"}}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form onSubmit={handleSubmit(mutate)}>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <i
                          className="fas fa-cubes fa-2x me-3"
                          style={{ color: " #ff6219" }}
                        ></i>
                        <span className="h1 fw-bold mb-0">Welcome</span>
                      </div>

                      <h5
                        className="fw-normal mb-3 pb-3"
                        style={{ letterSpacing: "1px" }}
                      >
                        Create A New Account
                      </h5>

                      <div className="form-outline mb-4">
                        <input
                          placeholder="Enter Your Name"
                          type="text"
                          className="form-control form-control-lg"
                          name="name"
                          {...register("name")}
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          placeholder="Enter Valid Email Address"
                          type="email"
                          className="form-control form-control-lg"
                          name="email"
                          {...register("email")}
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          placeholder="Enter Password"
                          type="password"
                          className="form-control form-control-lg"
                          name="password"
                          {...register("password")}
                        />
                      </div>

                      <div className="pt-1 mb-4">
                        <button
                          className="btn btn-dark btn-lg btn-block"
                          type="submit"
                        >
                          Register
                        </button>
                      </div>

                      <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                        Already Have an Account?
                        <Link to="/login" style={{ color: "#393f81" }}>
                          Login Here
                        </Link>
                      </p>
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

export default Register;