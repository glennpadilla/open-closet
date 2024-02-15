import { NavLink } from 'react-router-dom';

function Nav() {
	const closeNavbar = () => {
		const navbarToggler = document.querySelector(".navbar-toggler");
		if (navbarToggler && navbarToggler.getAttribute("aria-expanded") === "true") {
			navbarToggler.click();
		}
	};

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-info">
			<div className="container-fluid">
				<NavLink className="navbar-brand" to="/">Open Closet</NavLink>
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>

				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{ flexWrap: "wrap"}}>

						<li className="nav-item">
							<NavLink className="nav-link active" aria-current="page" to="/" onClick={closeNavbar}>Home</NavLink>
						</li>

						<li className="nav-item dropdown">
							<a className="nav-link dropdown-toggle" href="#" id="hatsDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
								Hats
							</a>
							<ul className="dropdown-menu" aria-labelledby="hatsDropdown">
								<li>
									<NavLink className="dropdown-item" to="/hats/" onClick={closeNavbar}>List Hats</NavLink>
								</li>
								<li>
									<NavLink className="dropdown-item" to="/hats/new/" onClick={closeNavbar}>Create Hat</NavLink>
								</li>
							</ul>
						</li>

						<li className="nav-item dropdown">
							<a className="nav-link dropdown-toggle" href="#" id="locationsDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
								Locations
							</a>
							<ul className="dropdown-menu" aria-labelledby="locationsDropdown">
								<li>
									<NavLink className="nav-link" to="/locations/" onClick={closeNavbar}>List Locations</NavLink>
								</li>
								<li>
									<NavLink className="nav-link" to="/locations/new/" onClick={closeNavbar}>Create Location</NavLink>
								</li>
							</ul>
						</li>

						<li className="nav-item dropdown">
							<a className="nav-link dropdown-toggle" href="#" id="shoesDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
								Shoes
							</a>
							<ul className="dropdown-menu" aria-labelledby="shoesDropdown">
								<li>
									<NavLink className="nav-link" to="/shoes/" onClick={closeNavbar}>List Shoes</NavLink>
								</li>
								<li>
									<NavLink className="nav-link" to="/shoes/new/" onClick={closeNavbar}>Create Shoes</NavLink>
								</li>
							</ul>
						</li>

						<li className="nav-item dropdown">
							<a className="nav-link dropdown-toggle" href="#" id="binsDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
								Bins
							</a>
							<ul className="dropdown-menu" aria-labelledby="binsDropdown">
								<li>
									<NavLink className="nav-link" to="/bins/" onClick={closeNavbar}>List Bins</NavLink>
								</li>
								<li>
									<NavLink className="nav-link" to="/bins/new/" onClick={closeNavbar}>Create Bin</NavLink>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	)
}

export default Nav;
