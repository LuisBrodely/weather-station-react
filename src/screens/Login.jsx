import img from "../assets/background.jpg";
import logo from "../assets/beh-software.svg";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { MyContext } from "../context/MyContext";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate()
  const { authenticated, setAuthenticated, user, setUser } =
    useContext(MyContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://bahcorpback.ddns.net/api/user/sign-in",
        formData
      );

      if (response.data) {
        const token = response.data.data.token;
        const decodificar = token.split(" ")[1];
        localStorage.setItem('token', decodificar);
        navigate('/')
      }

      // Reiniciar los valores del formulario
      setFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      alert(error)
      console.error("Error al enviar los datos del formulario:", error);
    }
  };

  return (
    <section className="bg-black">
      <div className="flex min-h-screen">
        <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <img className="h-12 w-auto" src={logo} alt="Your Company" />
              <h2 className="mt-8 text-3xl font-bold tracking-tight text-pearl-50">
                Ingresa con tu cuenta
              </h2>
              <p className="mt-2 text-sm text-gray-300">
                ¿No tienes una cuenta?{" "}
                <Link
                  to="/register"
                  className="font-medium text-jasper-100 hover:text-jasper-100/90"
                >
                  Registrate aqui
                </Link>
              </p>
            </div>

            <div className="mt-8">
              <div className="mt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-400"
                    >
                      Correo electronico
                    </label>
                    <div className="mt-1">
                      <input
                        onChange={handleChange}
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="block w-full appearance-none rounded-md border bg-night-50 border-night-50 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-400"
                    >
                      Contraseña
                    </label>
                    <div className="mt-1">
                      <input
                        onChange={handleChange}
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="block w-full appearance-none rounded-md border bg-night-50 border-night-50 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  {/* <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 rounded bg-pearl-50 border-night-50 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-2 block text-sm text-gray-400"
                      >
                        Recodarme
                      </label>
                    </div>

                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-medium text-jasper-100 hover:text-jasper-100/90"
                      >
                        ¿Olvidaste tu contraseña?
                      </a>
                    </div>
                  </div> */}

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md border border-transparent bg-jasper-100 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-jasper-100/90 focus:outline-none focus:ring-2 focus:ring-jasper-100/90 focus:ring-offset-2"
                    >
                      Iniciar sesión
                    </button>
                  </div>
                </form>
              </div>

              <div className="mt-10">
                <div>
                  <p className="text-sm font-medium text-gray-400 mb-2">
                    Siguenos en
                  </p>

                  <div className="mt-1 grid grid-cols-3 gap-3">
                    <div>
                      <a
                        href="#"
                        className="inline-flex w-full justify-center rounded-md border border-night-50 bg-night-50 py-2 px-4 text-sm font-medium text-pearl-50 shadow-sm "
                      >
                        <span className="sr-only">Sign in with Facebook</span>
                        <svg
                          className="h-5 w-5"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    </div>

                    <div>
                      <a
                        href="#"
                        className="inline-flex w-full justify-center rounded-md border border-night-50 bg-night-50 py-2 px-4 text-sm font-medium text-pearl-50 shadow-sm"
                      >
                        <span className="sr-only">Sign in with Twitter</span>
                        <svg
                          className="h-5 w-5"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a>
                    </div>

                    <div>
                      <a
                        href="#"
                        className="inline-flex w-full justify-center rounded-md border border-night-50 bg-night-50 py-2 px-4 text-sm font-medium text-pearl-50 shadow-sm"
                      >
                        <span className="sr-only">Sign in with GitHub</span>
                        <svg
                          className="h-5 w-5"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            className="absolute inset-0 h-full w-full object-contain"
            src={img}
            alt="Imagen hormiga"
            width={5120}
            height={2880}
          />
        </div>
      </div>
    </section>
  );
}
