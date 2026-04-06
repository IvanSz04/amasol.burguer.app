import { useState } from 'react'

function App() {
  // Estado para guardar los productos del pedido actual
  const [carrito, setCarrito] = useState([]);
  // Estado para el total
  const [total, setTotal] = useState(0);

  // FUNCIÓN EJEMPLO: Agregar un producto
  const agregarProducto = (nombre, precio) => {
    // Agregamos el producto a la lista (array)
    setCarrito([...carrito, { nombre, precio }]);
    // Sumamos el precio al total actual
    setTotal(total + precio);
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Calculadora de Pedidos</h1>
      
      {/* SECCIÓN DE BOTONES: Aquí es donde tú agregas tus productos */}
      <div>
        <button onClick={() => agregarProducto('Hamburguesa Simple', 15000)}>
          🍔 Hamburguesa ($15.000)
        </button>
        
        {/* TU TURNO: Crea aquí un botón para 'Papas Fritas' que cueste 5000 */}
        {/* TU TURNO: Crea aquí un botón para 'Gaseosa' que cueste 4000 */}
      </div>

      {/* SECCIÓN DE RESUMEN */}
      <div style={{ marginTop: '20px', borderTop: '1px solid #ccc' }}>
        <h3>Resumen del Pedido:</h3>
        <ul>
          {carrito.map((item, index) => (
            <li key={index}>{item.nombre} - ${item.precio}</li>
          ))}
        </ul>
        <h2>Total: ${total}</h2>
      </div>
    </div>
  )
}

export default App