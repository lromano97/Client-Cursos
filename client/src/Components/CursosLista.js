import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { getJWT } from '../helpers/jwt';

class CursosLista extends Component {
    constructor() {
        super();
        this.state = {
            cursos: []
        };
    }

    componentDidMount() {
        const jwt = getJWT();
        if (!jwt) {
            this.props.history.push('/');
        } else {
            fetch('http://localhost:3001/cursos', {
                headers: { Authorization: `Bearer ${jwt}` }
            })
                .then(res => res.json())
                .then(data => {
                    this.setState({
                        cursos: data
                    });
                });
        }
    }

    render() {
        const styleCurso = {
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            padding: 30,
            gridColumnStart: 1,
            gridColumnEnd: 7,
            borderRadius: 10,
            fontFamily: 'Arial, Helvetica, sans-serif'
        };

        const styleModificar = {
            marginLeft: 'auto',
            fontSize: 20
        };

        const styleCursosList = {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gridGap: 10,
            margin: 10
        };

        let cursosList = this.state.cursos.map(curso => {
            return (
                <div style={styleCurso} key={curso._id}>
                    <h4
                        style={{
                            textTransform: 'uppercase'
                        }}
                    >
                        {curso.tema}
                    </h4>
                    <ul className="fa-ul">
                        <li>
                            <span className="fa-li">
                                <i className="fas fa-calendar-alt" />
                            </span>
                            Año: {new Date(curso.anioDictado).getFullYear()}
                        </li>
                        <li>
                            <span className="fa-li">
                                <i className="fas fa-clock" />
                            </span>
                            Duración:
                            {curso.duracion > 1
                                ? ` ${curso.duracion} meses`
                                : ` ${curso.duracion} mes`}
                        </li>
                    </ul>
                    <NavLink
                        to={'/cursos/' + curso._id + '/alumnos'}
                        style={{ textDecoration: 'none' }}
                    >
                        <i
                            className="fas fa-user-graduate"
                            style={{ marginRight: 10 }}
                        />
                        Ver alumnos
                    </NavLink>
                    <NavLink
                        to={'/modificarCurso/' + curso._id}
                        style={styleModificar}
                    >
                        <i className="fas fa-edit" />
                    </NavLink>
                </div>
            );
        });
        return (
            <div style={{ margin: 10, marginTop: 30 }}>
                <h2>Cursos de DBlandIT</h2>
                <hr />
                <div style={styleCursosList}>{cursosList}</div>
            </div>
        );
    }
}

export default CursosLista;
