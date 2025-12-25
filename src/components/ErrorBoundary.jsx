import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Error logged for debugging
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: "white", padding: 20 }}>
          <h2>⚠️ 3D Renderer Crashed</h2>
          <p>{String(this.state.error)}</p>
          <button onClick={() => window.location.reload()}>
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

