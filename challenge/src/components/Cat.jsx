import { useState } from 'react'

export default function Cat({ id, url }) {

    const [favorite, setFavorite] = useState(false)

    const heartEmpty = {
        backgroundImage: `url('fav.svg')`
    }
    
    const heartFilled = {
        backgroundImage: `url('fav-filled.svg')`
    }

    function handleClick(catId, catUrl) {
        setFavorite(prevValue => !prevValue)

        const likedCats = JSON.parse(localStorage.getItem('likedCats')) || []

        const isLiked = likedCats.includes(catId)

        if (isLiked) {
            const updatedLikesCats = likedCats.filter(e => e.id !== catId)
            localStorage.setItem('likedCats', JSON.stringify(updatedLikesCats))
        } else {
            likedCats.push({id: catId, url: catUrl})
            localStorage.setItem('likedCats', JSON.stringify(likedCats))
        }
    }

    return (
        <>
            <div id={id} style={{backgroundImage: `url('${url}')`}} className="cats__cat-pic">
                <div style={favorite ? heartFilled : heartEmpty} className="cats__cat-heart" onClick={() => handleClick(id, url)}></div>
            </div>
        </>
    )
}