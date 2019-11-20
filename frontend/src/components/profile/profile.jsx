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

    this.handleSubmitEmployee = this.handleSubmitEmployee.bind(this);
    this.handleSubmitCustomer = this.handleSubmitCustomer.bind(this);
    this.getAndUpdateUserInfo = this.getAndUpdateUserInfo.bind(this);
    this.displaySuccessMessage = this.displaySuccessMessage.bind(this);
    this.getCurrentLocation = this.getCurrentLocation.bind(this);
    this.overrideAddress = this.overrideAddress.bind(this);
    this.getLongLat = this.getLongLat.bind(this);
    this.updateUserAddress = this.updateUserAddress.bind(this);
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

    overrideAddress(lat, long) {
        this.props.getCityInfo(lat, long)
        .then(() => {
            // debugger;
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
            .then(() => this.displayAddressSuccessMessage())
        })
    }

    getLongLat() {
        this.props.getLongLatInfo(this.state.newCity, this.state.newState, this.state.newCountry)
        // .then(( ) => {

        // })
    }

    updateUserAddress(e) {
        e.preventDefault();
        let addressInfo = {
            city: this.state.newCity,
            state: this.state.newState,
            country: this.state.newCountry
        }
        this.props.updateAddressInfo(this.props.user.id, addressInfo)
        .then(() => this.displayAddressSuccessMessage())
        .then(() => this.getAndUpdateUserInfo() )
    }

    handleSubmitEmployee(e) {
        e.preventDefault();
        let user = {
          name: this.state.name,
          bio: this.state.bio
        };
    
        this.props.updateInfo(user, this.props.user.id)
        .then(() => this.displaySuccessMessage())
        .then(() => this.getAndUpdateUserInfo()); 
    }

    handleSubmitCustomer(e) {
        e.preventDefault();
        let user = {
          name: this.state.name,
        };
    
        this.props.updateInfo(user, this.props.user.id)
        .then(() => this.displaySuccessMessage())
        .then(() => this.getAndUpdateUserInfo()); 
    }

    render(){
        const {user} = this.state;
        window.profileState = this.state;

        if (this.props.user.washerFlag) {
            // Washer Employee Profile
            return(
            <div className="profile-page">
                <h3> Welcome {this.state.name}!  </h3>
                <h2> Finish your bio and start with your first job </h2>
                <div className="dp-photo"> </div>
                <br/>
                <span> <button> Upload photo</button></span>
                {/* <p>  {user.timeStamp.slice(0,10)}</p> */}
                <p> Email address: {this.state.email}</p>

                <form  onSubmit={this.handleSubmitEmployee}> 
                    <span> Name: </span> <input type="text" 
                                    value={this.state.name}
                                    onChange={this.update('name')}/> 
                    

                    <br/>
                    <span>Bio: </span> <textarea
                                        rows="17" cols="60"
                                        value={this.state.bio}
                                        onChange={this.update('bio')}
                                        />
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

            </div>
            )
        } else if (this.props.user.customerFlag) {
            // Customer Profile
            return(
                <div className="profile-page">
                <h4> Welcome {this.state.name} Let's get your dishes done </h4>
                {/* <p> date joined: {user.timeStamp.slice(0,10)}< /p> */}
                <div className="dp-photo"> </div>
                <br/>
                <span> <button> Upload photo</button></span>

                <p> Email address: {this.state.email}</p> 

                <form onSubmit={this.handleSubmitCustomer}> 
                    <span> Name: </span> <input type="text" 
                                    value={this.state.name}
                                    onChange={this.update('name')}/> 
                    <br/>
                    <input className="save-2" type="submit" value="Save Changes"/>
                </form>

                <button onClick={this.getCurrentLocation} className="confirm-loc"> Get Current Location </button>

               
                <p className="change-confirmed hidden"> Changes successfully changed!</p>

                <div className="request-button">
                    {/* <p> Request a job</p> */}
                    <button> Request a job </button>
                </div>


             </div>
                )
        }
    }
}

export default withRouter(Profile);