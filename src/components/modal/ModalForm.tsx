import { useEffect, useState } from 'react';

import { Divider, Typography } from '@mui/material';
import { styled, Box as BoxSystem } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import { FormComponent } from '../form/FormComponent';
import React from 'react';
import { IFormComponentProps } from '../form/IFormCompnentProps';


export function ModalForm(props: IFormComponentProps, open: boolean) {
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
    minWidth: 300,
    maxWidth: 400,
    bgcolor: '#F1F1F1',
    border: '2px solid #000',
    p: 10,
    px: 10,
    };

    return (
        <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        BackdropComponent={Backdrop}
        open={open}
        >
        <BoxSystem sx={style} >
        <Typography id="modal-modal-title" variant="h6" component="h2">
        <h3 className="h3 text-center"><strong>{props.formProps.title}</strong></h3>
        <Divider className='mb-3 mt-3'/>
        <FormComponent formProps={props.formProps} />
        </Typography>
        </BoxSystem>
        </StyledModal>
    )
}