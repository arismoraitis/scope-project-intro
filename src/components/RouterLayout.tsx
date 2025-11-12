// Layout με την λογική του React Router με outlet

import {Outlet} from "react-router"
import HeaderResponsive from "./HeaderResponsive.tsx";
import Footer from "./Footer.tsx";

const RouterLayout = () => {




    return (


        <>
            <HeaderResponsive/>
            <div className="container mx-auto min-h-[100vh] pt-24">
             <Outlet/>
            </div>
            <Footer />

        </>
    )
}


export default RouterLayout;