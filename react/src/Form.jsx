import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Formulario = () => {
  const [nombre, setNombre] = useState('');
  const [empleo, setEmpleo] = useState('');
  const [nucleo, setNucleo] = useState('');
  const [edad, setEdad] = useState('');

  const notify = () => toast("Formulario enviado!");

  const enviarFormulario = () => {
      notify();    
      // Envía los datos al servidor
      const url = "http://localhost:3000/form";
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({nombre, empleo, nucleo, edad})
      })
      .then(res => res.json())
      .then(data => console.log(data));
  }
  const resetearCampos = () => {
    setNombre('');
    setEmpleo('');
    setNucleo('');
    setEdad('');
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ nombre, empleo, nucleo, edad });
    enviarFormulario();
    resetearCampos();
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        />
      <h1>Form</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: '300px', margin: '0 auto' }}>
        <label>
          Nombre:
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            style={{ display: 'block', marginBottom: '10px', width: '100%', padding: '5px' }}
          />
        </label>
        <br />
        <label>
          Empleo:
          <input
            type="text"
            value={empleo}
            onChange={(e) => setEmpleo(e.target.value)}
            style={{ display: 'block', marginBottom: '10px', width: '100%', padding: '5px' }}
          />
        </label>
        <br />
        <label>
          Núcleo:
          <input
            type="text"
            value={nucleo}
            onChange={(e) => setNucleo(e.target.value)}
            style={{ display: 'block', marginBottom: '10px', width: '100%', padding: '5px' }}
          />
        </label>
        <br />
        <label>
          Edad:
          <input
            type="number"
            value={edad}
            onChange={(e) => setEdad(parseInt(e.target.value))}
            style={{ display: 'block', marginBottom: '10px', width: '100%', padding: '5px' }}
          />
        </label>
        <br />
        <button type="submit" 
        // style={{ padding: '10px', backgroundColor: 'lightblue', border: 'none' }}
          className={nombre && edad && empleo && nucleo ? "btn btn-primary" : "btn btn-primary disabled"}>
          Enviar
        </button>
      </form>
    </>
  );
};

export default Formulario;
