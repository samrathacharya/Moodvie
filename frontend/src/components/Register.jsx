import React,{ Component } from 'react'
import { register } from './UserFunctions'
import "./css/rejister.css";

class Register extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            email: '',
            password: ''
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault()

        const newUser = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }
        register(newUser)
        .then(res => {
            console.log(res)
            if (res.data.result === "success") {
                this.props.history.push("/home")
            }
        })

        
    }

    render() {
        return (
            <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form onSubmit={this.onSubmit} methods="POST">
                            <h1 className="h3 mb-3 font-weight-normal">Register</h1>
                            {/* <div className="form-group"> */}
                                <label htmlFor="username">username</label>
                                <input type="text"
                                    name="username"
                                    placeholder="Enter username"
                                    value={this.state.username}
                                    onChange={this.onChange}
                                /><br />
                            {/* </div> */}
                            {/* <div className="form-group"> */}
                                <label htmlFor="password">Email</label>
                                <input type="text"
                                    name="email"
                                    placeholder="Enter Email"
                                    value={this.state.Email}
                                    onChange={this.onChange}
                                /><br />
                            {/* </div> */}
                            {/* <div className="form-group"> */}
                                <label htmlFor="password">Password</label>
                                <input type="text"
                                    name="password"
                                    placeholder="Enter Password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                /><br />
                            {/* </div> */}
                            <button type="submit"
                                className="btn btn-lg btn-primary btn-block">
                                Register   
                            </button>
                        </form>
                    </div>
                </div>
                {/* <form>
      <label>First Name</label>
      <input type="text" name="first"/><br />
      <label>Last Name</label>
      <input type="text" name="last"/><br />
      <label>Email</label>
      <input type="text" name="email"/><br />
    </form> */}
            </div>
            </React.Fragment>
        )
    }
}

export default Register