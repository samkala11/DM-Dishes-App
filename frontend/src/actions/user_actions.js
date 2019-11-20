import { updateWasherInfo, getCurrentUser, getUserInfo, getCityName, getlongLat, updateAddress, updateLocationLongLat} from '../util/user_api_utils'

export const RECEIVE_UPDATED_USER = 'RECEIVE_UPDATED_USER';
export const RECEIVE_USER_INFO = 'RECEIVE_USER_INFO';
export const RECEIVE_USER_UPDATE_ERRORS = 'RECEIVE_USER_UPDATE_ERRORS';
export const RECEIVE_CITY_NAME = 'RECEIVE_CITY_NAME';
export const RECEIVE_LONG_LAT = 'RECEIVE_LONG_LAT';
export const RECEIVE_LOCATION_ERRORS = 'RECEIVE_LOCATION_ERRORS';

export const receiveCityName = cityName => ({
    type: RECEIVE_CITY_NAME,
    cityName
});

export const getCityNameThunk = (lat, long) => dispatch => (
    getCityName(lat, long).then((cityName) => ( dispatch(receiveCityName(cityName))
    ), err => (
        dispatch(receiveErrors(err)) 
    ))
);

export const receiveLongLat = longLatInfo => ({
    type: RECEIVE_LONG_LAT,
    longLatInfo
});


export const getLongLatThunk = (city, state, country) => dispatch => (
    getlongLat(city, state, country).then((longLat) => ( dispatch(receiveLongLat(longLat))
    ), err => (
        dispatch(receiveErrors(err)) 
    ))
);


export const receiveLocationErrors = errors => ({
    type: RECEIVE_LOCATION_ERRORS,
    errors
});


export const receiveUpdatedUser = updatedUser => ({
    type: RECEIVE_UPDATED_USER,
    updatedUser
});


export const receiveUserInfo = userInfo => ({
    type: RECEIVE_USER_INFO,
    userInfo
});


export const receiveErrors = errors => ({
    type: RECEIVE_USER_UPDATE_ERRORS,
    errors
});




// Thunk POST
export const updateUser = (user, userId) => dispatch => (
    updateWasherInfo(user, userId).then((updatedUser) => ( dispatch(receiveUpdatedUser(updatedUser))
    ), err => (
        dispatch(receiveErrors(err.response.data)) 
    ))
);


// Thunk GET
export const getUserInfoCurrent = _ => dispatch => (
    getCurrentUser().then((userInfo) => ( dispatch(receiveUserInfo(userInfo))
    ), err => (
        dispatch(receiveErrors(err.response.data)) 
    ))
);

export const getUserInfoId = (userId) => dispatch => (
    getUserInfo(userId).then((userInfo) => ( dispatch(receiveUserInfo(userInfo))
    ), err => (
        dispatch(receiveErrors(err.response.data)) 
    ))
);

