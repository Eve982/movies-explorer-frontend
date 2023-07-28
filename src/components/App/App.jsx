import React from 'react';
import { Routes, Route} from 'react-router-dom'
import './App.css';
import Main from '../Main/Main';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Header from '../Header/Header';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Layout from '../Layout/Layout';

function App() {
  return (
  <>
  <div className='App'>
    <Routes>
      <Route element={<Layout/>}>
        <Route path='/' element={<Main/>}/>
        <Route path='/movies' element={<Movies/>}/>
        <Route path='/saved-movies' element={<SavedMovies/>}/>
      </Route>
    <Route path='/profile' element={
    <>
    <Header/>
    <Profile/>
    </>
    }/>
    <Route path='/signin' element={<Login/>}/>
    <Route path='/signup' element={<Register/>}/>
    <Route path="*" element={<NotFoundPage/>}/>
    </Routes>
  </div>
  </>
  )
}

export default App;
