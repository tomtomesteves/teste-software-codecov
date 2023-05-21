import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarExample01"
            aria-controls="navbarExample01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarExample01">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item active">
                <NavLink
                  data-testid="home-btn"
                  to="/"
                  className=" btn "
                  activeClassName="active"
                >
                  Home
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="p-5 text-center bg-light">
        <h1 className="mb-3">Lista de tarefas</h1>
        <h4 className="mb-3">Adicione tarefas a serem feitas!</h4>
        {!global.window.location.pathname.includes('/add') && (
          <NavLink
            data-testid="add-btn"
            to="/add"
            className="link btn btn-primary"
            activeClassName="active"
          >
            Adicionar item
          </NavLink>
        )}
      </div>
    </header>
  )
}

export default Header
