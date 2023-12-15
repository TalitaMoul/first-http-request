import {useState, useEffect} from 'react'

// Custom Hook 

export const useFetch = (url) => {

    const [data, setData] = useState(null)

    // Refatorando POST
    const [config, setConfig] = useState(null)
    const [method, setMethod] = useState(null)
    const [callFetch, setCallFetch] = useState(false)

    // Loading
    const [loading, setLoading] = useState(false)

    // Tratando Erros 
    const [error, setError] = useState(null)

    const httpConfig = (data, method) => {
        if (method === "POST") {
            setConfig({
                method,
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            })

            setMethod(method)

        }
    }


    useEffect(() => {

        const fetchData = async () => {

            // Loading 
            setLoading(true)

            try {
                const resposta = await fetch(url)
                const json = await resposta.json()

                setData(json)
            } catch (error) {
                setError("Houve algum erro ao carregar os dados!")
            }

            setLoading(false)
        }

        fetchData()

    }, [url, callFetch])

    // POST novo

    useEffect (() => {
        const httpRequest = async () => {
            if (method === "POST") {

                let fetchOptions = [url, config]
    
                const resposta = await fetch(...fetchOptions)
                const json = await resposta.json()
    
                setCallFetch(json)
    
            }
        }

        httpRequest()
    }, [config, method, url])

    return{data, httpConfig, loading, error}

}