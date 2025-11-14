// import ClassComponent from "./components/ClassComponent.tsx";
// import FunctionalComponent from "./components/FunctionalComponent.tsx";
// import ArrowFunctionalComponent from "./components/ArrowFunctionalComponent.tsx";
// import ArrowFunctionalComponentWithProps from "./components/ArrowFunctionalComponentWithProps.tsx";
// import ArrowFunctionalComponentWithPropsType from "./components/ArrowFunctionalComponentWithPropsType.tsx";
// import ClassComponentWithState from "./components/ClassComponentWithState.tsx";
// import FunctionalComponentWithState from "./components/FunctionalComponentWithState.tsx";
// import Counter from "./components/Counter.tsx";
// import NameChanger from "./components/NameChanger.tsx";
// import CounterWithMoreStates from "./components/CounterWithMoreStates.tsx";
// import CounterAdvanced from "./components/CounterAdvanced.tsx";
// import Layout from "./components/Layout.tsx";
// import CounterWithCustomHook from "./components/CounterWithCustomHook.tsx";
// import CounterAdvancedWithCustomHook from "./components/CounterAdvancedWithCustomHook.tsx";
// import CounterWithReducer from "./components/CounterWithReducer.tsx";
// import OnlineStatus from "./components/OnlineStatus.tsx";
import {BrowserRouter, Routes, Route} from "react-router";
// import HomePage from "./pages/HomePage.tsx";
// import NameChangerPage from "./pages/NameChangerPage.tsx";
// import OnlineStatusPage from "./pages/OnlineStatusPage.tsx";
// import UserPage from "./pages/UserPage.tsx";
import RouterLayout from "./components/RouterLayout.tsx";
// import ExamplesPage from "./pages/ExamplesPage.tsx";
// import RouterExamplesLayout from "./components/RouterExamplesLayout.tsx";
// import AutoRedirectAdvanced from "./components/AutoRedirectAdvanced.tsx";
// import NotFoundPage from "./pages/NotFoundPage.tsx";
import ProductList from "@/components/ProductList.tsx";
import Product from "@/components/Product.tsx";

function App() {

  return (
    <>
<BrowserRouter>
    {/*<Layout>*/}
        <Routes>

            <Route path="products" element={<RouterLayout />} >
            <Route index element={<ProductList/>}/>
                {/*Εάν θέλω να καλώ το ίδιο component για διαφορετική διαδικασία τότε θα σπάω αυτές τις διαδικασίες σε modes.*/}
                <Route path="new" element={<Product mode="create"/>}/>
                <Route path=":productId" element={<Product mode="edit"/>}/>
        </Route>

{/*<Route element={<RouterLayout />}>*/}
{/*    <Route index element={ <HomePage/> }/>*/}
{/*</Route>*/}

{/*            /!* ΚΑΙ ΑΥΤΟ ΕΙΝΑΙ ΣΩΣΤΟ <Route path="examples" element={<RouterExamplesLayout/>} >*!/*/}
{/*            <Route element={<RouterExamplesLayout/>}>*/}
{/*            <Route path="examples">*/}
{/*                <Route index element={<ExamplesPage/>} />*/}
{/*                <Route path="name-changer" element={ <NameChangerPage/> } />*/}
{/*        <Route path="online-status" element={ <OnlineStatusPage/> } />*/}
{/*                <Route path="auto-redirect-advanced" element={ <AutoRedirectAdvanced/> } />*/}
{/*            </Route>*/}
{/*</Route>*/}

{/*            <Route path="users/:userId" element={<UserPage/> } />*/}

{/*            /!* Πάντα τελευταίο Catch all Paths *!/*/}
{/*            <Route path="*" element={<NotFoundPage/>}/>*/}
        </Routes>
             {/*</Layout>*/}
</BrowserRouter>

{/*<NameChanger/>*/}

    {/*<CounterWithReducer/>*/}
            {/*<CounterAdvancedWithCustomHook/>*/}
{/*<CounterWithCustomHook/>*/}
{/*<CounterAdvanced/>*/}
{/*<CounterWithMoreStates/>*/}

{/*            <NameChanger/>*/}

{/*<Counter/>*/}
{/*           <ClassComponentWithState/>*/}
{/*            <FunctionalComponentWithState/>*/}
{/*            <FunctionalComponent/>*/}
{/*        <ClassComponent/>*/}
{/*        <FunctionalComponent/>*/}
{/*        <ArrowFunctionalComponent/>*/}
{/*        <ArrowFunctionalComponentWithProps title="Is a Arrow Component with Props!"/>*/}
{/*        <ArrowFunctionalComponentWithPropsType*/}
{/*            title="Is a Arrow Component with Props!"*/}
{/*            description="This is a description."*/}
{/*        />*/}

        {/*    <OnlineStatus/>*/}
    </>
  )
}

export default App
