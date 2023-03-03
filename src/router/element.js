import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
import Index from '../views/Index'
import Home from '../views/Home'
let City = lazy(()=>import('../views/City'))
let SelectCity = lazy(()=>import('../views/SelectCity'))
let Mine = lazy(()=>import('../views/Mine'))
let SearchInfo = lazy(()=>import('../views/SearchInfo'))
let Order = lazy(()=>import('../views/Order'))
let NotFound = lazy(()=>import('../component/NotFound'))


let elements = [
    {
        path:'/index',
        element:<Index/>,
        author:false,
        children:[
            {
                path:'home',
                element:<Home/>,
                author:false,
            },
            {
                path:'search',
                element:<Suspense fallback={'loading.....'}><SearchInfo/></Suspense>,
                author:false,
            },
            {
                path:'order',
                element:<Suspense fallback={'loading.....'}><Order/></Suspense>,
                author:false,
            },
            {
                path:'mine',
                element:<Suspense fallback={'loading.....'}><Mine/></Suspense>,
                author:false,
            }
        ]
    },
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
        path:'*',
        element:<NotFound/>,
        author:false
    },
    {
        path:'/',
        element:<Navigate to={'/index/home'}></Navigate>,
        author:false
    }
]

export default elements