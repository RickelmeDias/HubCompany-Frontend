// React
import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';

// Services
import Api from "../../services/api";

// Styles
import './FormComponent.scss'

// Interfaces
import { IFormInput, IFormComponentProps } from './IFormCompnentProps';
import { InterestsOutlined, LocalTaxiOutlined } from '@mui/icons-material';
interface IInputInformations {
    id: string;
    value: string;
}

// Component
export function FormComponent (props: IFormComponentProps) {
    const [_formValues, _setFormValues] = useState<IInputInformations[]>();
    const [_response, _setResponse] = useState<any>();
    const [_json, _setJson] = useState<any>();
    const [_errorMessage, _setErroMessage] = useState<string>("");
    const [_minInputMustFill, _setMinInputMustFill] = useState<number>(1);
    
    useEffect(() => {
        // Redirect when get sucess on submit if necessary.
        if (props.formProps.submit.redirect !== null && props.formProps.submit.redirect !== undefined) {
            if (_response !== undefined && _response !== null && _response.status == 201) {
                document.location.href = '..' + props.formProps.submit.redirect;
            }
        }
        //Reload
        if (_response !== undefined && _response !== null && props.formProps.submit.reload) {
            location.reload();
        }
        
        if (props.formProps.response !== undefined && props.formProps.response !== null) {
            props.formProps.response(_response);
        }

    }, [_response]);

    useEffect(() => {
        if (_json != undefined) {
            if (props.formProps.submit.method === "POST") {
                Api.post(props.formProps.submit.api, _json)
                .then((response) => { 
                    if (response != undefined) 
                   { _setResponse(response);
                    return response;}
                })
                .catch((err) => {
                    _setErroMessage("Field bad request, try again.");
                    _setResponse(null);
                    const alertDiv = document.querySelector('div.alert');
                    alertDiv?.removeAttribute('hidden');
                    // if (err.response !== undefined && err.response.status !== 500 && err.response.status !== 401 && err.response.status !== 400 && err.response.status !== 403) {
                    //     const fieldError = err.response.data.error[0].field;
                    //     const inputError: any = document.querySelector(`input#${fieldError}`);
                    //     if (inputError != null && inputError != undefined) {
                    //         inputError.value = "";
                    //     }
                    //     const alertDiv = document.querySelector('div.alert');
                    //     alertDiv?.removeAttribute('hidden');
                    // _setErroMessage(err.response.data.error[0].message);
                    // _setResponse(null);
                    // }
                });
            }
            
            if (props.formProps.submit.method === "PUT") {
                Api.put(props.formProps.submit.api, _json)
                .then((response) => { 
                    if (response != undefined) 
                   { _setResponse(response);
                    return response;}
                })
                .catch((err) => {
                    _setErroMessage("Field bad request, try again.");
                    const alertDiv = document.querySelector('div.alert');
                    alertDiv?.removeAttribute('hidden');
                    // if (err.response !== undefined && err.response.status !== 500 && err.response.status !== 401) {
                    //     const fieldError = err.response.data.error[0].field;
                    //     const inputError: any = document.querySelector(`input#${fieldError}`);
                    //     if (inputError != null && inputError != undefined) {
                    //         inputError.value = "";
                    //     }
                    //     const alertDiv = document.querySelector('div.alert');
                    //     alertDiv?.removeAttribute('hidden');
                    //     _setErroMessage(err.response.data.error[0].message);
                    //     _setResponse(null);
                    // }
                });
            }
        }
    }, [_json]);
    
    const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formInputs: any = document.querySelectorAll("input.form-control[required]");
        const _maxInputMustFill: any = document.querySelectorAll("input.form-control").length;
    
        if (_formValues !== undefined && _formValues !== null){
            // Create json based on "id" easily to modulate the form
            let json = "{";

            for (let k in _formValues) {
                const i = _formValues[k];
                json += `"${i.id}": "${i.value}",`;
            }
            
            if ((props.formProps.json !== null && props.formProps.json !== undefined) && (props.formProps.json.length > 0)) {
                for (const arrKeyValue of props.formProps.json) {
                    if (arrKeyValue[2] === 'number') {
                        json += `"${arrKeyValue[0]}": ${arrKeyValue[1]},`;
                    }else{
                        json += `"${arrKeyValue[0]}": "${arrKeyValue[1]}",`;
                    }
                }

            }
            json = json.slice(0, -1)
            json += "}";
            // console.log(json)

            if (formInputs.length > 1) {
                _setMinInputMustFill(formInputs.length);
            }

            const canSubmit = (_formValues.length >= _minInputMustFill && _formValues.length <= _maxInputMustFill);
            
            if (canSubmit) {
                const body = JSON.parse(json);
                _setJson(body);
            }else{
                const alertDiv = document.querySelector('div.alert');
                alertDiv?.removeAttribute('hidden');
                _setErroMessage(`You need fill ${_minInputMustFill-_formValues.length} fields yet.`);
            }
        }else{
            const alertDiv = document.querySelector('div.alert');
            alertDiv?.removeAttribute('hidden');
            _setErroMessage(`Check the fields.`);
        }
    }

    const handleChange = (event: any) => {
        const input = event.target;
        const {id, value} = input;

        const i: IInputInformations = {
            id: input.id,
            value: input.value
        }
        if (validateRegex(id, value)) {
            // Adding and updating formValues.
            if (_formValues !== undefined) {
                const newFormValuesIndex = _formValues.findIndex(input => input.id == i.id);
                if (newFormValuesIndex >= 0) {
                    let newFormValues = _formValues;
                    newFormValues[newFormValuesIndex].value = i.value;
                    _setFormValues(newFormValues);
                }else{
                    let newFormValues = _formValues;
                    newFormValues.push(i);
                    _setFormValues(newFormValues);
                }        
            }else{
                _setFormValues([i]);
            }

            if (input.classList.contains('is-invalid')) {
                input.classList.remove('is-invalid');
            }
        }else{
            // Removing form formValues when not correctly filled:
            if (_formValues !== undefined) {
                const newFormValuesIndex = _formValues.findIndex(input => input.id == i.id);
                if (newFormValuesIndex >= 0) {
                    let newFormValues = _formValues;
                    newFormValues.splice(newFormValuesIndex, 1);
                    _setFormValues(newFormValues);
                }
            }
            if (!input.classList.contains('is-invalid')){
                input.classList.add('is-invalid');
            }
        }
    }
    
    function validateRegex(id: any, value: any): Boolean {
        const r = props.formProps.inputs.filter(input => input.id === id)[0].regex;

        if (r === undefined || r === null) {
            const Regex = RegExp(/^.{2,}$/);
            return Regex.test(value);
        }else{
            const Regex = RegExp(r);
            return Regex.test(value);
        }
    }

    return (
        <div id="form-container" className="col">
            <div className="alert alert-danger text-center row" role="alert" hidden>{_errorMessage}</div>
            <form onSubmit={handleSubmit} className="needs-validation d-flex justify-content-center row" id="create-account" noValidate>
            {
                props.formProps.inputs.map((input: IFormInput) => {
                    if (input.required === true) {
                        return (
                            <div className="form-floating mb-3" key={input.id}>
                                <input className="form-control" id={input.id} type={input.type} 
                                placeholder={input.placeholder} required
                                onChange={handleChange}/>            
                                <label htmlFor={input.id}>{input.title}</label>
                                <div className="invalid-feedback">{input.errorMessage}</div>
                            </div>
                            ) 
                    }else{
                        return (
                            <div className="form-floating mb-3" key={input.id}>
                                <input className="form-control" id={input.id} type={input.type} 
                                placeholder={input.placeholder} 
                                onChange={handleChange}/>            
                                <label htmlFor={input.id}>{input.title}</label>
                                <div className="invalid-feedback">{input.errorMessage}</div>
                            </div>
                            )
                    }
                    
                })
            }

            <Button size="large" variant="contained" id="create-account-button" type="submit" className="mt-3">{props.formProps.submit.button}</Button>
            </form>
        </div>
    )
}
