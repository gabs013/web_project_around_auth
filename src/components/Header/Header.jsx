import logoDesktop from "../../images/logo-desktop.png";
import logoMobile from "../../images/logo-mobile.png";

export default function Header() {

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
        </nav>
        
      </header>
    );
}