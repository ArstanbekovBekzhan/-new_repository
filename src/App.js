import { Routes, Route } from 'react-router-dom';
import "./App.css"
import { Homepage } from './pages/Home/Homepage.jsx';
import { CardDetails } from './component/Cards/CardDetails.jsx';
import { Layout } from './component/Layout/Layout.jsx'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />\
          <Route path="/cards/:id" element={<CardDetails />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;