import {Link} from 'react-router-dom'


function MainPage() {
  return (
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold">WARDROBIFY!</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          Need to keep track of your shoes and hats? We have
          the solution for you!
        </p>
        <Link to="/hats/" style={{width:'170px'}} className="btn btn-primary btn-lg px-4 gap-3">Hats List</Link>
        <div style={{padding: "10px"}}></div>
        <Link to="/hats/new/" style={{width:'170px'}} className="btn btn-primary btn-lg px-4 gap-3">Add Hat</Link>
        <div style={{padding: "10px"}}></div>
        <Link to="/locations/" style={{width:'170px'}} className="btn btn-primary btn-lg px-4 gap-3">Locations List</Link>
        <div style={{padding: "10px"}}></div>
        <Link to="/locations/new/" style={{width:'170px'}} className="btn btn-primary btn-lg px-4 gap-3">Add Location</Link>
        <div style={{padding: "10px"}}></div>
        <Link to="/shoes/" style={{width:'170px'}} className="btn btn-primary btn-lg px-4 gap-3">Shoes List</Link>
        <div style={{padding: "10px"}}></div>
        <Link to="/shoes/new/" style={{width:'170px'}} className="btn btn-primary btn-lg px-4 gap-3">Add Shoes</Link>
        <div style={{padding: "10px"}}></div>
        <Link to="/bins/" style={{width:'170px'}} className="btn btn-primary btn-lg px-4 gap-3">Bins List</Link>
        <div style={{padding: "10px"}}></div>
        <Link to="/bins/new/" style={{width:'170px'}} className="btn btn-primary btn-lg px-4 gap-3">Add Bin</Link>
      </div>
    </div>
  );
}

export default MainPage;
