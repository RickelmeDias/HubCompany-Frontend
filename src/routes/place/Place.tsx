import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom'
import Api from '../../services/api';
import ApiCEP from '../../services/apiCep';
import './Place.scss';
import GirlPlace from '../../assets/place/GirlPlace.svg'


function Place() {
  const { id } = useParams<'id'>();

  const [responsePlace, setResponsePlace] = useState<any>();
  const [effect, runEffect] = useState<boolean>();

  if (id !== undefined) {
    const PARAMS: any = {
      place_id: parseInt(id)
    }
    
    useEffect(() => {
      Api.get('/place', {
        params: PARAMS
      })
      .then((response) => {
        return response;
      }).then((res) => {
        if (res !== undefined && res.status !== undefined) {
          setResponsePlace({
            status: 200,
            body: res
          });
        }
      })
      .catch((err) => {
        setResponsePlace({
          status: 401, 
          body: err.message
        });
      });
    }, [runEffect]);

    const [CEP, setCEP] = useState<any|null>(null);
    useEffect(() => {
      if (responsePlace != null) {
        ApiCEP.get(`/${responsePlace.body.data.cep}/json/`)
        .then(response => {
            setCEP({
              error: false,
              data: response.data
            })
          })
          .catch(error => {
            setCEP({
              error: true,
              data: error
            })
          })
      }
    }, [responsePlace]);

    const [mainResponsible, setMainResponsible] = useState<any|null>(null);
    useEffect(() => {
      if (responsePlace != null) {
        Api.get(`user/by_id/info?user_id=${responsePlace.body.data.main_responsible}`)
        .then(response => {
          setMainResponsible({
              error: false,
              data: response.data
            })
          })
          .catch(error => {
            setMainResponsible(null)
          })
      }
    }, [responsePlace]);

    // Page:
    if (responsePlace !== undefined && responsePlace.status === 200) {
        return (
          <div id="Place">
            <div className="container mt-5 d-flex justify-content-center align-items-center">
              <div className="mx-2">
              <img src={GirlPlace}
              alt="Girl using techs" 
              className="w-20"></img>
              </div>
              <div className="mx-2">
                <h1 className="h1">{responsePlace.body.data.name}</h1>
                <div>
                  {CEP !== null && CEP.error === true ?
                  (
                    <div>
                      {responsePlace.body.data.cep || ""}
                    </div>
                  ) 
                  : 
                  (
                    <div className="d-flex">
                      {
                        (CEP !== null && CEP.data !== null) ? (
                          <>
                          <h4 className="h5">
                                {(CEP.data.logradouro !== '' && CEP.data.logradouro !== undefined) && CEP.data.logradouro + ', '}{(responsePlace.body.data.number !== '' && responsePlace.body.data.number !== undefined && CEP.data.logradouro !== undefined && CEP.data.logradouro !== '') && responsePlace.body.data.number}
                          </h4><h4 className="h5">
                                {(CEP.data.bairro !== '' && CEP.data.bairro !== undefined) && CEP.data.bairro + ' - '}{(CEP.data.localidade !== '' && CEP.data.localidade !== undefined) ? CEP.data.localidade + '/' + CEP.data.uf : 'CEP:' + responsePlace.body.data.cep || ""}
                                
                          </h4>
                          </>
                          ) : (<div></div>)
                      }
                    </div>
                  )
                  }
                  </div>
                  <p>
                    Owner: {
                    mainResponsible !== null &&
                    mainResponsible.data.name
                    }
                  </p>
              </div>
            </div>
          </div>
        )
      }
  }
  return (
    <div id="Place">
    </div>
  )
  
}
export default Place;
