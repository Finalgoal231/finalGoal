import axios from 'axios';
export const requestServer = async(type, url, data)=>{
  switch (type) {
    case 'post':
      const resPost = await axios.post(process.env.REACT_APP_BASE_URL + url, data)
      return resPost
    case 'get':
      const resGet = await axios.get(process.env.REACT_APP_BASE_URL + url)
      return resGet
    case 'delete':
      const resDel = await axios.delete(process.env.REACT_APP_BASE_URL + url)
      return resDel
    case 'put':
      const resPut = await axios.put(process.env.REACT_APP_BASE_URL + url, data)
      return resPut
    default:
      break;
  }
}
