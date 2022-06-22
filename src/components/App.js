
import { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";

// import composant
import Main from './Main/Main'
import Header from "./Header/Header";
import Footer from "./Footer/Footer";


// import style
import './App.scss';

const App = () => {

  const [user, setUser] = useState([]);
  const [userReviews, setUserReviews] = useState([]);
  const [isLogged, setIsLogged] = useState(false)

  // // décodage du token pour dynamiser le getUser par l'id
  // if (localStorage.getItem('userLoggedToken'))
  const userToken = localStorage.getItem('userLoggedToken');
  let userTokenDecoded = null;
  if (userToken) {
    
     userTokenDecoded = jwt_decode(userToken);
  }

  // console.log(userTokenDecoded);
  
  
  function getUser() {
    // if (userToken) {
    //   const userTokenDecoded = jwt_decode(userToken);
    
    // } 
    axios.get(`https://bibinov1.herokuapp.com/user/${userTokenDecoded.id}`)
    .then(function (response) {
      // en cas de réussite de la requête
      // console.log('consolelog user', response.data);
      setUser(response.data);
    })
    .catch(function (error) {
      // en cas d’échec de la requête
      console.log(error);
    })
    .then(function () {
      // dans tous les cas
    });
  }

  function getUserReviews(){

    axios.get(`https://bibinov1.herokuapp.com/user/${userTokenDecoded.id}/review`)
    .then(function (response) {
      // en cas de réussite de la requête
      // console.log('consolelog then userReviews', response.data[0]);
      setUserReviews(response.data[0]);
    })
    .catch(function (error) {
      // en cas d’échec de la requête
      console.log(error);
    })
    .then(function () {
      // dans tous les cas
    });
  }

  useEffect(() => {
    if (localStorage.getItem('userLoggedToken')) {
      getUser();
      getUserReviews();
    }

  }, [isLogged]);
  return (
    <div className="App">

      <Header isLogged={isLogged} setIsLogged={setIsLogged}/>

      <Main user={user} userReviews={userReviews} isLogged={isLogged} setIsLogged={setIsLogged} />


            <Footer />
        </div>
    );
};

export default App;
