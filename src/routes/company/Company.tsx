import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Api from '../../services/api';
import './Company.scss';

import { Avatar, Box, Button, Card, Divider, IconButton, Modal, Stack, Typography } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { styled, Box as BoxSystem } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import React from 'react';
import { FormComponent } from '../../components/form/FormComponent';
import { IFormComponentProps, IFormInput } from '../../components/form/IFormCompnentProps';

import CompanyImage from '../../assets/company/CompanyImage.svg';

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

function Company() {
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
        title: "*CNPJ",
        id: "new_cnpj",
        placeholder: "CNPJ",
        errorMessage: "CNPJ is 14 digits.",
        type: "text",
        required: false,
        regex: /\b\d{14}\b/g
    },
    {
        title: "*Description",
        id: "description",
        placeholder: "Description",
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
              api: "/company",
              reload: true
          },
          json: [
            ['cnpj', id, 'string']
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
              api: "/company/responsibles",
              reload: true
          },
          json: [
            ['company_id', id, 'number']
          ]
      }
  }

  
  const handleOpen = (e: any, id: string) => {
    setId(id);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  
  const handleOpenResponsible = (e: any, id: number) => {
    setId(id);
    setOpenResponsible(true);
  };
  const handleCloseResponsible = () => setOpenResponsible(false);

  const [response, setResponse] = useState<any>();
  const [effect, runEffect] = useState<boolean>();

  useEffect(() => {
    Api.get('/user/companies').then((response) => {
      return response;
    }).then((res) => {
      if (res !== undefined && res.status !== undefined) {
        setResponse(res);
      }
    })
    .catch((err) => {
      setResponse({
        status: 401, 
        err: err
      });
    });
  }, [runEffect]);

  return (
    <div id="Company container">
      <img src={CompanyImage} width="200" className="my-3" alt="company image"></img>
      <h1 className="h2 text-center">Your Companies</h1>
      {
        (response !== undefined && response.status == 200 && 
          response.data.length > 0) ? 
          (
            <div className="container d-flex justify-content-center align-items-center flex-wrap">{
              response.data.map((company: any) => { 
                return (
                  <div key={company.id}>
                    <div className="card m-2" key={company.id} id="card-company">
                      <div className="card-body">
                      <div className="card-title">{company.name.substring(0,20)}
                        <IconButton onClick={(e) =>{
                          handleOpen(e, company.cnpj)
                        }}>
                        <Edit sx={{ fontSize: 18 }}/>
                        </IconButton>
                      </div>
                      <p className="card-text">{company.cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")}</p>
                      <p className="card-text">{company.description.substring(0,20)}</p>
                      <NavLink to={'/companies/' + company.id}>
                      <button className="btn btn-primary mt-3" id="btn-more-about">See more</button>
                      </NavLink>
                      <button id="btn-add"
                      className="mt-3" onClick={(e) =>{
                          handleOpenResponsible(e, company.id)
                      }}
                      >Add new responsible</button>
                      </div>
                    </div>
                  </div>
                )
              })  
            }  
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
          ) : 
          (
            <div><h3 className="h3">You do not have companies</h3></div>
          )
      }
    <div className="d-flex justify-content-center mt-3">
    <NavLink to='../companies/create'
    style={{ color: 'inherit', textDecoration: 'none'}}>
    <strong>+</strong>  Click here to create a new company.</NavLink>
    </div>
    </div>
  )
}
export default Company;
