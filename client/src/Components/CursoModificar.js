import React, { Component } from 'react';
import { getJWT } from '../helpers/jwt';

class CursoModificar extends Component {
    constructor() {
        super();
        this.state = {
            tema: '',
            duracion: '',
            anioDictado: '',
            alumnos: [
                { nombre: '', apellido: '', dni: '', direccion: '', nota: '' }
            ]
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        const myJwt = getJWT();
        if (!myJwt) {
            this.props.history.push('/');
        } else {
            fetch(
                'http://localhost:3001/cursos/' +
                    this.props.match.params.idCurso,
                { headers: { Authorization: `Bearer ${myJwt}` } }
            )
                .then(res => {
                    if (res.status === 200) {
                        return res.json();
                    } else if (res.status === 404 || res.status === 500) {
                        throw new Error(res.statusText);
                    } else if (res.status === 401) {
                        this.props.history.push('/');
                    }
                })
                .then(data => {
                    this.setState({
                        tema: data[0].tema,
                        duracion: data[0].duracion,
                        anioDictado: data[0].anioDictado,
                        alumnos: data[0].alumnos
                    });
                })
                .catch(err => console.log(err));
        }
    }

    handleChange(event) {
        const { name, value } = event.target;
        if (
            ['nombre', 'apellido', 'direccion', 'dni', 'nota'].includes(
                event.target.className
            )
        ) {
            let index = event.target.getAttribute('data-key');
            let alumnos = [...this.state.alumnos];
            alumnos[index][event.target.className] = event.target.value;
            this.setState({ alumnos });
        } else {
            this.setState({
                [name]: value
            });
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        let date = this.state.anioDictado.toString();
        if (!getJWT()) {
            this.props.history.push('/');
        } else {
            const myJwt = getJWT();
            fetch(
                'http://localhost:3001/cursos/' +
                    this.props.match.params.idCurso,
                {
                    //Creo que seria mejor usar un PUT
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${myJwt}`
                    },
                    body: JSON.stringify({
                        anioDictado: date,
                        duracion: this.state.duracion,
                        tema: this.state.tema,
                        alumnos: this.state.alumnos
                    })
                }
            )
                .then(res => {
                    if (res.status === 201) {
                        console.log(res.statusText);
                    } else if (res.status === 500 || res.status === 404) {
                        throw new Error(res.statusText);
                    } else if (res.status === 401) {
                        this.props.history.push('/');
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    agregarAlumno = event => {
        event.preventDefault();
        this.setState(prevState => ({
            alumnos: [
                ...prevState.alumnos,
                { dni: '', nombre: '', apellido: '', direccion: '', nota: '' }
            ]
        }));
    };

    render() {
        const formStyle = {
            maxWidth: 900,
            textAlign: 'center',
            margin: '20px auto',
            padding: 50,
            borderRadius: 8,
            marginTop: '10vw'
        };

        const alumnosStyle = {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gridGap: 70,
            margin: '40px auto',
            alignItems: 'center'
        };

        return (
            <form style={formStyle} onSubmit={this.handleSubmit}>
                <div
                    style={{
                        backgroundColor: 'white',
                        padding: 30,
                        borderRadius: 10
                    }}
                >
                    <h2 style={{ color: 'black' }}>
                        Curso de {this.state.tema}
                    </h2>
                    <hr style={{ borderColor: '#ee5c21' }} />
                    <input
                        type="text"
                        value={this.state.tema}
                        onChange={this.handleChange}
                        name="tema"
                    />
                    <input
                        type="text"
                        value={this.state.duracion}
                        onChange={this.handleChange}
                        name="duracion"
                    />
                    <input
                        type="date"
                        value={this.state.anioDictado.toString().split('T')[0]}
                        onChange={this.handleChange}
                        name="anioDictado"
                    />
                </div>
                <div style={alumnosStyle}>
                    {this.state.alumnos.map((alumno, index) => {
                        return (
                            <div
                                key={index}
                                data-key={index}
                                style={{
                                    backgroundColor: 'white',
                                    padding: 30,
                                    borderRadius: 10
                                }}
                            >
                                <h4>
                                    <i
                                        className="fas fa-user-graduate"
                                        style={{ marginRight: 20 }}
                                    />
                                    Alumno {alumno.nombre}
                                </h4>
                                <hr style={{ borderColor: '#ee5c21' }} />
                                <input
                                    type="text"
                                    placeholder="Nombre"
                                    value={alumno.nombre}
                                    data-key={index}
                                    onChange={this.handleChange}
                                    className="nombre"
                                />
                                <input
                                    type="text"
                                    placeholder="Apellido"
                                    value={alumno.apellido}
                                    data-key={index}
                                    onChange={this.handleChange}
                                    className="apellido"
                                />
                                <input
                                    type="text"
                                    placeholder="Direccion"
                                    value={alumno.direccion}
                                    data-key={index}
                                    onChange={this.handleChange}
                                    className="direccion"
                                />
                                <input
                                    type="text"
                                    placeholder="Documento"
                                    value={alumno.dni}
                                    data-key={index}
                                    onChange={this.handleChange}
                                    className="dni"
                                />
                                <input
                                    type="text"
                                    placeholder="Nota"
                                    value={alumno.nota}
                                    data-key={index}
                                    onChange={this.handleChange}
                                    className="nota"
                                />
                            </div>
                        );
                    })}
                    <button
                        onClick={this.agregarAlumno}
                        style={{
                            borderRadius: '50%',
                            maxWidth: 60,
                            maxHeight: 60,
                            justifySelf: 'center'
                        }}
                    >
                        <i
                            className="fas fa-plus"
                            style={{
                                fontSize: 50
                            }}
                        />
                    </button>
                </div>
                <button className="myButton">Modificar</button>
            </form>
        );
    }
}
export default CursoModificar;
