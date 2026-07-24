import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("Error de renderizado:", error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-black px-4 text-center">
          <div>
            <h1 className="font-display text-2xl font-bold text-brand-300">
              Algo salió mal
            </h1>
            <p className="mt-2 text-neutral-300 max-w-md">
              Ocurrió un error inesperado al cargar esta página. Intenta recargar o vuelve al
              inicio.
            </p>
            <button
              onClick={() => window.location.assign("/")}
              className="mt-6 px-5 py-2.5 rounded-md bg-brand-500 text-black font-semibold hover:bg-brand-400 transition-colors"
            >
              Volver al inicio
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
