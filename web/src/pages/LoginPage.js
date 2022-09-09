import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from './../components/AuthContext'
import jwt_decode from 'jwt-decode'
import { fetchData } from './../utility/utils'
import { GoTasklist } from 'react-icons/go'
import axios from 'axios'

const LoginPage = () => {
    const authcontext = React.useContext(AuthContext);
    const [users, setUsers] = useState(null);
    const navigate = useNavigate()

    const logIn = (authToken, userObject) => {
        localStorage.setItem('Authorization', authToken)
    
        localStorage.setItem('user', JSON.stringify(userObject))
    
        authcontext.dispatch({ type: "LOGIN" });

        navigate('/home/')
    }

    function handleCallbackResponse(response) {
        let exists = false
        const authToken = response.credential
        let userObject = jwt_decode(authToken);
    
        if (userObject.email_verified) {
          if ((users.filter((user) => { return user.id_token === userObject.sub })).length !== 0) {
            exists = true
          }
    
          if (!exists) {
            console.log(userObject)
            axios.post(`http://127.0.0.1:8000/api/users/`, {
              'id_token': userObject.sub,
              'username': userObject.name,
              'email': userObject.email,
              'image': userObject.picture,
            },
              {
                headers: {
                  "Content-Type": 'application/json'
                }
              }
            ).then((response) => {
              console.log(response)
              if (response.statusText === "Created") {
    
                logIn(authToken, userObject)
    
              } else {
                console.log(response.data)
              }
    
            }).catch((error) => {
              console.error(error.response)
            })
          }
          else {
    
            axios.put(`http://127.0.0.1:8000/api/users/${userObject.sub}/`, {
              'id_token': userObject.sub,
              'username': userObject.name,
              'email': userObject.email,
              'image': userObject.picture    
            },
              {
                headers: {
                  "Content-Type": 'application/json'
                }
              }
            ).then((response) => {
              console.log(response)
    
              if (response.statusText === "OK") {
                logIn(authToken, userObject)
    
              } else {
                console.error(response)
              }
            })
            }
        }
    }

    useEffect(() => {
        fetchData(setUsers)
    }, [])

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
          client_id: "653126086705-5udde9tgngcjsceutqr0fi3ejm6i48fs.apps.googleusercontent.com",
          callback: handleCallbackResponse
        })
    
        google.accounts.id.renderButton(
          document.getElementById("signInDiv"),
          { theme: "outline", size: "large", shape: "circle", logo_alignment: "center" },
        )
    }, [users])// eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className='app-container'>
            <div className='center-column'>
                <div className='center-row space'>
                    <GoTasklist className='logo-image'/>
                    <p className='logo-text'>todo-list</p>
                </div>
                <div className='center-row' id="signInDiv"></div>
            </div>
        </div>
    )
}

export default LoginPage