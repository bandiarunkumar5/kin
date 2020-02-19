import React from 'react';
import './App.css';

const emailRegex = RegExp(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);

const formvalid= ({forErrors,...rest})=> {
  let valid = true;
// validate form errors being empty
  Object.values(forErrors).forEach((val)=>{
    val.length> 0 && (valid=false)
  });
// validate the form was filled out
  Object.values(rest).forEach(val=>{
    val=== null && (valid=false);
  });
  return valid;
};

class App extends React.Component{
  constructor(props)
  {
    super(props);
    this.state={
      firstName:null,
      lastName:null,
      email:null,
      password:null,
      
      forErrors:{
        firstName:"",
        lastName:"",
        email:"",
        password:""
      }
    };
  }

    handleSubmit=e=>
    {
      e.preventDefault();
      
      if(formvalid(this.state))
      {
        localStorage.setItem('document',JSON.stringify(this.state));
        console.log(`
        First Name: ${this.state.firstName}
        Last Name:${this.state.lastName}
        Email :${this.state.email}
        Password :${this.state.password}
        `)

      }

      else{
        console.log("Form Invalid- Display Error Msg")
      }
    };

    componentDidMount() {
      this.documentData = JSON.parse(localStorage.getItem('document'));
   
      if (localStorage.getItem('document')) {
          this.setState({
              firstName: this.documentData.firstName,
             lastName: this.documentData.lastName,
             email: this.documentData.email,
             password: this.documentData.password
      })
  } else {
      this.setState({
          firstName: '',
          lastName: '',
          email: '',
          password:''
      })
  }
  }
   

    handleChange=e=>{
      e.preventDefault();
      const {name,value} = e.target;
      let forErrors = this.state.forErrors;

    

      switch(name)
      {
        case "firstName":
          forErrors.firstName=
          value.length < 3  ? "minbimum 3 characters required":"";
          break;

          case "lastName":
            forErrors.lastName=
            value.length < 3  ? "minbimum 3 characters required":"";
            break;

            case "emai":
              forErrors.email=
              emailRegex.test(value)  ? '':"invbalid emsilm address";
              break;

              case "password":
                forErrors.firstName=
                value.length < 6 ? "minbimum 6 characters required":"";
                break;

                default:
                  break;
      }

      this.setState({forErrors,[name]:value},
        () => console.log(this.state));

    }
  render()
  {
    const {forErrors}= this.state;
  return (
    <div className="Wrapper">
      <div className="form-Wrapper">
      <h1>Create Account</h1> 
      <form onSubmit={this.handleSubmit} noValidate>
      <div className="firstName">
        <label htmlFor="firstName"> First Name</label>
        <input  className={forErrors.firstName.length > 0 ? "error": null} placeholder="First Name" 
        type="text" name="firstName" noValidate onChange={this.handleChange}/>
      {forErrors.firstName.length>0 && (
        <span className="errorMessage">{forErrors.firstName}</span>
      )}

      </div>
      <div className="lastName">
        <label htmlFor="lastName"> Last Name</label>
        <input  className={forErrors.lastName.length > 0 ? "error": null} placeholder="Last Name" 
        type="text" name="lastName" noValidate onChange={this.handleChange}/>

            {forErrors.lastName.length>0 && (
          <span className="errorMessage">{forErrors.firstName}</span>
                        )}
      </div>
      <div className="email">
        <label htmlFor="email"> Email</label>
        <input  className={forErrors.email.length > 0 ? "error": null} placeholder="Email" 
        type="email" name="email" noValidate onChange={this.handleChange}/>
         
            {forErrors.email.length>0 && (
          <span className="errorMessage">{forErrors.firstName}</span>
                        )}
      </div>
      <div className="password">
        <label htmlFor="password"> Password</label>
        <input className={forErrors.password.length > 0 ? "error": null} placeholder="Password" 
        type="password" name="password" noValidate onChange={this.handleChange}/>

            {forErrors.password.length>0 && (
          <span className="errorMessage">{forErrors.firstName}</span>
                        )}
      </div>
      <div className="createAccount">
        <button type="submit">Create Account</button>
        <small>Already jave an account?</small>
      </div>
      </form>
    </div>
    </div>
  );
}
}

export default App;
