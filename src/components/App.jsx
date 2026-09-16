import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login/Login";
import Register from "./Register/Register";
import { useEffect, useState } from "react";
import api from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Main from './Main/Main';
import EditProfile from "./Main/components/forms/EditProfile/EditProfile";
import EditAvatar from "./Main/components/forms/Avatar/EditAvatar";
import NewCard from "./Main/components/forms/NewCard/NewCard";
import ImagePopup from "./Main/components/forms/ImagePopup/ImagePopup";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";

function App() {

  const [currentUser, setCurrentUser] = useState({});
  const [popupContent, setPopupContent] = useState(null);
  const [cards, setCards] = useState([]);
  const [loggedIn] = useState(false);

  useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
      setCurrentUser(data);
      })
      .catch((error) => {
      console.error(error);
    });
  }, []);

  useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
      setCards(data);
      })
      .catch((error) => {
      console.error(error);
    });
  }, []);

  const handleUpdateUser = (data) => {
    api
      .editUserInfo(data)
      .then((newData) => {
      setCurrentUser(newData);
      handleClosePopup();
    })
      .catch((error) => {
      console.error(error);
    });
  };


  function handleEditProfileClick() {
    setPopupContent({
      children: <EditProfile/>,
      containerClassName: "popup__container_send",
    });
  }
  
  function handleEditAvatarClick() {
    setPopupContent({
      children: <EditAvatar/>,
      containerClassName: "popup__container_send",
    });
  }
  
  function handleAddCardClick() {
    setPopupContent({
      children: <NewCard/>,
      containerClassName: "popup__container_send",
    });
  }
  
  
  function handleImageClick(card){
    setPopupContent({
      children: (
        <ImagePopup 
          name={card.name} 
          link={card.link}
        />
      ),
      containerClassName: "popup__container_image",
    });
  }
  
    
  function handleClosePopup() {
    setPopupContent(null);
  }

  const handleUpdateAvatar = (data) => {
    api
      .updateUserAvatar(data)
      .then((newData) => {
      setCurrentUser(newData);
      handleClosePopup();
    })
      .catch((error) => {
      console.error(error);
    });
  };


  async function handleCardLike(card) {
    const isLiked = card.isLiked;

      try {
        const newCard = isLiked
          ? await api.removeLike(card._id)
          : await api.addLike(card._id);

        setCards((state) =>
          state.map((currentCard) =>
          currentCard._id === card._id ? newCard : currentCard
          )
        );
      } catch (error) {
          console.error(error);
        }
  }

  async function handleCardDelete(card) {
    try {
      await api.deleteCard(card._id);

      setCards((state) =>
        state.filter((currentCard) => currentCard._id !== card._id)
      );
    } catch (error) {
      console.error(error);
      }
  }


  function handleAddPlaceSubmit(data) {
    api
      .addNewCard(data)
      .then((newCard) => {
      setCards((state) => [newCard, ...state]);
      handleClosePopup();
    })
      .catch((error) => {
        console.error(error);
    });
  }


  
  return (
    <CurrentUserContext.Provider 
      value={{
        currentUser, 
        handleUpdateUser,
        handleUpdateAvatar,
        handleAddPlaceSubmit,
      }}>

      <div className="page">

        <Header/>

        <Routes>

          <Route path='/signin' element={<Login/>} />

          <Route path='/signup' element={<Register/>} />

          <Route
            path='/'
            element={
              <ProtectedRoute loggedIn={loggedIn}>
              <>
                <Main
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  onEditProfile={handleEditProfileClick}
                  onEditAvatar={handleEditAvatarClick}
                  onAddCard={handleAddCardClick}
                  onImageClick={handleImageClick}
                  popup={popupContent}
                  onClosePopup={handleClosePopup}
                />

                <Footer/>
              </>
              </ProtectedRoute>
            }
          />    

          <Route
            path='*'
            element={<Navigate to='/signin' replace />}
          />

        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
