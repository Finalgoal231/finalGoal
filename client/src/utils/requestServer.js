import axios from 'axios';
// import store from '../redux/store';
// import { signout } from '../redux/authSlice';


axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  // if (error.response.status === 401) return store.dispatch(signout());
  if (error.response.status === 401) {
    localStorage.clear();
    return window.location.assign("/");
  };
  return Promise.reject(error);
});

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
