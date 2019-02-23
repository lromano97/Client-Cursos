import React, { Component } from 'react';
import { getJWT } from '../helpers/jwt';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    componentDidMount() {
        if (getJWT()) {
            this.props.history.push('/home');
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch('http://localhost:3001/users/login', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        })
            .then(res => {
                if (res.status === 401) {
                    this.setState({
                        fail: true
                    });
                } else {
                    return res.json();
                }
            })
            .then(data => {
                //Deberia mandarse a las cookies (npm install universal-cookie)
                localStorage.setItem('my_jwt', data.token);
                this.props.history.push('/home');
            });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h2>
                    <i className="fas fa-user" style={{ color: 'black' }} />
                </h2>
                <input
                    type="text"
                    value={this.state.username}
                    name="username"
                    placeholder="Usuario"
                    onChange={this.handleChange}
                />
                <input
                    type="password"
                    value={this.state.password}
                    name="password"
                    placeholder="Contraseña"
                    onChange={this.handleChange}
                />
                <button className="myButton">Iniciar sesión</button>
            </form>
        );
    }
}

export default Login;
