import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
import Index from '../views/Index'
let City = lazy(()=>import('../views/City'))
let Home = lazy(()=>import('../views/Home'))
let NotFound = lazy(()=>import('../component/NotFound'))

let elements = [
    {
        path:'/index',
        element:<Index/>,
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
        element:<Navigate to={'/index'}></Navigate>,
        author:false
    }
]

export default elements