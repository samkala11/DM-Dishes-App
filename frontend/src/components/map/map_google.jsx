import { Map, GoogleApiWrapper } from 'google-maps-react';

import React from 'react';

class GoogleMap extends React.Component{
    constructor(props){
        super(props)
    }

    render() {
        const mapStyles = {
            width: '100%',
            height: '100%',
        };
        return (
            <Map
              google={this.props.google}
              zoom={8}
              style={mapStyles}
              initialCenter={{ lat: 47.444, lng: -122.176}}
            />
        );
    }
}

export default GoogleApiWrapper({
    apikey: 'AIzaSyDUr44tHd_5NsT-gUx39tC5mP4aUB4s2d8'
})(GoogleMap)