import axios from 'axios';

import axios2 from 'axios-https-proxy-fix'; 



export const updateWasherInfo = (userData, userId) => {
    return axios.put(`/api/users/updateInfo/${userId}`, userData);
};

export const getCurrentUser = () => {
    return axios.get('/api/users/current')
}

export const getUserInfo = (userId) => {
    return axios.get(`/api/users/userInfo/${userId}`)
}


export const updateAddress = (userId, addressInfo) => {
    return axios.put(`api/users/updateAddress/${userId}`, addressInfo)
}

export const updateLocationLongLat = (userId, locationInfo) => {
    return axios.put(`api/users/updateLocation/${userId}`, locationInfo)
}

export const setZone = (userId, zoneInfo) => {
    return axios.put(`api/users/setZone/${userId}`, zoneInfo)
}

export const getWashersByZone = (zoneNumber) => {
    return axios.get('api/users/all-washers/by-zone', {zoneNumber})
}
const proxy =  {
    host: '127.0.0.1',
    port: 9000,
    auth: {
      username: 'mikeymike',
      password: 'rapunz3l'
    }
};

export const getCityName = (lat, long) => {
    return axios2.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyDUr44tHd_5NsT-gUx39tC5mP4aUB4s2d8`, {proxy}
    )
}

export const getlongLat = (city, state, country) => {
    return axios2.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${city},%20${state},%20${country}&key=AIzaSyDUr44tHd_5NsT-gUx39tC5mP4aUB4s2d8`, {proxy}
    )
}