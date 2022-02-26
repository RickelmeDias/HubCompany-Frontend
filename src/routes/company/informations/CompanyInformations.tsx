import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom'
import Api from '../../../services/api';
import './CompanyInformations.scss';

import React from 'react';
import PlaceIcon from '@mui/icons-material/Place';
import { IFormComponentProps, IFormInput } from '../../../components/form/IFormCompnentProps';
import { Avatar, Box, Button, Card, Divider, IconButton, Modal, Stack, Typography } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { styled, Box as BoxSystem } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';


import CompanyImage from '../../assets/company/CompanyImage.svg';
import { FormComponent } from '../../../components/form/FormComponent';

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: 400,
  bgcolor: '#F1F1F1',
  border: '2px solid #000',
  p: 10,
  px: 10,
};

function CompanyInformations() {
  const { id: slug_id } = useParams<'id'>();
  
  // Modal
  const [open, setOpen] = useState(false);
  const [openResponsible, setOpenResponsible] = useState(false);
  const [id, setId] = useState<any>();

  const INPUTS: IFormInput[] = [
  {
  title: "*Name",
  id: "name",
  placeholder: "Name",
  errorMessage: "You need type your name.",
  required: false,
  type: "text"
  },
  {
  title: "*CEP",
  id: "cep",
  placeholder: "CEP",
  errorMessage: "CEP is 8 digits.",
  type: "text",
  required: false,
  regex: /\b\d{8}\b/g
  },
  {
  title: "*Number",
  id: "number",
  placeholder: "Number",
  errorMessage: "Check this field.",
  type: "text",
  required: false,
  }
  ]

  const Props: IFormComponentProps = {
    formProps: {
    inputs: INPUTS,
    submit: {
    button: "Update Information",
    method: "PUT",
    api: "/place",
    reload: true
    },
    json: [
    ['placeId', id, 'number']
    ]
    }
  }

  const INPUTS_RESPONSIBLES: IFormInput[] = [
  {
  title: "*Responsible Email",
  id: "email",
  placeholder: "Responsible Email",
  errorMessage: "Add the responsible email.",
  required: true,
  type: "text"
  },
  ]

  const PropsResponsibles: IFormComponentProps = {
    formProps: {
    inputs: INPUTS_RESPONSIBLES,
    submit: {
    button: "Add responsible",
    method: "PUT",
    api: "/place/responsibles",
    reload: true
    },
    json: [
    ['place_id', id, 'number']
    ]
    }
  }


  const handleOpen = (e: any, id: number) => {
  setId(id);
  setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleOpenResponsible = (e: any, id: number) => {
  setId(id);
  setOpenResponsible(true);
  };
  const handleCloseResponsible = () => setOpenResponsible(false);

  const [responseCompany, setResponseCompany] = useState<any>();
  const [responsePlace, setResponsePlace] = useState<any>();
  const [effect, runEffect] = useState<boolean>();

  if (slug_id !== undefined) {
    const PARAMS: any = {
      company_id: parseInt(slug_id)
    }
    
    useEffect(() => {
      Api.get('/company', {
          params: PARAMS
      })
      .then((response) => {
        return response;
      }).then((res) => {
        if (res !== undefined && res.status !== undefined) {
          setResponseCompany(res);
        }
      })
      .catch((err) => {
        setResponseCompany({
          status: 401, 
          err: err.message
        });
      });
    }, [runEffect]);

    useEffect(() => {
      Api.get('/company/places', {
          params: PARAMS
      })
      .then((response) => {
        return response;
      }).then((res) => {
        if (res !== undefined && res.status !== undefined) {
          setResponsePlace(res);
        }
      })
      .catch((err) => {
        setResponsePlace({
          status: 401, 
          err: err.message
        });
      });
    }, [runEffect]);
  }

  if (responseCompany !== undefined) {
    if (responseCompany.data.length === undefined || responseCompany.data.length === 0) {
      const company = responseCompany.data;
      return (
        <div id="Company" className="mb-5">
          {(
            responseCompany !== undefined && (
                (
                  <div className="container">
                    <div className="d-flex flex-wrap justify-content-center align-items-center">
                      <h1 className="text-center h2 m-2">{company.name.toUpperCase()}</h1>
                      <h2 className="text-center h2 m-2">{company.cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")}</h2>
                    </div>
                    <h4 className="text-center h5">Company Places</h4>
                    <div className="d-flex justify-content-center align-items-center flex-wrap">
                    {
                    (responsePlace !== undefined && 
                    responsePlace.data !== undefined && 
                    responsePlace.data.length !== undefined) ? 

                    (responsePlace.data.map((place:any) => {
                      return (
                        <div key={place.id}>
                          <div className="card m-2" key={place.id} id="card-company">
                            <div className="card-body">
                            <div className="card-title">{place.name.substring(0,20)}
                              <IconButton className="place-icon" onClick={(e) =>{
                              handleOpen(e, place.id)
                              }}>
                              <Edit sx={{ fontSize: 18, color: 'black' }} className="place-icon"/>
                              <PlaceIcon sx={{ fontSize: 18, color: 'black' }} className="place-icon"/>
                              </IconButton>
                            </div>
                            <p className="card-text">{place.cep}</p>
                              <NavLink to={'../place/' + place.id}>
                              <button className="btn btn-primary" id="btn-more-about">See more</button>
                              </NavLink>
                              <button id="btn-add"
                              className="mt-3" onClick={(e) =>{
                              handleOpenResponsible(e, place.id)
                              }}
                              >Add new responsible</button>
                            </div>
                          </div>
                        </div>
                      )
                      })
                    ) : ( <div> {
                      (responsePlace !== 200) ? 
                      ( <div><h3 className="h3">You do not have places for this company</h3></div>) :
                      (
                      <div key={responsePlace.data.id}>
                      <div className="card m-2" key={responsePlace.data.id} id="card-company">
                        <div className="card-body">
                        <div className="card-title">{responsePlace.data.name.substring(0,20)}
                          <IconButton className="place-icon" onClick={(e) =>{
                          handleOpen(e, responsePlace.data.id)
                          }}>
                          <Edit sx={{ fontSize: 18, color: 'black' }} className="place-icon"/>
                          <PlaceIcon sx={{ fontSize: 18, color: 'black' }} className="place-icon"/>
                          </IconButton>
                        </div>
                        <p className="card-text">{responsePlace.data.cep}</p>
                          <NavLink to={'../place/' + responsePlace.data.id}>
                          <a href="#" className="btn btn-primary" id="btn-more-about">See more</a>
                          </NavLink>
                          <button id="btn-add"
                          className="mt-3" onClick={(e) =>{
                          handleOpenResponsible(e, responsePlace.data.id)
                          }}
                          >Add new responsible</button>
                        </div>
                      </div>
                    </div>)
                    } </div> )
                    }
                    </div>
                  </div>
                )
            ))}
        <div className="m-5">
        <NavLink to={'../place/create/'+slug_id}
        style={{ color: 'inherit', textDecoration: 'none'}}>
        <strong>+</strong>  Click here to create a new <strong>place</strong>.</NavLink>
        </div>
        {/* Modal Edit */}
        <StyledModal
              aria-labelledby="unstyled-modal-title"
              aria-describedby="unstyled-modal-description"
              open={open}
              onClose={handleClose}
              BackdropComponent={Backdrop}
              >
              <BoxSystem sx={style} >
              <h3 className="h3 text-center"><strong>Update User</strong></h3>
              <Divider className='mb-3 mt-3'/>
              <FormComponent formProps={Props.formProps} />
              </BoxSystem>
              </StyledModal>

              {/* Modal Add Responsible */}
              <StyledModal
              aria-labelledby="unstyled-modal-title"
              aria-describedby="unstyled-modal-description"
              open={openResponsible}
              onClose={handleCloseResponsible}
              BackdropComponent={Backdrop}
              >
              <BoxSystem sx={style} >
              <h3 className="h3 text-center"><strong>Add new Responsible</strong></h3>
              <Divider className='mb-3 mt-3'/>
              <FormComponent formProps={PropsResponsibles.formProps} />
              </BoxSystem>
              </StyledModal>
        </div>
      )
    }else{
      return (
        <div id="Company">
          {(
            responseCompany !== undefined && (
              responseCompany.data.map((company:any) => {
                return (
                  <div className="card" key={company.id}>
                    <div className="card-body">
                      <h5 className="card-title">{company.name}</h5>
                      <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                      <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
                  </div>
                )})
            ))}
        <div className="m-5">
        <NavLink to={'../place/create/'+slug_id}
        style={{ color: 'inherit', textDecoration: 'none'}}>
        <strong>+</strong>  Click here to create a new <strong>place</strong>.</NavLink>
        </div>
        {/* Modal Edit */}
        <StyledModal
              aria-labelledby="unstyled-modal-title"
              aria-describedby="unstyled-modal-description"
              open={open}
              onClose={handleClose}
              BackdropComponent={Backdrop}
              >
              <BoxSystem sx={style} >
              <h3 className="h3 text-center"><strong>Update User</strong></h3>
              <Divider className='mb-3 mt-3'/>
              <FormComponent formProps={Props.formProps} />
              </BoxSystem>
              </StyledModal>

              {/* Modal Add Responsible */}
              <StyledModal
              aria-labelledby="unstyled-modal-title"
              aria-describedby="unstyled-modal-description"
              open={openResponsible}
              onClose={handleCloseResponsible}
              BackdropComponent={Backdrop}
              >
              <BoxSystem sx={style} >
              <h3 className="h3 text-center"><strong>Add new Responsible</strong></h3>
              <Divider className='mb-3 mt-3'/>
              <FormComponent formProps={PropsResponsibles.formProps} />
              </BoxSystem>
              </StyledModal>
        </div>
      )
    }
  }else{
    return (
      <div></div>
    )
  }

  

}
export default CompanyInformations;
