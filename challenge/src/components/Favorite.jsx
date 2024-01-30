import { useState, useEffect } from 'react'

export default function Favorite() {

    const [favorite, setFavorite] = useState(false)
    const [favorites, setFavorites] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(function() {
        setFavorites(JSON.parse(localStorage.getItem("likedCats")) || [])
        setLoading(false)
    }, [favorite])
    
    const heartFilled = {
        backgroundImage: `url('fav-filled.svg')`
    }

    function handleClick(catId) {
        const likedCats = JSON.parse(localStorage.getItem('likedCats'))

        const updatedLikesCats = likedCats.filter(e => e.id !== catId)

        localStorage.setItem('likedCats', JSON.stringify(updatedLikesCats))

        setFavorite(prevValue => !prevValue)
    }

    return (
        <>
            <div className="cats__container">
            {favorites.length > 0 && favorites
                .map(e => {
                    return (
                        <div id={e.id} key={e.id} style={{backgroundImage: `url('${e.url}')`}} className="cats__cat-pic">
                            <div style={heartFilled} className="cats__cat-heart" onClick={() => handleClick(e.id, e.url)}></div>
                        </div>
                    )
                })
            }
            </div>
        </>
    )
}