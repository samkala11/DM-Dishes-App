import React from 'react';
import { withRouter } from 'react-router-dom';
import './profile.css'



class Profile extends React.Component {

    constructor(props) {
        super(props);    
        this.state = {
            name: "",
            email: "",
            bio: "",
            long: 0,
            lat: 0,
            newCity: "",
            newState: "",
            newCountry: "",
            convertedLong: 0,
            convertedLat: 0
         };

    this.handleSubmitInfo = this.handleSubmitInfo.bind(this);
    this.getAndUpdateUserInfo = this.getAndUpdateUserInfo.bind(this);
    this.displaySuccessMessage = this.displaySuccessMessage.bind(this);
    this.getCurrentLocation = this.getCurrentLocation.bind(this);
    this.overrideAddress = this.overrideAddress.bind(this);
    // this.getLongLat = this.getLongLat.bind(this);
    this.updateUserAddress = this.updateUserAddress.bind(this);
    this.updateUserZone = this.updateUserZone.bind(this);
    }    

    getAndUpdateUserInfo(){
        this.props.getUserInfo(this.props.user.id)
        .then(user => {
            this.setState({
                name: user.userInfo.data.name,
                email: user.userInfo.data.email,
                bio: user.userInfo.data.bio,
                newCity: user.userInfo.data.locationInfo.city,
                newState: user.userInfo.data.locationInfo.state,
                newCountry: user.userInfo.data.locationInfo.country
            })
        }) ;
    }

    componentWillMount() {
        this.getAndUpdateUserInfo()
    }

    displaySuccessMessage(){
        let successMessageContainer = document.getElementsByClassName("change-confirmed")[0];
        successMessageContainer.classList.remove('hidden')
    }

    displayAddressSuccessMessage(){
        let successMessageContainer = document.getElementsByClassName("address-confirmed")[0];
        successMessageContainer.classList.remove('hidden')
    }

    update(field) {
        return e => this.setState({
          [field]: e.currentTarget.value
        });
    }

    getCurrentLocation() {
        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(position => {
                this.setState({
                    long: position.coords.longitude,
                    lat: position.coords.latitude
                }) 

            this.overrideAddress(position.coords.latitude, position.coords.longitude)
            
            } )
        }
    }

    // Get Current Location and update used in above method
    overrideAddress(lat, long) {
        this.props.getCityInfo(lat, long)
        .then(() => {
            this.setState({
                newCity: this.props.currentCityInfo.cityName[2].long_name,
                newState: this.props.currentCityInfo.cityName[4].short_name,
                newCountry: this.props.currentCityInfo.cityName[5].short_name
            })

            let addressInfo = {
                city: this.props.currentCityInfo.cityName[2].long_name,
                state: this.props.currentCityInfo.cityName[4].short_name,
                country: this.props.currentCityInfo.cityName[5].short_name
            }

            this.props.updateAddressInfo(this.props.user.id, addressInfo)
            .then(() => this.getAndUpdateUserInfo())
            .then(() => this.props.getLongLatUtil( 
                    this.state.newCity,
                    this.state.newState,
                    this.state.newCountry))
            .then((data) => {
                let location = data.data.results[0].geometry.location;

                let longLat = {
                    long: location.lng,
                    lat: location.lat
                }
                
                this.updateUserZone(this.props.user.id, location.lng)

                this.setState({
                    long: longLat.long,
                    lat: longLat.lat,
                })

                this.props.updateLocationLongInfo(this.props.user.id, longLat)              })
                .then(() => this.displayAddressSuccessMessage())
                .then(() => this.getAndUpdateUserInfo() )
        })
    }

    updateUserAddress(e) {
        e.preventDefault();
        let addressInfo = {
            city: this.state.newCity,
            state: this.state.newState,
            country: this.state.newCountry
        }
        this.props.updateAddressInfo(this.props.user.id, addressInfo)
        .then(() => this.getAndUpdateUserInfo() )
        .then(() => this.props.getLongLatUtil( 
            this.state.newCity,
            this.state.newState,
            this.state.newCountry))
        .then((data) => {
            let location = data.data.results[0].geometry.location;

            let longLat = {
                long: location.lng,
                lat: location.lat
            }

            this.updateUserZone(this.props.user.id, location.lng)
            
            this.setState({
                long: longLat.long,
                lat: longLat.lat,
            })

            this.props.updateLocationLongInfo(this.props.user.id, longLat)
            // this.props.updateLocationLongInfo(this.props.user.id, longLat)
        })
        .then(() => this.displayAddressSuccessMessage())
        .then(() => this.getAndUpdateUserInfo() )
    }

    updateUserZone(userId, long) {
        if (long < -58 && long > -75){
            // Zone 1 – New York: > -75 && < -58
            let zoneNumber = 1;
            let zoneDescription = "New York"
            this.props.setUserZone(userId, {
                zoneNumber,
                zoneDescription})

        } else if (long < -75 && long > -84){
            // Zone 2 – Florida: < -75 && > -84
            let zoneNumber = 2;
            let zoneDescription = "Florida"
            this.props.setUserZone(userId, {
                zoneNumber,
                zoneDescription })

        } else if (long < -84 && long > -94){
            // Zone 3: Louisiana < - 84 && > -94
            let zoneNumber = 3;
            let zoneDescription = "Louisiana"
            this.props.setUserZone(userId, {
                zoneNumber,
                zoneDescription })

        } else if (long < -94 && long > -105.5){
            // Zone 4: Texas < -94 && > -105.5
            let zoneNumber = 4;
            let zoneDescription = "Texas"
            this.props.setUserZone(userId, {
                zoneNumber,
                zoneDescription })

        } else if (long < -105.5 && long > -114){
            // Zone 5: Arizona < 105.5 && > -114
            let zoneNumber = 5;
            let zoneDescription = "Arizona"
            this.props.setUserZone(userId, {
                zoneNumber,
                zoneDescription })

        } else if (long < -114 && long > -119.5){
            // Zone 6:  Los Angeles < -114 && > -119.5
            let zoneNumber = 6;
            let zoneDescription = "Los Angeles"
            this.props.setUserZone(userId, {
                zoneNumber,
                zoneDescription })

        } else if (long < -119.5 && long > -161.11){
            // Zone 7: San Francisco < -119.5 && > -161.11
            let zoneNumber = 7;
            let zoneDescription = "San Francisco"
            this.props.setUserZone(userId, {
                zoneNumber,
                zoneDescription })

        } else if (long < -75 && long > -84){
            // Zone 8: world (< - 161.11  && > -180) || ( <= 180 && > -58)
            let zoneNumber = 8;
            let zoneDescription = "World"
            this.props.setUserZone(userId, {
                zoneNumber,
                zoneDescription })

        } 


    }




    handleSubmitInfo(e) {
        e.preventDefault();
        let user = {
          name: this.state.name,
          bio: this.state.bio
        };
    
        this.props.updateInfo(user, this.props.user.id)
        .then(() => this.displaySuccessMessage())
        .then(() => this.getAndUpdateUserInfo()); 
    }

 

    render(){
        window.profileState = this.state;

            return(
            <div className="profile-page">
                <h2> Welcome {this.state.name}!  </h2>
                {this.props.user.washerFlag && <h3> Finish your bio and start with your first job </h3>}
                {this.props.user.customerFlag &&   <h3> Let's get your dishes done </h3> }

                <div className="dp-photo"> </div>
                <br/>
                <span> <button> Upload photo</button></span>
                
                <p> Email address: {this.state.email}</p>

                <form className="update-name-form" onSubmit={this.handleSubmitInfo}> 
                    <span> Name:  <input type="text" 
                                    value={this.state.name}
                                    onChange={this.update('name')}/> 
                    </span>
                    <br/>

                    {this.props.user.washerFlag && <span>Bio:  <textarea
                                        rows="17" cols="60"
                                        value={this.state.bio}
                                        onChange={this.update('bio')}
                                        />
                    </span> }
                    <br/>
                    
                    <input className="save-1" type="submit" value="Save Changes"/>
                </form>

                
                <p className="change-confirmed hidden"> Changes successfully changed!</p>


                <form onSubmit={this.updateUserAddress}> 
                  <label> City:
                    <input type="text" value={this.state.newCity} onChange={this.update('newCity')}/>
                  </label>
                    <br/>
                  <label> State:
                    <input type="text" value={this.state.newState} onChange={this.update('newState')}/>
                  </label>
                    <br/>
                  <label> Country:
                    <input type="text" value={this.state.newCountry} onChange={this.update('newCountry')}/>
                  </label> 
                  <br/>
                    <input type="submit" value="Save address changes"/>
                </form> 

                <div> 
                OR <button onClick={this.getCurrentLocation} className="confirm-loc"> Get current location and save</button>
                </div>

                <p className="address-confirmed hidden"> Address successfully changed!</p>


                    {/* will show only for Customer */}
                { this.props.user.customerFlag && <div className="request-button">
                    <button> Request a job </button>
                </div>}

            </div>
        )

    }
}

export default withRouter(Profile);