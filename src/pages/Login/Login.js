import React, { useState } from "react";
import {useHistory,} from "react-router-dom";
import "./Login.css";
import Swal from "sweetalert";


async function loginUser(credentials) {
  return fetch('https://office.webcodecare.com/api/client_login', {
    method: 'POST',
    dataType: "json",
    mode: 'no-cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': document.head.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
    },
    
    
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }


export default function Login(props) {
  const [credentialsInfo, setCredentialsInfo] = useState({
    email:'',
   password:'',
})
  const externalImg =
    "https://businesso.xyz/assets/front/img/user/breadcrumb.jpg";
  
  const seller = props.user.seller;
  const buyer = props.user.buyer;
  const client = props.user.client;
  let email = credentialsInfo.email;
  let password = credentialsInfo.password;
  let history = useHistory();

  //console.log(seller.email)

  const handleChange = e => {
    setCredentialsInfo({...credentialsInfo, [e.target.name]: e.target.value })
}

const handleSubmit = async (e) => {
  e.preventDefault();
  const response = await loginUser({
    email,
    password
  });

  if ("account_mode" in response) {
    Swal("Success", response.message, "success", {
      buttons: false,
      timer: 2000,
    });
    
    // alert(response.message)
    localStorage.setItem("account_mode", response["account_mode"]);
    localStorage.setItem("user", JSON.stringify(response["data"]));
    // window.location.href = "/portfolio";
  } else {
    Swal("Failed", response.message, "error");
  }
   console.log('hi');
  console.log(response);


   if(credentialsInfo.email == seller.email && credentialsInfo.password == seller.password){
    history.push("/seller-dashboard")
   } else if (credentialsInfo.email === buyer.email && credentialsInfo.password === buyer.password){
     history.push("/buyer-dashboard")
   } else if (credentialsInfo.email === client.email && credentialsInfo.password === client.password){
     history.push("/client-dashboard")
   }else{
      alert("Invalid email")
   }
}

  return (
    <>
      {/* ---------- Breadcrumb Section -------- */}
      <section
        className="breadcrumb-section bg-img-c lazy entered loaded"
        data-bg={externalImg}
        data-ll-status="loaded"
        style={{ backgroundImage: `url(${externalImg})` }}
      >
        <div className="container">
          <div className="breadcrumb-text">
            <h1 className="page-title">Login</h1>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>Login</li>
            </ul>
          </div>
        </div>
        <div className="breadcrumb-shapes">
          <div className="one"></div>
          <div className="two"></div>
        </div>
      </section>

      {/* ---------   Login Part ------------ */}
      <div className="user-area-section section-gap">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="user-form">
                <div className="title mb-3">
                  <h4>Login</h4>
                </div>
                <form
                  data-v-32ab5d56=""
                  novalidate="novalidate"
                  class="BaseForm register-form"
                  data-hs-cf-bound="true"
                  onSubmit={handleSubmit}
                >
                  {/* <input
                    type="hidden"
                    name="_token"
                    value="z7BruS3WKu5ypQR6AxCACvkIRicWxBWKdlmwsP6F"
                  />{" "} */}
                  {/* <input type="hidden" name="user_id" value="174" /> */}
                  <div className="form_group">
                    <label>Email *</label>
                    <input
                      type="email"
                      placeholder="Enter Email Address"
                      className="form_control"
                      name="email"
                      onChange={e => handleChange(e)}
                    />
                  </div>
                  <div className="form_group">
                    <label>Password *</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Enter Password"
                      onChange={e => handleChange(e)}
                    />
                  </div>
                  {/* <div className="form_group form_inline">
                    <div>
                      <label htmlFor="checkbox1"></label>
                    </div>
                    <a href="#">
                      Lost your password?
                    </a>
                  </div> */}
                  <div className="form_group"></div>
                  <div className="form_group">
                    {/* <button type="submit" className="btn" onClick={(e) => handleSubmit(e)}>
                      Login Now
                    </button> */}
                    <button
                    className="btn" 
              data-v-1ea8460d=""
              data-v-32ab5d56=""
              tabindex="1"
              type="submit"
              block=""
              color="primary"
            >
              <span class="v-btn__content"> Login Now</span>
            </button>
                  </div>
                  {/* <div className="new-user text-center">
                    <p className="text">
                      New User?{" "}
                      <a href="https://businesso.xyz/rangs/user/signup">
                        Do not have an account?
                      </a>
                    </p>
                  </div> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
