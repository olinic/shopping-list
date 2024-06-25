import { Component } from 'react'

class Login extends Component {

    render() {
        return (
        <>
            <div className="container-sm max-width-sm">
                <h1>Sign In</h1>
                <form>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input id="username" className="form-control" type="text"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input id="password" className="form-control" type="password"/>
                    </div>
                    <input className="btn btn-primary" type="submit" value="Log In"/>
                </form>
            </div>
        </>
        );
    }
}

export default Login;