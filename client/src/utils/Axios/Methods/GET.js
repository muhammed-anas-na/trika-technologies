import axios from 'axios';
import { GET_PRODUCTS_URL, SEARCH_URL } from '../Endpoints';

export const getProductsData = async(currnetPage,itemsPerPage)=>{
    try{
        return axios.get(`${GET_PRODUCTS_URL}?itemsPerPage=${itemsPerPage}&&currentPage=${currnetPage}`)
    }catch(err){
        return err;
    }
}

export const getSearchResult = async(val)=>{
    try{
        return axios.get(`${SEARCH_URL}?val=${val}`)
    }catch(err){
        return err;
    }
}
