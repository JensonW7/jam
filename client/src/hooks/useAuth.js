import React from "react"
import { useState, useEffect } from 'react'
import { useUserContext } from "./useUserContext"

export default function useAuth(code, state) {
    const {username, accessToken, dispatch} = useUserContext()

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
            console.log('access token', json.access_token)

            if (response.ok) {
                dispatch({
                    type: 'SET_ACCESSTOKEN',
                    payload: json.access_token
                })
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
                dispatch({
                    type: 'SET_USERNAME',
                    payload: json.id
                })
            }
        }

        getUserProfile()
    }, [accessToken])

    useEffect(() => {
        const findUser = async() => {
            const userURL = '/users/' + username
            const response = await fetch(userURL)
            const json = await response.json()
            
            if (response.ok) {
            } else {
                const makeUserProfile = async() => {
                    const { profile } = {
                        username: username,
                        friends: []
                    }

                    const response = await fetch('/users', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            username: username,
                            friends: []
                        })
                    })
                }

                makeUserProfile()
            }
        }

        findUser()
    }, [username])
}