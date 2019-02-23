import React from 'react';

function Home() {
    const styleDiv = {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 400
    };
    return (
        <div style={styleDiv}>
            <h1>Bienvenido a los cursos de DBlandIT</h1>
        </div>
    );
}

export default Home;
