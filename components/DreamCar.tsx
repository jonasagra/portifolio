// Seção "dream car" da aba principal: o Porsche 911 Carrera S em letreiro largo e a ficha técnica escrita como código.
export function DreamCar() {
  return (
    <section className="dream-car" aria-label="Carro favorito">
      <p className="dream-car-label">Dream car</p>
      <h2 className="dream-car-title">
        <span className="dream-car-brand">Porsche</span>
        <span className="dream-car-model">911 Carrera S</span>
      </h2>
      <figure className="code-card">
        <figcaption className="code-card-bar">
          <span className="code-dot" />
          <span className="code-dot" />
          <span className="code-dot" />
          <span className="code-file">dream-car.ts</span>
        </figcaption>
        <pre className="code-body">
          <code>
            <span className="tk-key">const</span> <span className="tk-var">dreamCar</span> <span className="tk-op">=</span> {"{"}
            {"\n"}  <span className="tk-prop">model</span>: <span className="tk-str">&quot;Porsche 911 Carrera S&quot;</span>,
            {"\n"}  <span className="tk-prop">engine</span>: <span className="tk-str">&quot;3.0 twin-turbo flat-six&quot;</span>,
            {"\n"}  <span className="tk-prop">power</span>: <span className="tk-str">&quot;450 PS&quot;</span>,
            {"\n"}  <span className="tk-prop">zeroToHundred</span>: <span className="tk-str">&quot;3.7 s&quot;</span>,
            {"\n"}  <span className="tk-prop">topSpeed</span>: <span className="tk-str">&quot;308 km/h&quot;</span>,
            {"\n"}  <span className="tk-prop">color</span>: <span className="tk-str">&quot;Racing Yellow&quot;</span>,
            {"\n"}{"}"};
          </code>
        </pre>
      </figure>
    </section>
  );
}
