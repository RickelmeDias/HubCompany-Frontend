import './PlaceCreate.scss';
import React from 'react';
import MapPlace from '../../../assets/place/MapPlace.svg'
import { NavLink, useParams } from 'react-router-dom';

// FormComponent
import { IFormInput, IFormComponentProps } from '../../../components/form/IFormCompnentProps';
import { FormComponent } from '../../../components/form/FormComponent';

function PlaceCreate() {
  const { id } = useParams<'id'>();
  
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
        title: "*CEP",
        id: "cep",
        placeholder: "CEP",
        errorMessage: "CEP have 8 digits",
        type: "text",
        required: true,
        regex: /\b\d{8}\b/g
    },
    {
        title: "*Number",
        id: "number",
        placeholder: "Number",
        errorMessage: "Write your place local number.",
        type: "text",
        required: true,
    }
  ]
    
  const Props: IFormComponentProps = {
      formProps: {
          inputs: INPUTS,
          submit: {
              button: "Create Place",
              method: "POST",
              api: "/place",
              redirect: "/../companies"
          },
          json: [["company_id", id, "number"]]
      }
  }


    return (
      <div className="CompanyCreate container mt-5">
      <h1 className="h1 text-center">Create your new place <br/> <strong>NOW!</strong></h1>
      <div className="d-flex row mt-2 justify-content-around align-items-center sm">
          <div className="col-xl-4 d-flex justify-content-center align-items-center">
            <div className="row justify-content-center align-items-center d-flex">

            <FormComponent formProps={Props.formProps} />

            </div>
          </div>          
          <img src={MapPlace}
              alt="Girl using techs" 
              className="w-75 col-xl-4 mt-5"></img>
        </div>
      </div>
    );
}
export default PlaceCreate;
