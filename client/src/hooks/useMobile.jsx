import React, { useEffect, useState } from "react"

const useMobile = (breakpoint = 768)=>{
    const[isMobile,setisMobile] = useState(window.innerWidth < breakpoint)

    const handleResize = ()=>{
        const checkPoint = window.innerWidth < breakpoint 
        setisMobile(checkPoint)
    }

    useEffect(()=>{
        handleResize();
        window.addEventListener('resize',handleResize);

        return ()=>{
            window.addEventListener('resize',handleResize);
        }
    },[])

    return [isMobile];
}
export default useMobile