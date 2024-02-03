import { useEffect, useState } from 'react'
import { Hearts } from 'react-loader-spinner'
import Cat from './Cat'

export default function All() {

    const [catsData, setCatsData] = useState([])
    const [loading, setLoading] = useState(true)
    const [lazyLoad, setLazyLoad] = useState(false)

    const secret = import.meta.env.VITE_API_KEY

    useEffect(function() {
        window.addEventListener('scroll', handleScroll)
        setLoading(true)
        fetch(`https://api.thecatapi.com/v1/images/search?limit=30&api_key=${secret}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Uh, something is wrong with the request')
                }
                return res.json()
            })
            .then(data => {
                setCatsData(data)
                setLoading(false)
            })
    }, [])

    function handleScroll() {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
            setLazyLoad(true)
        }
    }

    useEffect(function() {
        if (lazyLoad) {
            fetch(`https://api.thecatapi.com/v1/images/search?limit=15&api_key=${secret}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Uh, something is wrong with the request')
                }
                return res.json()
            })
            .then(data => {
                setCatsData(prevData => [...prevData, ...data])
                setLazyLoad(false)
            })
        }
    }, [lazyLoad])

    return (
        <> 
            {loading && <div className="loader"><Hearts height="120" width="120" visible={true} /></div>}
            <div className="cats__container">
                {!loading && catsData.length > 0 && 
                    catsData
                        .map(e => <Cat key={e.id} id={e.id} url={e.url} />)
                }
            </div>
            {lazyLoad && <span className="cats__load-more-text">... загружаем ещё котиков ...</span>}
        </>
    )
}