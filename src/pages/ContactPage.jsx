import { useReducer, useState, useRef } from 'react';

const estadoInicial = {
  nombre: '',
  email: '',
  mensaje: '',
  errores: {}
};

const formularioReducer = (state, action) => {
  switch (action.type) {
    case 'CAMBIAR_CAMPO':
      return {
        ...state,
        [action.name]: action.value,
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

const isFieldValid = (name, value) => {
  if (name === 'nombre') {
    return value.trim().length >= 3;
  }
  if (name === 'email') {
    const regexEmail = /^[a-zA-Z0-9._-]{2,50}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regexEmail.test(value);
  }
  if (name === 'mensaje') {
    return value.trim().length >= 10;
  }
  return false;
};

export const ContactPage = () => {
  const [state, dispatch] = useReducer(formularioReducer, estadoInicial);
  const [enviado, setEnviado] = useState(false);
  const [cargando, setCargando] = useState(false);
  const firstErrorRef = useRef(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const erroresValidacion = validarFormulario();

    if (Object.keys(erroresValidacion).length === 0) {
      setCargando(true);
      setTimeout(() => {
        setEnviado(true);
        dispatch({ type: 'RESETEAR_FORMULARIO' });
        setCargando(false);
        setTimeout(() => setEnviado(false), 3000);
      }, 1200);
    } else {
      dispatch({ type: 'SET_ERRORES', payload: erroresValidacion });
      firstErrorRef.current?.focus();
    }
  };

  const handleLimpiar = () => {
    dispatch({ type: 'RESETEAR_FORMULARIO' });
  };

  const caracteresRestantes = 500 - state.mensaje.length;

  return (
    <div style={{ animation: 'fadeInUp 0.6s ease-out' }}>
      <div className="container py-3" style={{ maxWidth: '600px' }}>
        <h1 className="display-5 fw-bold mb-2 text-center">Ponte en contacto</h1>
        <p className="text-center text-muted mb-5" style={{ fontSize: '16px' }}>
          ¿Tenés alguna propuesta, duda o simplemente querés saludar? ¡Escribime! Respondo en las siguientes 24 horas.
        </p>

        {enviado && (
          <div
            className="alert alert-success text-center fw-bold mb-4"
            role="alert"
            style={{
              animation: 'slideIn 0.3s ease-out, fadeInUp 0.3s ease-out 2.7s backwards',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}
          >
            <span style={{ fontSize: '24px' }}>✓</span>
            ¡Mensaje enviado con éxito! Me pondré en contacto pronto.
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate style={{ animation: 'slideIn 0.5s ease-out' }}>
          {/* Campo Nombre */}
          <div className="mb-4">
            <label htmlFor="nombre" className="form-label d-flex align-items-center gap-2">
              <span>👤 Nombre Completo</span>
              {isFieldValid('nombre', state.nombre) && <span style={{ color: 'var(--accent)' }}>✓</span>}
            </label>
            <input
              ref={state.errores.nombre ? firstErrorRef : null}
              type="text"
              className={`form-control ${state.errores.nombre ? 'is-invalid' : ''}`}
              id="nombre"
              name="nombre"
              value={state.nombre}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Juan Pérez"
              style={{
                transition: 'border-color 0.3s, box-shadow 0.3s',
                borderColor: state.errores.nombre ? '#dc3545' : isFieldValid('nombre', state.nombre) ? 'var(--accent)' : undefined
              }}
              disabled={cargando}
            />
            {state.errores.nombre && (
              <div className="invalid-feedback d-block" style={{ fontSize: '14px' }}>
                {state.errores.nombre}
              </div>
            )}
            <small className="text-muted" style={{ display: 'block', marginTop: '4px' }}>
              Mínimo 3 caracteres
            </small>
          </div>

          {/* Campo Email */}
          <div className="mb-4">
            <label htmlFor="email" className="form-label d-flex align-items-center gap-2">
              <span>📧 Correo Electrónico</span>
              {isFieldValid('email', state.email) && <span style={{ color: 'var(--accent)' }}>✓</span>}
            </label>
            <input
              type="email"
              className={`form-control ${state.errores.email ? 'is-invalid' : ''}`}
              id="email"
              name="email"
              value={state.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="nombre@correo.com"
              style={{
                transition: 'border-color 0.3s, box-shadow 0.3s',
                borderColor: state.errores.email ? '#dc3545' : isFieldValid('email', state.email) ? 'var(--accent)' : undefined
              }}
              disabled={cargando}
            />
            {state.errores.email && (
              <div className="invalid-feedback d-block" style={{ fontSize: '14px' }}>
                {state.errores.email}
              </div>
            )}
            <small className="text-muted" style={{ display: 'block', marginTop: '4px' }}>
              Usado para responderte
            </small>
          </div>

          {/* Campo Mensaje */}
          <div className="mb-4">
            <label htmlFor="mensaje" className="form-label d-flex align-items-center gap-2 justify-content-between">
              <span>
                💬 Mensaje
                {isFieldValid('mensaje', state.mensaje) && <span style={{ color: 'var(--accent)' }}>✓</span>}
              </span>
              <small style={{
                color: caracteresRestantes < 50 ? '#dc3545' : 'var(--text)',
                transition: 'color 0.3s'
              }}>
                {caracteresRestantes} caracteres
              </small>
            </label>
            <textarea
              className={`form-control ${state.errores.mensaje ? 'is-invalid' : ''}`}
              id="mensaje"
              name="mensaje"
              rows="5"
              maxLength={500}
              value={state.mensaje}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Escribí tu mensaje acá..."
              style={{
                transition: 'border-color 0.3s, box-shadow 0.3s',
                borderColor: state.errores.mensaje ? '#dc3545' : isFieldValid('mensaje', state.mensaje) ? 'var(--accent)' : undefined,
                resize: 'vertical'
              }}
              disabled={cargando}
            />
            {state.errores.mensaje && (
              <div className="invalid-feedback d-block" style={{ fontSize: '14px' }}>
                {state.errores.mensaje}
              </div>
            )}
            <small className="text-muted" style={{ display: 'block', marginTop: '4px' }}>
              Mínimo 10 caracteres
            </small>
          </div>

          {/* Botones */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            <button
              type="submit"
              className="btn btn-primary flex-grow-1"
              disabled={cargando}
              style={{
                animation: 'slideIn 0.5s ease-out 0.1s backwards',
                opacity: cargando ? 0.6 : 1,
                transition: 'opacity 0.3s'
              }}
            >
              {cargando ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Enviando...
                </>
              ) : (
                'Enviar Mensaje'
              )}
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={handleLimpiar}
              disabled={cargando}
              style={{
                animation: 'slideIn 0.5s ease-out 0.2s backwards',
                opacity: cargando ? 0.6 : 1,
                transition: 'opacity 0.3s'
              }}
            >
              Limpiar
            </button>
          </div>
        </form>

        <div style={{
          marginTop: '32px',
          padding: '20px',
          backgroundColor: 'var(--accent-bg)',
          borderRadius: '8px',
          animation: 'slideIn 0.5s ease-out 0.3s backwards'
        }}>
          <h6 style={{ marginBottom: '12px', color: 'var(--text-h)' }}>📞 Otras formas de contactarme</h6>
          <div style={{ fontSize: '14px', color: 'var(--text)' }}>
            <p style={{ margin: '4px 0' }}>📧 Email: tu@email.com</p>
            <p style={{ margin: '4px 0' }}>💼 LinkedIn: <a href="#" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Mi perfil</a></p>
            <p style={{ margin: '4px 0' }}>🐙 GitHub: <a href="#" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Mi repositorio</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};