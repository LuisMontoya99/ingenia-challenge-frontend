import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Button from "./Button";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { items } = useSelector((state: RootState) => state.cart);

  const links = [
    { to: "/home", text: "Inicio" },
    { to: "/products", text: "Productos" },
    { to: "/cart", text: "Carrito" },
  ];

  useEffect(() => {
    const handleResize = () => window.innerWidth >= 768 && setIsMenuOpen(false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const activeClass = "text-primary font-medium";
  const inactiveClass = "text-gray-400 hover:text-secondary";

  return (
    <nav className="bg-white fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <NavLink
              to="/home"
              className="text-2xl font-bold text-primary hover:text-secondary transition-colors"
            >
              Ingenia<span className="text-text">Store</span>
            </NavLink>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) =>
              link.to === "/cart" ? (
                <div key={link.to} className="relative">
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `relative ${isActive ? activeClass : inactiveClass}`
                    }
                  >
                    {link.text}
                  </NavLink>
                  {items.length > 0 && (
                    <span className="absolute -top-2 -right-4 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {items.reduce((acc, item) => acc + item.quantity, 0)}
                    </span>
                  )}
                </div>
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `relative ${isActive ? activeClass : inactiveClass}`
                  }
                >
                  {link.text}
                </NavLink>
              )
            )}
          </div>

          <div className="flex items-center md:hidden">
            <Button
              onClick={toggleMenu}
              className="!p-0 !bg-transparent !shadow-none hover:!scale-100 !text-gray-500 hover:!text-gray-700"
              ariaLabel={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div ref={menuRef} className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((link) =>
              link.to === "/cart" ? (
                <div key={link.to} className="relative w-max">
                  <NavLink
                    to={link.to}
                    onClick={toggleMenu}
                    className={({ isActive }) =>
                      `block pl-3 pr-2 pb-2 pt-0 rounded-md text-base font-medium ${
                        isActive
                          ? "text-primary"
                          : "text-gray-700 hover:text-secondary"
                      }`
                    }
                  >
                    {link.text}
                  </NavLink>
                  {items.length > 0 && (
                    <span className="absolute -top-2 -right-4 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {items.reduce((acc, item) => acc + item.quantity, 0)}
                    </span>
                  )}
                </div>
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={toggleMenu}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium ${
                      isActive
                        ? "text-primary"
                        : "text-gray-700 hover:text-secondary"
                    }`
                  }
                >
                  {link.text}
                </NavLink>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
