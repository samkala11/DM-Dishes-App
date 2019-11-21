import { getWashersByZone } from '../util/user_api_utils';

export const RECEIVE_WASHERS_ZONE = 'RECEIVE_WASHERS_ZONE';
export const RECEIVE_GET_WASHERS_ERRORS = 'RECEIVE_GET_WASHERS_ERRORS'

export const receiveWashersByZone = washers => ({
    type: RECEIVE_WASHERS_ZONE,
    washers
})

export const getWashersByZoneThunk = (zoneNumber) => dispatch => (
    getWashersByZone(zoneNumber).then((washers) => { 
        // debugger; 
        return ( dispatch(receiveWashersByZone(washers))
    )}, err => (
        dispatch(receiveWashersErrors(err.response.data)) 
    ))
);

export const receiveWashersErrors = errors => ({
    type: RECEIVE_GET_WASHERS_ERRORS,
    errors
});