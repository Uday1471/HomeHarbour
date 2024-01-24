import { getAuth, onAuthStateChanged } from 'firebase/auth'
import React, {useState} from 'react'
import { useEffect } from 'react'
import { useAuthStore } from '../store/masterStore'

export  function useAuthStatus() {
  const [loggedIn, setLoggedIn] = useState(false) 
  const [checkingStatus, setCheckingStatus] = useState(true)
  let {user} = useAuthStore(store => store);

  useEffect(() => {
      if(user){
        setLoggedIn(true);
        setCheckingStatus(false);
      } else{
        setCheckingStatus(false);
      }
  },[])
  return {loggedIn, checkingStatus};
}
