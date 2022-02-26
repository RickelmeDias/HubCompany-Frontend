import './Register.scss';
import React from 'react';
import RegisterImage from '../../assets/register/RegisterImage.svg'
import { NavLink } from 'react-router-dom';

// FormComponent
import { IFormInput, IFormComponentProps } from '../../components/form/IFormCompnentProps';
import { FormComponent } from '../../components/form/FormComponent';

function Register() {

  const INPUTS: IFormInput[] = [
    {
        title: "*Fullname",
        id: "name",
        placeholder: "Fullname",
        errorMessage: "You need type your name.",
        type: "text",
        required: true
    },
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
        title: "*Phone",
        id: "phone",
        placeholder: "Phone",
        errorMessage: "You need change your phone to brazil pattern.",
        type: "text",
        required: true,
        regex: /\(?\b([0-9]{2,3}|0((x|[0-9]){2,3}[0-9]{2}))\)?\s*[0-9]{4,5}[- ]*[0-9]{4}\b/i
    },
    {
        title: "*CEP",
        id: "cep",
        placeholder: "CEP",
        errorMessage: "Brazil zip-code.",
        type: "text",
        required: true,
        regex: /\b\d{8}\b/g
    },
    {
        title: "*Password",
        id: "password",
        placeholder: "Password",
        errorMessage: "You need type your password.",
        type: "password",
        required: true
    },
  ]
    
  const Props: IFormComponentProps = {
      formProps: {
          inputs: INPUTS,
          submit: {
              button: "Create Account",
              method: "POST",
              api: "/user",
              redirect: "/login"
          }
      }
  }


    return (
      <div className="Register container mt-5">
      <h1 className="h1 text-center">Create your account <br/> and <strong>start NOW!</strong></h1>
      <div className="d-flex row mt-2 justify-content-around align-items-center sm">
          <div className="col-xl-4 d-flex justify-content-center align-items-center">
            <div className="row justify-content-center align-items-center d-flex">

            <FormComponent formProps={Props.formProps} />

            <div className="d-flex justify-content-center mt-3">
                  <NavLink to="/login"
                  style={{ color: 'inherit', textDecoration: 'none'}}>
                  <small>I already have an account</small></NavLink>
            </div>
            </div>
          </div>          
          <img src={RegisterImage}
              alt="Girl using techs" 
              className="w-75 col-xl-4 mt-5"></img>
        </div>
      </div>
    );
}
export default Register;
