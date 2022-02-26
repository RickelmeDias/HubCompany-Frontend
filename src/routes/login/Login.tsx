import './Login.scss';
import React, { useEffect, useState } from "react";
import LoginImage from '../../assets/login/LoginImage.svg'
import { NavLink } from 'react-router-dom';

// FormComponent
import { IFormInput, IFormComponentProps } from '../../components/form/IFormCompnentProps';
import { FormComponent } from '../../components/form/FormComponent';
import Api from '../../services/api';

interface IFormInputs {
  Fullname: string;
  Email: string;
  MobileNumber: string;
  CEP: string;
  Password: string;
}

function Login() {

  const INPUTS: IFormInput[] = [
    {
        title: "*E-mail",
        id: "email",
        placeholder: "Email",
        errorMessage: "Check your e-mail.",
        type: "text",
        required: true,
        regex: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i
    },
    {
        title: "*Password",
        id: "password",
        placeholder: "Password",
        required: true,
        errorMessage: "You need type your password.",
        type: "password"
    },
  ]
  
  const [response, setResponse] = useState<any>();
  const [authorization, setAuthorization] = useState<number>(); 

  const Props: IFormComponentProps = {
      formProps: {
          inputs: INPUTS,
          submit: {
              button: "Login Account",
              method: "POST",
              api: "/authorization"
          },
          response: setResponse
      }
  }
 
  const [runEffect, setRunEffect] = useState(true);

  useEffect(() => {
    Api.get('/user/auth').then((response) => {
      return response;
    }).then((res) => {
      if (res !== undefined && res.status !== undefined) {
        setAuthorization(res.status);
      }
    })
    .catch((err) => {
      if (err.response !== undefined) {
        setAuthorization(err.response.status);
      }else{
        setAuthorization(401);
      }
    });
  }, [runEffect]);

  useEffect(() => {
    if (authorization == 401) {
      if (localStorage.getItem('token') != null) {
        localStorage.removeItem('token');
      }
    }
  }, [authorization]);

  // Reciving 
  useEffect(() => {
    if (response !== null && response !== undefined) {
      if (response.status !== undefined) {
        if (response.status === 201) {
          if (localStorage.getItem('token') == null || localStorage.getItem('token') == undefined) {
            localStorage.setItem('token', response.data.acess_token);
            document.location.href = '/profile';
          }else{
            setRunEffect(!runEffect);
          }
        }
      }
    }
  }, [response]);

  return (
      <div className="Register container mt-5">
      <h1 className="h1 text-center"><strong>Login</strong></h1>
      <div className="d-flex row mt-2 justify-content-around align-items-center sm">
          <div className="col-xl-4 d-flex justify-content-center align-items-center">
            <div className="row justify-content-center align-items-center d-flex">

            <FormComponent formProps={Props.formProps} />

            <div className="d-flex justify-content-center mt-3">
                  <NavLink to="/register"
                  style={{ color: 'inherit', textDecoration: 'none'}}>
                  <small>I do not have an account</small></NavLink>
            </div>
            </div>
          </div>          
          <img src={LoginImage}
              alt="Girl using techs" 
              className="w-75 col-xl-4 mt-5"></img>
        </div>
      </div>
)

}
export default Login;
