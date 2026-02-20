import {useEffect, useState} from 'react';
import {api} from "../api/api";

export function useFetch(url) {
    const [data, setData] = useState([]);

    useEffect(() => {
        setData([]);
        console.log(url)
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
        console.log(response);
        return response;
    }
    return { postData, response }
}