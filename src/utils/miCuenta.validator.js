export async function obtenerMiCuenta() {
  const token = localStorage.getItem('token');

  if (!token) throw new Error('No hay token disponible');

  const res = await fetch('/api/mi-cuenta', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Error al obtener datos');
  }

  return await res.json();
}

export async function registrarCBU(datos) {
  const res = await fetch('/api/registrar-cbu', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(datos)
  });

  if (!res.ok) throw new Error('Error al registrar CBU');
  return await res.json();
}
