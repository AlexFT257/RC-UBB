
  return (
    // TODO: Agregar un key que no sea Math.random()
    <div key={Math.random()}>
      <h1>PRUEBA DE DATOS</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" value={nombre} onChange={handleNombreChange} />
        </div>
        <div>
          <label htmlFor="acronimo">Acrónimo:</label>
          <input type="text" id="acronimo" value={acronimo} onChange={handleAcronimoChange} />
        </div>
        <button type="submit">Crear carrera</button>
      </form>
    </div>
  );
}