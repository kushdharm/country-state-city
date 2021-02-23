import React, { Component } from 'react';
import '../style/form.css'

import axios from 'axios';
import countryArr from '../data/data';


export default class Form extends Component {
    
    constructor() {
        super()
        this.state = {
            Name: '',
            email: '',
            phoneNumber: '',
            countries: (countryArr),
            allState: [],
            cities: [],
             nameError: '',
             emailError: '',  
             phoneNumberError: '',
             selectedCountry:'',
             selectedState:'',
             selectedCity:''

        }
       

         this.handleChange = this.handleChange.bind(this)
         this.handleChangeCountry = this.handleChangeCountry.bind(this)
         this. handleChangeSt = this. handleChangeSt.bind(this)
    }

    handleError = (e) => {
        e.preventDefault();
        const {name, value} = e.target
        console.log(name, value);

        var nameRegex=/^[a-zA-Z ]{1,30}$/;
        var emailRegex=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var phoneRegex=/^[0-9]{10}$/

        switch (name) {
            case 'Name': 
                console.log("name",value.match(nameRegex));
                this.setState({nameError:value.match(nameRegex)? ''
                : 'max 30 characters a-z and A-Z'})
            break;

            case 'email': 
                this.setState({emailError: value.match(emailRegex)? ''
                : 'Please enter correct email'})
            break;

            case 'phoneNumber': 
                this.setState({phoneNumberError: value.match(phoneRegex)? ''
                : 'Please enter correct number'})
            break;
        }
    }

    handleChange(e) {
        const { name, value } = e.target
        this.setState({
           [name]: value
           
        })
        console.log(value);
    }
        handleChangeCountry = (e) => { 
        console.log(e.target.value); 
       if(e.target.value === "india") {
            this.setState({selectedCountry: e.target.value})
            const indiaSt = [ "Uttar Pradesh", "Madhya Pradesh", "Maharashtra", "Punjab" ]
            this.setState({allState : indiaSt});
            
            }
           
        }
          
        handleChangeSt = (e) => {
        console.log(e.target.value)
        this.setState({selectedState: e.target.value})
        if (e.target.value === "Uttar Pradesh") {
            const upCity = ["Kanpur","Lucknow","Faizabad","Gorakhpur","Ghaziabad","Noida","Saharanpur","Agra"]
            this.setState({cities : upCity});
        }
        else if (e.target.value === "Madhya Pradesh") {
            const mpCity = ["indore", "bhopal", "jabalpur", "Gawlior", "ujjain","Sagar","dewas", "Satna", "Ratlam", "rewa"]
            this.setState({cities : mpCity});
        }
        else if (e.target.value ===  "Punjab") {
            const pbCity = ["ludhina","amritsar","jalandhar","sahibzada","bhatinda","hoshiarpur","pathankot","chandigarh"]
            this.setState({cities : pbCity});
        }
        else if(e.target.value === "Maharashtra") {
            const mhCity = ["mumbai", "pune", "aurangabad", "nagpur", "nashik","Solapur","amravati"]
            this.setState({cities : mhCity});
        }
        
    } 

        handleChangeCity = (e) => {
            console.log(e.target.value)
            this.setState({selectedCity: e.target.value})
          
        }


        handleSubmit = (e) => {
            e.preventDefault();
            var Name = document.getElementById('name').value;
            var email = document.getElementById('email').value;
            var phoneNumber = document.getElementById('phoneNumber').value;
                console.log(Name, email, phoneNumber);
                console.log(this.state);
       
                if(this.state.nameError || this.state.emailError || this.state.phoneNumberError) {
                    alert('invalid inputs ')
                } else if(Name && email && phoneNumber && this.state.selectedCountry && this.state.selectedState && this.state.selectedCity ) {
                     axios.post('https://sheetdb.io/api/v1/fbbdw1o8hqdxq',{
            "data": {"name": Name, "email": email, "phoneNumber": phoneNumber,"country":this.state.selectedCountry, "state": this.state.selectedState, "city": this.state.selectedCity}
            }).then( response => {
                console.log(response.data);
                alert('form successfully submited');
                window.location.reload()
            
            });
        
                } else {
                    alert('please add your  addres')
                }
       
        }
 
    
        
        

    render() {
       
        return (
            <>
                <h1>Personal Details</h1>
                <form action="" className='form'  onSubmit={this.handleSubmit.bind(this)}>
                    <div className='name'> 
                        <label >Name : </label>
                        <input
                            id = "name"
                            type='text'
                            required
                            name='Name'
                            placeholder='Full Name'
                            onChange={this.handleError}
                         />
                        <span style={{fontSize:12, color: 'red'}}>
                            {this.state.nameError? this.state.nameError:''}
                        </span>
                    </div>
                    <div className='email'>
                        <label>Email : </label>
                        <input
                        id = "email"
                           type='text'
                           required
                            //value={this.state.email}
                            name='email'
                            placeholder='email'
                            onChange={this.handleError}
                        />
                        <span style={{fontSize:12, color: 'red'}}>
                             {this.state.emailError? this.state.emailError:''}
                        </span>
                    </div>
                    <div className='phone_number'>
                        <label > phone no :</label>
                        <input
                        id ="phoneNumber"
                            type='text'
                            required
                           // value={this.state.phoneNumber}
                            name='phoneNumber'
                            placeholder='phone Number'
                            onChange={this.handleError}
                        />
                        <span style={{fontSize:12, color: 'red'}}>
                             {this.state.phoneNumberError? this.state.phoneNumberError:''}
                        </span>
                    </div>

                {/* ---------------------------Address----------------------- */}
                         <h1>Add Address</h1>
                    <div className="addres">
                         <div className="country">
                        <label > Country :</label>
                        <select
                         onChange = {this.handleChangeCountry}
                        >
                            <option value="select country">Select Country</option>
                            {this.state.countries.map((country)=>(
                                <option id='selected_country' key={country} value={country}>{country}</option>
                            ))}
                        </select>
                     </div>
                     <div className="state">
                        <label > State :</label>
                        {console.log("allState" ,this.state.allState)}
                        <select 
                        onChange = {this.handleChangeSt}
                        >
                            <option value="Select state">Select State</option>
                         {this.state.allState.map((st)=>(
                                <option key={st} value={st}>{st}</option>
                            ))}
                        </select>
                    </div>
                    <div className="city">
                        {console.log("cities",this.state.cities)}
                        <label > city :</label>
                        <select
                        onChange = {this.handleChangeCity}
                          >
                           <option value="Select state">Select city</option>
                         {this.state.cities.map((city)=>(
                                <option key={city} value={city}>{city}</option>
                            ))}  
                        </select>  
                    </div>
                    </div>
                    <button type='submit'> submit </button>
                </form>
            </>
        );
    }
}
