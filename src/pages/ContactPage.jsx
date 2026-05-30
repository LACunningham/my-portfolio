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
  if (name === 'nombre') return value.trim().length >= 3;
  if (name === 'email') return /^[a-zA-Z0-9._-]{2,50}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value);
  if (name === 'mensaje') return value.trim().length >= 10;
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

    if (!state.nombre.trim()) nuevosErrores.nombre = 'El nombre es obligatorio.';
    else if (state.nombre.trim().length < 3) nuevosErrores.nombre = 'El nombre debe tener al menos 3 caracteres.';

    if (!state.email.trim()) nuevosErrores.email = 'El correo electrónico es obligatorio.';
    else if (!regexEmail.test(state.email)) nuevosErrores.email = 'El formato del correo no es válido.';

    if (!state.mensaje.trim()) nuevosErrores.mensaje = 'El mensaje no puede estar vacío.';
    else if (state.mensaje.trim().length < 10) nuevosErrores.mensaje = 'El mensaje debe ser más descriptivo (mínimo 10 caracteres).';

    return nuevosErrores;
  };

  const handleChange = (e) => {
    dispatch({ type: 'CAMBIAR_CAMPO', name: e.target.name, value: e.target.value });
  };

  const handleBlur = () => {
    dispatch({ type: 'SET_ERRORES', payload: validarFormulario() });
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

  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    fontSize: '0.95rem',
    fontFamily: 'var(--sans)',
    color: 'var(--text-heading)',
    backgroundColor: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    outline: 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    boxSizing: 'border-box'
  };

  const inputFocusStyle = {
    borderColor: 'var(--accent-border)',
    boxShadow: '0 0 0 3px var(--accent-light)'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.85rem',
    fontWeight: 500,
    color: 'var(--text-heading)',
    marginBottom: '6px'
  };

  return (
    <div style={{ maxWidth: '560px', margin: '0 auto', padding: '48px 24px', animation: 'fadeInUp 0.6s ease-out' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '8px', textAlign: 'center' }}>Contacto</h1>
      <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '36px' }}>
        ¿Tenés alguna propuesta o duda? Escribime y te responderé a la brevedad.
      </p>

      {enviado && (
        <div style={{
          padding: '14px 20px',
          backgroundColor: 'rgba(74, 124, 89, 0.1)',
          border: '1px solid var(--success)',
          borderRadius: '8px',
          color: 'var(--success)',
          fontSize: '0.9rem',
          fontWeight: 500,
          textAlign: 'center',
          marginBottom: '24px',
          animation: 'slideIn 0.3s ease-out'
        }}>
          Mensaje enviado con éxito. Me pondré en contacto pronto.
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="nombre" style={labelStyle}>
            Nombre completo
          </label>
          <input
            ref={state.errores.nombre ? firstErrorRef : null}
            type="text"
            id="nombre"
            name="nombre"
            value={state.nombre}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Juan Pérez"
            style={{
              ...inputStyle,
              borderColor: state.errores.nombre ? '#c0392b' : isFieldValid('nombre', state.nombre) ? 'var(--success)' : 'var(--border)'
            }}
            disabled={cargando}
            onFocus={(e) => { if (!state.errores.nombre) { e.target.style.borderColor = inputFocusStyle.borderColor; e.target.style.boxShadow = inputFocusStyle.boxShadow; } }}
            onBlurCapture={(e) => { if (!state.errores.nombre) { e.target.style.borderColor = isFieldValid('nombre', state.nombre) ? 'var(--success)' : 'var(--border)'; e.target.style.boxShadow = 'none'; } }}
          />
          {state.errores.nombre && (
            <p style={{ fontSize: '0.8rem', color: '#c0392b', margin: '4px 0 0' }}>{state.errores.nombre}</p>
          )}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="email" style={labelStyle}>
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={state.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="nombre@correo.com"
            style={{
              ...inputStyle,
              borderColor: state.errores.email ? '#c0392b' : isFieldValid('email', state.email) ? 'var(--success)' : 'var(--border)'
            }}
            disabled={cargando}
            onFocus={(e) => { if (!state.errores.email) { e.target.style.borderColor = inputFocusStyle.borderColor; e.target.style.boxShadow = inputFocusStyle.boxShadow; } }}
            onBlurCapture={(e) => { if (!state.errores.email) { e.target.style.borderColor = isFieldValid('email', state.email) ? 'var(--success)' : 'var(--border)'; e.target.style.boxShadow = 'none'; } }}
          />
          {state.errores.email && (
            <p style={{ fontSize: '0.8rem', color: '#c0392b', margin: '4px 0 0' }}>{state.errores.email}</p>
          )}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label htmlFor="mensaje" style={labelStyle}>Mensaje</label>
            <span style={{
              fontSize: '0.78rem',
              color: caracteresRestantes < 50 ? '#c0392b' : 'var(--text-secondary)',
              transition: 'color 0.2s'
            }}>
              {caracteresRestantes} caracteres
            </span>
          </div>
          <textarea
            id="mensaje"
            name="mensaje"
            rows="5"
            maxLength={500}
            value={state.mensaje}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Escribí tu mensaje acá..."
            style={{
              ...inputStyle,
              resize: 'vertical',
              minHeight: '120px',
              borderColor: state.errores.mensaje ? '#c0392b' : isFieldValid('mensaje', state.mensaje) ? 'var(--success)' : 'var(--border)'
            }}
            disabled={cargando}
            onFocus={(e) => { if (!state.errores.mensaje) { e.target.style.borderColor = inputFocusStyle.borderColor; e.target.style.boxShadow = inputFocusStyle.boxShadow; } }}
            onBlurCapture={(e) => { if (!state.errores.mensaje) { e.target.style.borderColor = isFieldValid('mensaje', state.mensaje) ? 'var(--success)' : 'var(--border)'; e.target.style.boxShadow = 'none'; } }}
          />
          {state.errores.mensaje && (
            <p style={{ fontSize: '0.8rem', color: '#c0392b', margin: '4px 0 0' }}>{state.errores.mensaje}</p>
          )}
        </div>

        <div style={{ display: 'flex', gap: '12px', marginTop: '28px' }}>
          <button
            type="submit"
            disabled={cargando}
            style={{
              flex: 1,
              padding: '12px 24px',
              fontSize: '0.9rem',
              fontWeight: 500,
              color: '#fff',
              backgroundColor: 'var(--accent)',
              border: 'none',
              borderRadius: '8px',
              cursor: cargando ? 'not-allowed' : 'pointer',
              opacity: cargando ? 0.6 : 1,
              transition: 'background-color 0.2s ease, opacity 0.2s ease'
            }}
            onMouseEnter={(e) => { if (!cargando) e.target.style.backgroundColor = 'var(--accent-hover)'; }}
            onMouseLeave={(e) => { if (!cargando) e.target.style.backgroundColor = 'var(--accent)'; }}
          >
            {cargando ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <span style={{
                  display: 'inline-block',
                  width: '16px',
                  height: '16px',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderTopColor: '#fff',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite'
                }} />
                Enviando...
              </span>
            ) : 'Enviar mensaje'}
          </button>
          <button
            type="button"
            onClick={handleLimpiar}
            disabled={cargando}
            style={{
              padding: '12px 24px',
              fontSize: '0.9rem',
              fontWeight: 500,
              color: 'var(--text-secondary)',
              backgroundColor: 'transparent',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              cursor: cargando ? 'not-allowed' : 'pointer',
              opacity: cargando ? 0.6 : 1,
              transition: 'border-color 0.2s ease, color 0.2s ease'
            }}
            onMouseEnter={(e) => { if (!cargando) { e.target.style.borderColor = 'var(--text-secondary)'; e.target.style.color = 'var(--text-heading)'; } }}
            onMouseLeave={(e) => { if (!cargando) { e.target.style.borderColor = 'var(--border)'; e.target.style.color = 'var(--text-secondary)'; } }}
          >
            Limpiar
          </button>
        </div>
      </form>

      <div style={{
        marginTop: '40px',
        padding: '20px',
        backgroundColor: 'var(--accent-light)',
        borderRadius: '8px',
        border: '1px solid var(--accent-border)'
      }}>
        <h6 style={{ margin: '0 0 12px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-heading)' }}>
          Otras formas de contacto
        </h6>
        <div style={{ fontSize: '0.85rem', color: 'var(--text)', lineHeight: 2 }}>
          <span>Email: luciano.cu97@gmail.com</span><br />
          <span>LinkedIn: <a href="https://www.linkedin.com/in/luciano-agustin-cunningham-martinez-a6ab0a309/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>Mi perfil</a></span><br />
          <span>GitHub: <a href="https://github.com/LACunningham/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>Mi repositorio</a></span>
        </div>
      </div>
    </div>
  );
};
