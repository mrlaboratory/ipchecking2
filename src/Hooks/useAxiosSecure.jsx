import { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const axiosSecure = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER}`,
})

const useAxiosSecure = () => {

    const navigate = useNavigate()

    useEffect(() => {
        axiosSecure.interceptors.request.use(config => {
            const token = localStorage.getItem('userToken')
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
            return config
        })

        axiosSecure.interceptors.response.use(
            response => response,
            async error => {
                if (
                    error.response &&
                    (error.response.status === 401 || error.response.status === 403)
                ) {
                    // await logOut()
                    // navigate('/login')
                }
                return Promise.reject(error)
            }
        )
    }, [navigate])

    return [axiosSecure]
}

export default useAxiosSecure