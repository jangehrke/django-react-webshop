import {useEffect, useState} from 'react';
import {api} from "../api/api";

export function useFetch(url) {
    const [data, setData] = useState([]);

    useEffect(() => {
        setData([]);
        api.get(url)
            .then(res => {
                setData(res.data);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    }, [url])
    return { data };
}

export function usePost(url) {
    const [response, setResponse] = useState([]);
    const postData = async (data) => {
        const response = await api.post(url, data);
        setResponse(response.data);
        return response;
    }
    return { postData, response }
}