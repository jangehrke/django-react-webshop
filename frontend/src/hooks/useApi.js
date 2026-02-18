import {useState, useEffect} from 'react';
import {api} from "../api/api";

export function useFetch(url) {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        setData([]);
        setError(null);
        console.log(url)
        api.get(url)
            .then(res => {
                setData(res.data);
                console.log(res.data);
            })
            .catch(err => {
                setError(err);
                console.log(error)
            })
    }, [url])

    return {data, error};
}

export function usePost(url, data) {
    return api.post(url, data)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
}
