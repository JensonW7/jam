import React from "react"
import { useState, useEffect } from 'react'
import { userContext } from "../contexts/userContext"

export default function useAuth(code, state) {
    const userContext = useContext(userContext)
    
    const [accessToken, setAccessToken] = useState(null)
    const [userName, setUserName] = useState(null)
    const [userID, setUserID] = useState(null)

    useEffect(() => {
        const fetchAccessToken = async() => {
            const response = await fetch('/spotify/access_token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    code: code,
                    state: state
                })
            })
            const json = await response.json()

            if (response.ok) {
                setAccessToken(json.access_token)
            }
        }

        fetchAccessToken()
    }, [code, state])

    useEffect(() => {
        const getUserProfile = async() => {
            const response = await fetch('https://api.spotify.com/v1/me', {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            })
            const json = await response.json()

            if (response.ok) {
                setUserID(json.id)
            }
        }

        getUserProfile()
    }, [accessToken])

    useEffect(() => {
        const findUser = async() => {
            const userURL = '/users/' + userID
            const response = await fetch(userURL)
            const json = await response.json()
            
            if (response.ok) {
            } else {
                console.log('called')
                const makeUserProfile = async() => {
                    const { profile } = {
                        username: userID,
                        friends: []
                    }

                    const response = await fetch('/users', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            username: userID,
                            friends: []
                        })
                    })
                }

                makeUserProfile()
            }
        }

        findUser()
    }, [userID])

    return JSON.stringify({accessToken, userName, userID})
}