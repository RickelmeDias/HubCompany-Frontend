import './CompanyCreate.scss';
import React from 'react';
import CompanyCreateImage from '../../../assets/company/CompanyCreateImage.svg'
import { NavLink } from 'react-router-dom';

// FormComponent
import { IFormInput, IFormComponentProps } from '../../../components/form/IFormCompnentProps';
import { FormComponent } from '../../../components/form/FormComponent';

function CompanyCreate() {

  const INPUTS: IFormInput[] = [
    {
        title: "*Name",
        id: "name",
        placeholder: "Name",
        errorMessage: "You need type your company name.",
        type: "text",
        required: true
    },
    {
        title: "*CNPJ",
        id: "cnpj",
        placeholder: "CNPJ",
        errorMessage: "CNPJ is 14 digits",
        type: "text",
        required: true,
        regex: /\b\d{14}\b/g
    },
    {
        title: "*Description",
        id: "description",
        placeholder: "Description",
        errorMessage: "Write something for description.",
        type: "text",
        required: true,
    },
  ]
    
  const Props: IFormComponentProps = {
      formProps: {
          inputs: INPUTS,
          submit: {
              button: "Create Company",
              method: "POST",
              api: "/company",
              redirect: "/companies"
          }
      }
  }


    return (
      <div className="CompanyCreate container mt-5">
      <h1 className="h1 text-center">Create your company <br/> <strong>NOW!</strong></h1>
      <div className="d-flex row mt-2 justify-content-around align-items-center sm">
          <div className="col-xl-4 d-flex justify-content-center align-items-center">
            <div className="row justify-content-center align-items-center d-flex">

            <FormComponent formProps={Props.formProps} />

            </div>
          </div>          
          <img src={CompanyCreateImage}
              alt="Girl using techs" 
              className="w-75 col-xl-4 mt-5"></img>
        </div>
      </div>
    );
}
export default CompanyCreate;
