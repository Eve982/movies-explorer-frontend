import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import { useState } from 'react'

function SavedMovies({
    onFindClick,
    savedMovies,
    removeMovie,
    savedFilteredMovies,
    onShorts,
    shortsIsChecked,
    shortMovies
}) {

    const [searchKeySaved, setSearchKeySaved] = useState('')
    function handleInputChange(e) {
        const value = e.target.value
        setSearchKeySaved(value)
    }

    return(

        <main className="movies">
            <SearchForm
            onFindClick={onFindClick}
            searchKeySaved={searchKeySaved}
            onInputChange={handleInputChange}
            onShorts={onShorts}
            shortsIsCheckedSaved={shortsIsChecked}
            />
            <MoviesCardList
            likedMovies={savedMovies}
            filteredMovies={shortsIsChecked ? shortMovies : savedFilteredMovies}
            removeMovie={removeMovie}
            savedMovies={savedMovies}/>
        </main>
    )
}

export default SavedMovies
