import './Home.scss';
import GirlImage from '../../assets/home/GirlImage.svg'
import Card from '../../components/card/Card';
import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

function Home(props: any) {
  return (
    <div className="Home">
      <div className="container">

        <div className="row mt-5 justify-content-around align-items-center sm">
          <section className="col-xl-4 ">
            <h1 className="h1">Manage your company here.</h1>
            <h3 className="h3">Your position in all the world places.</h3>
            <div className="d-inline-flex mt-2">
              <Card title="Around the world" 
              description="Your company really visible on many tools."
              type="world"
              />
              
              <Card title="Manage easily!" 
              description="Manage your company and all places easy."
              type="manage"
              />
            </div>
              <div className="d-flex justify-content-center mt-5">
                <NavLink to={props.logged == false ? "/register" : "/profile"}
                style={{ color: 'inherit', textDecoration: 'none'}}>
                  <Button size="large" variant="contained" id="create-account-button">Create my account</Button>
                </NavLink>
              </div>
              <div className="d-flex justify-content-center mt-3">
                <NavLink to={props.logged == false ? "/login" : "/profile"}
                style={{ color: 'inherit', textDecoration: 'none'}}>
                I already have an account</NavLink>
              </div>
          </section>
          <aside className="col-xl-6 mt-5 mb-5 justify-content-center align-items-center d-flex">
            <img src={GirlImage}
            alt="Girl using techs" 
            className="w-100"></img>
          </aside>
        </div>

      </div>
    </div>
  );
}
export default Home;
