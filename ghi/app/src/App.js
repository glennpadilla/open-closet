import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import HatsList from './hatsComponents/HatsList'
import HatForm from './hatsComponents/HatForm'
import LocationsList from './hatsComponents/LocationsList'
import LocationForm from './hatsComponents/LocationForm'

import ShoeList from './ShoeList'
import ShoeForm from './ShoeForm'
import BinList from './BinList'
import BinForm from './BinForm'

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
