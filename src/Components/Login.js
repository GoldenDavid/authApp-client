import {useForm} from "react-hook-form";
import React from "react";
import axios from "../Services/axiosInterceptor";
import { useNavigate, Link } from "react-router-dom";
import {useMutation } from "react-query";
import ReactLoading from "react-loading"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const schema=yup.object({
  email: yup.string().email("Invalid email adress").max(255).required("Email is required"),
  password:yup.string().max(255).required('Password is required')
})
const Login = () => {
  const {register,formState: { errors },handleSubmit}=useForm({resolver:yupResolver(schema)})
  const navigate = useNavigate();
  const handleLogin = async (data) => {
    try {
      const response = await axios.post("api/auth/users/login", data);
      if (response.status === 200) {
        alert(response.data.message);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("name", response.data.name);
        navigate("/");
      }
      return response.json()
    } catch (error) {
      alert(error.response.data.message);
      return error.response.json()
    }
  };

  const {mutate,isLoading,isError}=useMutation(handleLogin)
  if(isLoading) {
    return (
      <div className="position-absolute top-50 start-50 translate-middle">
        <ReactLoading type={"spin"} color={"green"} height={200} width={200}></ReactLoading>
      </div>
    )
  }

  if(isError) {
    return(
      <b>SERVER ERROR</b>
    )
  }

  return (
    <section className="vh-100" style={{ backgroundColor: "#ffdfd3" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQORL4M_enrRCYSMUlsfT8VxctMSUq2OghvZQ&usqp=CAU"
                    alt="login form"
                    className="img-fluid"
                    style={{ borderRadius: "1rem 0 0 1rem" }}
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
                        Sign into your account
                      </h5>
                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          id=""
                          placeholder="Enter Email"
                          className="form-control form-control-lg"
                          name="email"
                          {...register("email")} 
                        />
                        <p style={{color:"red"}}>{errors.email?.message}</p>
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          placeholder="Enter Password"
                          type="password"
                          id="form2Example27"
                          className="form-control form-control-lg"
                          name="password"
                          {...register("password")}
                        />
                        <p style={{color:"red"}}>{errors.password?.message}</p>
                      </div>
                      <div className="pt-1 mb-4">
                        <button
                          className="btn btn-dark btn-lg btn-block"
                          type="submit"
                        >
                          Login
                        </button>
                      </div>
                      <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                        Don't have an account?{" "}
                        <Link to="/register" style={{ color: "#393f81" }}>
                          Register here
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

export default Login;