import { useEffect, useState } from 'react';
import Api from '../../services/api';

import './Profile.scss';
import ApiCEP from '../../services/apiCep';
import React from 'react';
import { FormComponent } from '../../components/form/FormComponent';
import { IFormComponentProps, IFormInput } from '../../components/form/IFormCompnentProps';

import { Avatar, Box, Button, Card, Divider, IconButton, Modal, Stack, Typography } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { styled, Box as BoxSystem } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';

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

function Profile() {
  
  const INPUTS: IFormInput[] = [
    {
        title: "*Fullname",
        id: "name",
        placeholder: "Fullname",
        errorMessage: "You need type your name.",
        required: false,
        type: "text"
    },
    {
        title: "*Phone",
        id: "phone",
        placeholder: "Phone",
        errorMessage: "You need change your phone to brazil pattern.",
        type: "text",
        required: false,
        regex: /\(?\b([0-9]{2,3}|0((x|[0-9]){2,3}[0-9]{2}))\)?\s*[0-9]{4,5}[- ]*[0-9]{4}\b/i
    },
    {
        title: "*CEP",
        id: "cep",
        placeholder: "CEP",
        errorMessage: "Brazil zip-code.",
        type: "text",
        required: false,
        regex: /\b\d{8}\b/g
    },
  ]

  const Props: IFormComponentProps = {
      formProps: {
          inputs: INPUTS,
          submit: {
              button: "Update Information",
              method: "PUT",
              api: "/user",
              reload: true
          },
      }
  }
 
  // Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    Api.get('/user').then((response) => {
      return response;
    }).then((res) => {
      setUserData(res.data);
    })
    .catch((err) => {
      setUserData(null);
    });
  }, []);

  const [CEP, setCEP] = useState<any>(null);
  useEffect(() => {
    if (userData != null) {
      ApiCEP.get(`/${userData.cep}/json/`)
      .then(response => {
          setCEP(response.data)
      })
      .catch(error => {
          console.log(error)
      })
    }
  }, [userData]);

  return (
  <div className="Profile container mt-3 justify-content-center d-flex align-items-center" id="wrapper">
  <h1 className="h2 mb-3">Manage your Profile</h1>
  <div>
    {
    userData != null ? (
    <div>
      <div id="Profile">
        <Card id="card" className="h2">
            <Box sx={{ p: 2, display: 'flex' }} className="d-flex col m-5" id="box">
            <Avatar variant="rounded" src="https://scontent.fcpq5-1.fna.fbcdn.net/v/t39.30808-6/274857951_370742008222315_7929118995737837938_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=730e14&_nc_ohc=Fjr2tv4L7S8AX8FqP5y&_nc_ht=scontent.fcpq5-1.fna&oh=00_AT93z5pJvI-tEp8iCIFzTGF2ROnan1NFjDI4gVWGKEwKIw&oe=621DE184" id="avatar" />
            <Stack spacing={0.5}>
                  <Typography fontWeight={700} className="text-center d-flex mt-4 justify-content-center align-items-center">
                      {userData.name}
                  </Typography>
                  <Typography>
                    Your ID: {userData.id}
                  </Typography> 
                  <Typography variant="body2" color="text.secondary" className="d-flex mb-2 justify-content-center align-items-center text-center">
                      {CEP != null ? CEP.localidade === undefined ? "" : CEP.localidade + "," : ""}{CEP !== null ? CEP.uf : ""}
                  </Typography>
            </Stack>
            <IconButton onClick={handleOpen}>
                <Edit sx={{ fontSize: 24 }} />
            </IconButton>
            </Box>
            <Divider />
        </Card>
      </div>

      <StyledModal
      aria-labelledby="unstyled-modal-title"
      aria-describedby="unstyled-modal-description"
      open={open}
      onClose={handleClose}
      BackdropComponent={Backdrop}
      >
      <BoxSystem sx={style} >
      <Typography id="modal-modal-title" variant="h6" component="h2">
      <h3 className="h3 text-center"><strong>Update User</strong></h3>
      <Divider className='mb-3 mt-3'/>
      <FormComponent formProps={Props.formProps} />
      </Typography>
      </BoxSystem>
      </StyledModal>
    </div>) : (<div></div>)
    }
    </div></div>
  )
}export default Profile;
