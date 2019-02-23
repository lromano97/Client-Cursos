import React, { Component } from 'react';
import './App.css';
import NavBar from './Components/NavBar';
import Login from './Components/Login';
import CursosLista from './Components/CursosLista';
import Alumnos from './Components/Alumnos';
import Home from './Components/Home';
import CursoCrear from './Components/CursoCrear';
import CursoModificar from './Components/CursoModificar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <NavBar />
                    <Switch>
                        <Route path="/" component={Login} exact />
                        <Route path="/home" component={Home} exact />
                        <Route path="/cursos" component={CursosLista} exact />
                        <Route
                            path="/crearCurso"
                            component={CursoCrear}
                            exact
                        />
                        <Route
                            path="/cursos/:idCurso/alumnos"
                            component={Alumnos}
                            exact
                        />
                        <Route
                            path="/modificarCurso/:idCurso"
                            component={CursoModificar}
                            exact
                        />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
