import { useEffect, useState } from "react"

const useApi = (endpoint)=>{
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(true)
    useEffect(()=>{
        fetchData()
    },[])

    const fetchData = async() =>{
        const response = await fetch(endpoint)
        const data = await response.json()
        setData([...data])
        setLoading(false)
    }
    return [loading,data]
}

export default useApi