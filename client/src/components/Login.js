import React, { useState } from "react"
import axios from "axios"

function Login() {
    const [user, setUser] = useState({
        username: "",
        password: ""
    })

    function handleChange(event) {
        const {name, value} = event.target;
        setUser({
            ...user,
            [name]: value
        })
    }

    function handleSubmit(event) {
        event.preventDefault()

        // POST to server
        axios.post("http://localhost:5000/api/login", user)
            .then(res => {
                //TODO
            })
    }

    return <div className="container p-5">
        <div className="card p-5">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group" >
                    <input onChange={handleChange} className="form-control" name="username" type="text" placeholder="Username" value={user.username} /> 
                </div>
                <div className="form-group">
                    <input onChange={handleChange} className="form-control" name="password" type="password" placeholder="Password" value={user.password} />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
            <div>
                <p>Not registered? <a href="/register">Click here</a>.</p>
            </div>
        </div>
    </div>
}

export default Login;