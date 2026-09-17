import { Link, useLocation } from 'react-router-dom';
import logoDesktop from "../../images/logo-desktop.png";
import logoMobile from "../../images/logo-mobile.png";

export default function Header({
  loggedIn,
  email,
  onSignOut,
}) {

  const location = useLocation();

  const isSignup = location.pathname === '/signup';
  const isSignin = location.pathname === '/signin';
  const showAuthLink = isSignup || isSignin;

  const linkPath = isSignup ? '/signin' : '/signup';
  const linkText = isSignup ? 'Iniciar sesión' : 'Regístrate';


    return(
        <header className="header">
        <nav className="nav">
          <img
            src={logoDesktop}
            alt="Logo de la página, tamaño desktop"
            className="nav__logo-desktop"
          />

          <img
            src={logoMobile}
            alt="Logo de la página, tamaño mobile"
            className="nav__logo-mobile"
          />

           {loggedIn ? (
              <div className='nav__user'>
                <span className='nav__email'>{email}</span>

                <button
                  type='button'
                  className='nav__logout'
                  onClick={onSignOut}
                >
                  Cerrar sesión
                </button>
              </div>
            ) : (
              showAuthLink && (
                <Link to={linkPath} className='nav__auth-link'>
                  {linkText}
                </Link>
              )
            )}

        </nav>
        
      </header>
    );
}