import React from 'react'
import useAddUser from './Custom Hook Practic/useAddUser'

function GetUser() {
        let user = useAddUser("http://localhost:4000/user/getuser");

  return (
    <div>{JSON.stringify(user)}</div>
  )
}

export default GetUser