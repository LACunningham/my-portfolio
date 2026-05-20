import { useReducer, useState } from 'react';
// 1. Definimos el estado inicial del formulario
const estadoInicial = {
  nombre: '',
  email: '',
  mensaje: '',
  errores: {}
};

// 2. El Reducer para manejar todas las acciones del formulario (Requisito useReducer)
const formularioReducer = (state, action) => {
  switch (action.type) {
    case 'CAMBIAR_CAMPO':
      return {
        ...state,
        [action.name]: action.value,
        // Limpiamos el error del campo apenas el usuario empieza a escribir de nuevo
        errores: { ...state.errores, [action.name]: '' }
      };
    case 'SET_ERRORES':
      return {
        ...state,
        errores: action.payload
      };
    case 'RESETEAR_FORMULARIO':
      return estadoInicial;
    default:
      return state;
  }
};

export const ContactPage = () => {
  const [state, dispatch] = useReducer(formularioReducer, estadoInicial);
  const [enviado, setEnviado] = useState(false); // Para mostrar mensaje de éxito

  // 3. Función de validación de campos
  const validarFormulario = () => {
    const nuevosErrores = {};
    const regexEmail = /^[a-zA-Z0-9._-]{2,50}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!state.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es obligatorio.';
    } else if (state.nombre.trim().length < 3) {
      nuevosErrores.nombre = 'El nombre debe tener al menos 3 caracteres.';
    }

    if (!state.email.trim()) {
      nuevosErrores.email = 'El correo electrónico es obligatorio.';
    } else if (!regexEmail.test(state.email)) {
      nuevosErrores.email = 'El formato del correo no es válido.';
    }

    if (!state.mensaje.trim()) {
      nuevosErrores.mensaje = 'El mensaje no puede estar vacío.';
    } else if (state.mensaje.trim().length < 10) {
      nuevosErrores.mensaje = 'El mensaje debe ser más descriptivo (mínimo 10 caracteres).';
    }

    return nuevosErrores;
  };

  // 4. Manejadores de Eventos (onChange, onBlur, onSubmit)
  const handleChange = (e) => {
    dispatch({
      type: 'CAMBIAR_CAMPO',
      name: e.target.name,
      value: e.target.value
    });
  };

  const handleBlur = () => {
    const erroresValidacion = validarFormulario();
    dispatch({ type: 'SET_ERRORES', payload: erroresValidacion });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const erroresValidacion = validarFormulario();

    if (Object.keys(erroresValidacion).length === 0) {
      // Si no hay errores, simulamos el envío exitoso
      setEnviado(true);
      dispatch({ type: 'RESETEAR_FORMULARIO' });
      
      // Ocultamos el cartel de éxito después de 4 segundos
      setTimeout(() => setEnviado(false), 4000);
    } else {
      dispatch({ type: 'SET_ERRORES', payload: erroresValidacion });
    }
  };

  return (
    <div className="container py-3" style={{ maxWidth: '600px' }}>
      <h1 className="display-5 fw-bold mb-4 text-center">Contacto</h1>
      <p className="text-center text-muted mb-4">
        ¿Tenés alguna propuesta, duda o simplemente querés saludar? ¡Escribime!
      </p>

      {/* Renderizado condicional: Mensaje de éxito */}
      {enviado && (
        <div className="alert alert-success text-center fw-bold" role="alert">
          ¡Mensaje enviado con éxito! Me pondré en contacto pronto.
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Campo Nombre */}
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre Completo</label>
          <input
            type="text"
            className={`form-control ${state.errores.nombre ? 'is-invalid' : ''}`}
            id="nombre"
            name="nombre"
            value={state.nombre}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Juan Pérez"
          />
          {/* Renderizado condicional del error */}
          {state.errores.nombre && <div className="invalid-feedback">{state.errores.nombre}</div>}
        </div>

        {/* Campo Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Correo Electrónico</label>
          <input
            type="email"
            className={`form-control ${state.errores.email ? 'is-invalid' : ''}`}
            id="email"
            name="email"
            value={state.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="nombre@correo.com"
          />
          {state.errores.email && <div className="invalid-feedback">{state.errores.email}</div>}
        </div>

        {/* Campo Mensaje */}
        <div className="mb-3">
          <label htmlFor="mensaje" className="form-label">Mensaje</label>
          <textarea
            className={`form-control ${state.errores.mensaje ? 'is-invalid' : ''}`}
            id="mensaje"
            name="mensaje"
            rows="5"
            value={state.mensaje}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Escribí tu mensaje acá..."
          ></textarea>
          {state.errores.mensaje && <div className="invalid-feedback">{state.errores.mensaje}</div>}
        </div>

        {/* Botón de Envío */}
        <button type="submit" className="btn btn-primary w-100 btn-lg mt-3">
          Enviar Mensaje
        </button>
      </form>
    </div>
  );
};