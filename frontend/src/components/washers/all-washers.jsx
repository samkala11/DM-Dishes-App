import React from 'react';
import {withRouter} from 'react-router-dom';

class AllWashers extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            sortedByDistance: []
        }
        this.sortByClosest = this.sortByClosest.bind(this);
    }

    componentDidMount(){
        this.props.getCurrentUserInfo(this.props.user.id)
        .then( ()=> {
            let zoneNumber = this.props.currentUser .zoneNumber;
            // debugger;
            this.props.getWashersByZone(zoneNumber) } )
        .then(() => this.props.getCurrentUserInfo(this.props.user.id))
        .then( () => this.sortByClosest(this.props.currentUser.locationInfo, this.props.allWashers) )
        
    }



    getDistance(lat1, lon1, lat2, lon2, unit) {
        if ((lat1 == lat2) && (lon1 == lon2)) {
            return 0;
        }
        else {
            var radlat1 = Math.PI * lat1/180;
            var radlat2 = Math.PI * lat2/180;
            var theta = lon1-lon2;
            var radtheta = Math.PI * theta/180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180/Math.PI;
            dist = dist * 60 * 1.1515;
            if (unit=="K") { dist = dist * 1.609344 }
            if (unit=="N") { dist = dist * 0.8684 }
            return dist;
        }
    }


    sortByClosest(customerLongLat, washersArray) {
        let washersAndDistance = [];
        washersArray.forEach(washer => {
            let distance = this.getDistance(customerLongLat.lat, customerLongLat.long, washer.locationInfo.lat, washer.locationInfo.long)
            let distanceObj = {distance: distance}
            let washerObj = Object.assign(distanceObj, washer)
            washersAndDistance.push(washerObj)
        })
        // console.log(washersAndDistance)
        let sortedByDistanceArr = washersAndDistance.sort((a,b) => (a.distance > b.distance) ? 1 : -1)
        this.setState({
            sortedByDistance: sortedByDistanceArr
        })
    }

    render() {
        window.allWashersProps = this.props.allWashers
        window.allWashersState = this.state;
        
        return(
            <div className="washers-index">
                <h3> Choose the best for your job</h3>

                {this.state.sortedByDistance.map(washer => {
                    return(
                        <div> 
                            <span className="washer-name"> {washer.name} </span>
                            <br/>
                            {washer.locationInfo.city},
                            {washer.locationInfo.state},
                            {washer.locationInfo.country}
                            {washer.bio}
                            <button className="request-job-button"> Request a Job </button>
                            <br/>
                            <br/>
                        </div>
                    )
                })   }

            </div>

       

        )
    }
}

export default withRouter(AllWashers);