import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Api from './services/api';

// Components
import Header from './components/header/Header';

// Routes 
import Home from './routes/home/Home';
import Register from './routes/register/Register';
import Login from './routes/login/Login';
import Profile from './routes/profile/Profile';
import Company from './routes/company/Company';
import CompanyInformations from './routes/company/informations/CompanyInformations';
import Place from './routes/place/Place';
import CompanyCreate from './routes/company/create/CompanyCreate';
import PlaceCreate from './routes/place/create/PlaceCreate';


const App = () => {
  const [authData, setAuthData] = useState<any>();
  const [isAuthenticated, setIsAuthenticated] = useState<number>();
  const [execEffect, setExecEffect] = useState<boolean>();

  const location = useLocation();

  useEffect(() => {
    Api.get('/user/auth').then((response) => {
      return response;
    }).then((res) => {
      if (res !== undefined) {
        setAuthData(res.data);
        setIsAuthenticated(res.status);
      }else{
        setAuthData(null);
        setIsAuthenticated(401);
      }
      setExecEffect(!execEffect);
    })
    .catch((err) => {
      setAuthData(null);
      if (err.response !== undefined){
        setIsAuthenticated(err.response.status);
      }else{
        setIsAuthenticated(401);
      }
      setExecEffect(!execEffect);
      console.clear();
    });
  }, [location]);

  useEffect(() => {
    if (isAuthenticated == 401) {
      if (localStorage.getItem('token') != null) {
        localStorage.removeItem('token');
      }
    }else if (isAuthenticated == 200){
    }
  }, [execEffect])

  return (
    <div className="app" >
      <Header logged={authData != null ? true : false} />

      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home logged={authData != null ? true : false} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {
          /**
           * Just when logged
           * "/profile"
           */
          authData != null ? 
          <Route path="/profile" element={<Profile />} /> : 
          <Route path="/profile" element={<Login />} />
          }

          
          {
          /**
           * Just when logged
           * "/company"
           */
          authData != null ? 
          <Route path="/companies" element={<Company />} /> : 
          <Route path="/companies" element={<Login />} />
          }

          {
          /**
           * Just when logged
           * "/company/create"
           */
          authData != null && (
          <Route path="/companies/create" element={<CompanyCreate />} /> ) 
          }

          {
          /**
           * Just when logged
           * "/place/create"
           */
          authData != null && (
          <Route path="/place/create/:id" element={<PlaceCreate />} /> ) 
          }

          {
          /**
           * Just when logged
           * "/company/:id"
           */
          authData != null && (
          <Route path="/companies/:id" element={<CompanyInformations />} /> ) 
          }

          {
          /**
           * Just when logged
           * "/place/:id"
           */
          authData != null && (
          <Route path="/place/:id" element={<Place />} /> ) 
          }
      </Routes>
    </div>
  );
}

export default App;