import React, { Component } from 'react';
import { getJWT } from '../helpers/jwt';

class Curso extends Component {
    constructor() {
        super();
        this.state = {
            alumnos: []
        };
    }

    componentDidMount() {
        if (!getJWT()) {
            this.props.history.push('/');
        } else {
            fetch(
                'http://localhost:3001/cursos/' +
                    this.props.match.params.idCurso +
                    '/alumnos',
                {
                    headers: { Authorization: `Bearer ${getJWT()}` }
                }
            )
                .then(res => {
                    if (res.status === 404) {
                        throw new Error(res.statusText);
                    } else if (res.status === 401) {
                        this.props.history.push('/');
                    } else {
                        return res.json();
                    }
                })
                .then(data => {
                    this.setState({
                        alumnos: data[0].alumnos
                    });
                });
        }
    }

    render() {
        const alumnosStyle = {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gridGap: 10,
            margin: 30,
            alignItems: 'stretch'
        };

        const alumnoStyle = {
            backgroundColor: '#FFFF ',
            padding: 30,
            borderRadius: 10,
            fontFamily: 'Arial, Helvetica, sans-serif'
        };

        const alumnosList = this.state.alumnos.map(alumno => {
            return (
                <div style={alumnoStyle}>
                    <h4 style={{ textAlign: 'center', fontSize: 50 }}>
                        <i className="fas fa-user-graduate" />
                    </h4>
                    <h5
                        style={{
                            textAlign: 'center',
                            fontWeight: 800,
                            fontSize: 20
                        }}
                    >
                        {alumno.nombre} {alumno.apellido}
                    </h5>
                    <ul className="fa-ul">
                        <li>
                            <span className="fa-li">
                                <i className="fas fa-id-card" />
                            </span>
                            DNI: {alumno.dni}
                        </li>
                        <li>
                            {' '}
                            <span className="fa-li">
                                <i className="fas fa-home" />
                            </span>
                            Dirección: {alumno.direccion}
                        </li>
                    </ul>
                </div>
            );
        });
        return (
            <div>
                <h2 style={{ margin: 10 }}>Alumnos</h2>
                <hr />
                <div style={alumnosStyle}>{alumnosList}</div>
            </div>
        );
    }
}

export default Curso;
