import { ChangeEvent, Component, FormEvent } from 'react'
import { login } from './AuthService';

interface LoginProps {}
interface LoginState {
    username: string,
    password: string
}

class Login extends Component<LoginProps, LoginState> {

    constructor(props: LoginProps) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        this.setState({
            ...this.state,
            [event.target.name]: value
        });
    }

    handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        login(this.state.username, this.state.password)
                .then(response => {
                    console.log("got a response", response);
                }).catch(() => {
                    console.log("no response");
                })
    }

    render() {
        return (
        <>
            <div className="container-sm max-width-sm">
                <h1>Sign In</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input id="username" name="username" className="form-control" type="text" 
                                value={this.state.username} onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input id="password" name="password" className="form-control" type="password"
                                value={this.state.password} onChange={this.handleChange}/>
                    </div>
                    <input className="btn btn-primary" type="submit" value="Log In"/>
                </form>
            </div>
        </>
        );
    }
}

export default Login;