import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// @ts-ignore
import * as blurhash from 'blurhash-as/browser';
import wasmURL from 'blurhash-as/build/optimized.wasm?url';

blurhash.setURL(wasmURL);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
