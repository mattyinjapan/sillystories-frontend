// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import { useEffect } from 'react';
// import api from './api';
// import './App.css'


// function App() {
//   console.log('app is running');
  // const [count, setCount] = useState(0)
  // useEffect(() => {
  //   api.get('/ping')
  //     .then(response => {
  //       console.log('API response:', response.data);
  //     })
  //     .catch(error => {
  //       console.error('API error:', error);
  //     });
  // }, []);
  // return (
  //   <>
  //     <div>
  //       <a href="https://vite.dev" target="_blank">
  //         <img src={viteLogo} className="logo" alt="Vite logo" />
  //       </a>
  //       <a href="https://react.dev" target="_blank">
  //         <img src={reactLogo} className="logo react" alt="React logo" />
  //       </a>
  //     </div>
  //     <h1>Vite + React</h1>
  //     <div className="card">
  //       <button onClick={() => setCount((count) => count + 1)}>
  //         count is {count}
  //       </button>
  //       <p>
  //         Edit <code>src/App.tsx</code> and save to test HMR
  //       </p>
  //     </div>
  //     <p className="read-the-docs">
  //       Click on the Vite and React logos to learn more
  //     </p>
  //   </>
  // )
// }

// export default App

import AppRoutes from './routes/AppRoutes';

import './App.css'

function App() {
  return <AppRoutes />
}

export default App