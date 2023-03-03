import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
let City = lazy(()=>import('../views/City'))
let SelectCity = lazy(()=>import('../views/SelectCity'))
let Home = lazy(()=>import('../views/Home'))
let NotFound = lazy(()=>import('../component/NotFound'))

let elements = [
    {
        path:'/selectCity',
        element:<Suspense fallback={'loading.....'}><SelectCity/></Suspense>,
        author:false
    },
    {
        path:'/city',
        element:<Suspense fallback={'loading.....'}><City/></Suspense>,
        author:false
    },
    {
        path:'/home',
        element:<Suspense fallback={'loading.....'}><Home/></Suspense>,
        author:false
    },
    {
        path:'*',
        element:<NotFound/>,
        author:false
    },
    {
        path:'/',
        element:<Navigate to={'/home'}></Navigate>,
        author:false
    }
]

export default elements