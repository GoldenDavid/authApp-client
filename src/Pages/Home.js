import React from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  const token = localStorage.getItem("token");


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/login");
  };

  return (
    <section class="vh-100" style={{ backgroundColor: "#B9D6F3" }}>
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col col-xl-10">
            <div class="card" style={{ borderRadius: "1rem" }}>
              <div class="row g-0">
                <div class="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="https://marketplace.canva.com/EAFJhI0EBag/1/0/1600w/canva-blue-cute-dog-quotes-desktop-wallpaper-g8TNhcn4QCQ.jpg"
                    alt="login form"
                    class="img-fluid"
                    style={{ borderRadius: "1rem 0 0 1rem" }}
                  />
                </div>
                <div class="col-md-6 col-lg-7 d-flex align-items-center">
                  <div class="card-body p-4 p-lg-5 text-black">
                    <h1 className="h1 text-center">Home Page</h1>
                      <div class="d-flex align-items-center mb-3 pb-1">
                        <h2>Welcome</h2>
                        <span class="h3 fw-bold mb-0 mx-3">{name}</span>
                        <button
                          onClick={handleLogout}
                          className="btn btn-primary"
                        >
                          Logout
                        </button>
                      </div>
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