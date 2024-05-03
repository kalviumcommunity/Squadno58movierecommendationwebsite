import React, { useEffect } from 'react'

const Logout = () => {

    useEffect(()=>{
        let cookie=document.cookie;
        console.log(cookie)
        document.cookie = "Token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    })

  return (
    <div>Logout</div>
  )
}

export default Logout