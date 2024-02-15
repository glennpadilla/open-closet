import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import HatsList from './hats/HatsList'
import HatForm from './hats/HatForm'
import LocationsList from './hats/LocationsList'
import LocationForm from './hats/LocationForm'

import ShoeList from './shoes/ShoeList'
import ShoeForm from './shoes/ShoeForm'
import BinList from './shoes/BinList'
import BinForm from './shoes/BinForm'

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>

          <Route path="/" element={<MainPage />} />

          <Route path="/hats/" element={<HatsList />} />
          <Route path="/hats/new/" element={<HatForm />} />

          <Route path="/locations/" element={<LocationsList />} />
          <Route path="/locations/new/" element={<LocationForm />} />

          <Route path="/shoes/" element={<ShoeList />} />
          <Route path="/shoes/new/" element={<ShoeForm />} />

          <Route path="/bins/" element={<BinList />} />
          <Route path="/bins/new/" element={<BinForm />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
