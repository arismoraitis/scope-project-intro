import {useState, useEffect} from "react";

const OnlineStatus = () => {

const [isOnline, setIsOnline] = useState(navigator.onLine);

useEffect (() => {

    const handler = () => setIsOnline(navigator.onLine);

    const pollingId: number =  setInterval(handler, 5000);
    // window.addEventListener("online", handler);
    // window.addEventListener("offline", handler);

    return ()  =>
                        clearInterval(pollingId);
                        // window.removeEventListener("online", handler);
                        // window.removeEventListener("offline", handler);
}, [])

    return (
        <>
<div className={`text-white text-center mt-12 mx-4 p-4 rounded ${ isOnline ? "bg-green-500" : "bg-red-500" }`}>
    {isOnline ? "You are Online!" : "You are Offline..."}
</div>
        </>
    )
}


export default OnlineStatus;
