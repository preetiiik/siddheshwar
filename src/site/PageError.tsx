import { Component, type ReactNode } from 'react';

export default class PageError extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    if (this.state.failed) return <section className="s-container s-not-found" role="alert"><p className="s-eyebrow">Connection interrupted</p><h1>We couldn’t load this space.</h1><p>Please reload the page to try again.</p><button type="button" className="s-action" onClick={() => window.location.reload()}>Reload Page</button></section>;
    return this.props.children;
  }
}
