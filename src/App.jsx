import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider } from 'react-router-dom'
import SearchRecipe from './components/search_recipe'
import Navbar from './components/navbar/navbar'
import Favourite from './components/favourite/favourite'
import AllRecipes from './components/all_recipe/allRecipe'

function Layout(){
  return <div>
    <Navbar />
    <Outlet />
  </div>
}

function App() {
  const route = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout/>}>
        <Route index element={<SearchRecipe />}/>
        <Route path="favourite" element={<Favourite />}/>
        <Route path="all_recipes" element={<AllRecipes />}/>
      </Route>
    )
  )
  return (
    <>
      <RouterProvider router={route}/>
    </>
  )
}

export default App
