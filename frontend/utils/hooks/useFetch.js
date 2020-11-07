import React, {useState, useEffect} from 'react'

export function useFetch (url, method, body = null) {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    body = body ? JSON.stringify(body) : null;

    useEffect(()=>{
        const headers = new Headers({
            "Content-Type": "application/json",
            "Authorization": window.localStorage.getItem("token")
        });
        const fetchData = async () => {
            setIsLoading(true);
            try{
                const res = await fetch(url, {method, headers,body});
                const json = await res.json();
                setResponse(json);
                setIsLoading(false);
            } catch (error) {
                setError(error);
            }
        };
        fetchData();
    },[]);

    return {response, error, isLoading};    
}