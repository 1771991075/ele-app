import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import {getHeohash} from '../../api/home'

export default function Home() {
    let [search] = useSearchParams()
    let geohash = search.get('geohash')

    useEffect(()=>{
        getHeohash(geohash).then(res=>{
            console.log(res)
        })
    },[geohash])

    return (
        <div>
            <h1>Home</h1>
        </div>
    )
}
