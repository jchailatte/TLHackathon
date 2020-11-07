import React, {useState, useEffect} from 'react'

import { useFetch } from './useFetch';

export function useGet (url, queryParams) {
    if(queryParams) {
        url += "?";
        for(const key in queryParams) {
            if(queryParams.hasOwnProperty(key)) {
                url += `&${key}=${queryParams[key]}`;
            }
        }
    }

    return useFetch(url, "GET")
}