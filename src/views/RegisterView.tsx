import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { RegisterForm } from "../interfaces";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import api from "../config/axios";

export default function RegisterView() {

    const initialValues: RegisterForm = {
        name: '',
        email: '',
        handle: '',
        password: '',
        password_confirmation: ''
    }

    const { register, watch, reset, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues });

    const password = watch('password');

    const handleRegister = async (formData: RegisterForm) => {
        const registrarUsuario = api.post(`/auth/register`, formData);

        toast.promise(registrarUsuario, {
            loading: 'Creando usuario...',
            success: (response) => {

                reset();
                return {
                    message: response.data.message,
                    description: `El usuario ${formData.name} ha sido registrado correctamente`,
                    duration: 4000,
                };
            },
            error: (error) => {
                const mensaje = isAxiosError(error) && error.response
                    ? error.response.data.error
                    : 'Error al conectar con el servidor';

                return {
                    message: 'Error de registro',
                    description: mensaje,
                    duration: 5000,
                };
            },
        });
    }

    return (
        <>
            <h1 className="text-4xl text-white font-bold">Crea una cuenta</h1>
            <p className="text-slate-400">Crea una cuenta para poder acceder a la plataforma</p>
            <form
                onSubmit={handleSubmit(handleRegister)}
                className="bg-white  px-5 py-20 rounded-lg space-y-10 mt-10"
            >
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="name" className="text-2xl text-slate-500">Nombre</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Tu Nombre"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"

                        {...register('name', {
                            required: 'El nombre es obligatorio'
                        })}
                    />
                    {errors.name && <ErrorMessage> {errors.name.message} </ErrorMessage>}

                </div>
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="email" className="text-2xl text-slate-500">E-mail</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"

                        {...register('email', {
                            required: 'Tu Email es obligatorio',
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
                            },
                        })}
                    />
                    {errors.email && <ErrorMessage> {errors.email.message} </ErrorMessage>}
                </div>
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="handle" className="text-2xl text-slate-500">Handle</label>
                    <input
                        id="handle"
                        type="text"
                        placeholder="Nombre de usuario: sin espacios"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"

                        {...register('handle', {
                            required: 'El handle es obligatorio'
                        })}
                    />

                    {errors.handle && <ErrorMessage> {errors.handle.message} </ErrorMessage>}
                </div>
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="password" className="text-2xl text-slate-500">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password de Registro"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"

                        {...register('password', {
                            required: 'El Password es obligatorio',
                            minLength: {
                                value: 8,
                                message: 'El Password debe tener al menos 8 caracteres'
                            },
                        })}
                    />
                    {errors.password && <ErrorMessage> {errors.password.message} </ErrorMessage>}
                </div>

                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="password_confirmation" className="text-2xl text-slate-500">Repetir Password</label>
                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Repetir Password"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"

                        {...register('password_confirmation', {
                            required: 'Repetir Password es obligatorio',
                            validate: (value) => value === password || 'Los Passwords no coinciden'
                        })}
                    />
                    {errors.password_confirmation && <ErrorMessage> {errors.password_confirmation.message} </ErrorMessage>}
                </div>

                <input
                    type="submit"
                    className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                    value='Crear Cuenta'
                />
            </form>

            <nav className="mt-10">
                <Link
                    className="text-center text-white text-lg block"
                    to="/auth/Login"> Si ya tienes una cuenta, Inicia Sesion aqui!! </Link>
            </nav>
        </>

    )
}
