import React, {useState} from 'react';
import * as Yup from "yup";
import { register } from "../../api/auth.api.js";
import { useAuth } from '../../auth/useAuth.js';
import { toast, ToastContainer } from "react-toastify";
import { motion, AnimatePresence } from "motion/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import PropTypes from "prop-types";
import EyeIcon from "../../assets/icon/eye.png";
import EyeOffIcon from "../../assets/icon/eye-off.png";

const RegisterForm = ({showRegister, setShowRegister}) => {
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const { authLogin } = useAuth();
    
    return (
        <Formik
            initialValues={{ name: '', email: '', password: '', passwordConfirm: '' }}
            validationSchema={Yup.object({
                email: Yup.string().email('Wrong email').required("Required field"),
                password: Yup.string()
                    .min(8, 'Min 8 symbols')
                    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter') 
                    .matches(/[^\w]/, 'Password must contain at least one special character') 
                    .required("Required field"),
                passwordConfirm: Yup.string()
                    .oneOf([Yup.ref('password'), null], 'Passwords must match')
                    .required("Required field"),
                name: Yup.string().min(2, 'Min 2 symbols').required("Required field"),
            })}
            onSubmit={async (values, { setSubmitting }) => {
                try {
                    const { passwordConfirm, ...dataForServer } = values;

                    const data = await register(dataForServer);
                    authLogin(data);
                    toast.success('Register successful!');
                } catch (error) {
                    toast.error('Register failed! Please check your credentials.');
                    console.error('Register error', error);
                    console.log('Помилки від сервера:', error.response.data);
                } finally {
                    setSubmitting(false);
                }
            }}
        >
            {({ isSubmitting, resetForm }) => (
                <AnimatePresence 
                    mode="wait" 
                    initial={false}
                >
                    {showRegister && (
                        <motion.div
                            key="register"
                            initial={{x: 400}}
                            animate={{x: 0}}
                            exit={{x: -400}}
                            transition={{duration: 1, ease: 'easeInOut'}}
                            className="h-full"
                        >
                            <Form className="flex flex-col items-center p-8 justify-between  h-full w-full">
                                <h3 className="text-2xl lg:text-4xl text-text-sub">
                                    Register
                                </h3>
                                <div className="relative w-full md:w-3/4">
                                    <Field
                                        type="text"
                                        name="name"
                                        placeholder="Your name..."
                                        className="input font-gaegu focus:outline-0 text-xl w-full lg:text-2xl px-3 py-1 rounded-lg border-border"
                                    />
                                    <ErrorMessage name="name">
                                        {msg => (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10, scale: 0.9 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                className="error-tooltip"
                                            >
                                                {msg}
                                                <div className="error-arrow" />
                                            </motion.div>
                                        )}
                                    </ErrorMessage>
                                </div>
                                <div className="relative w-full md:w-3/4">
                                    <Field
                                        type="email"
                                        name="email"
                                        placeholder="Email..."
                                        className="input font-gaegu focus:outline-0 text-xl w-full lg:text-2xl px-3 py-1 rounded-lg border-border"
                                    />
                                    <ErrorMessage name="email">
                                        {msg => (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10, scale: 0.9 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                className="error-tooltip"
                                            >
                                                {msg}
                                                <div className="error-arrow" />
                                            </motion.div>
                                        )}
                                    </ErrorMessage>
                                </div>
                                <div className="relative w-full md:w-3/4"> 
                                    <Field
                                        type={showPass ? "text" : "password"}
                                        name="password"
                                        placeholder="Password..."
                                        className="input font-gaegu focus:outline-none text-xl w-full lg:text-2xl px-3 py-1 rounded-lg border border-border"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPass(!showPass)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-sub hover:text-black transition-colors"
                                    >
                                        {showPass ? (
                                            <img
                                                src={EyeOffIcon} 
                                                alt="Eye off" 
                                                className="w-5 h-5"
                                            />
                                        ) : (
                                            <img 
                                                src={EyeIcon} 
                                                alt="Eye" 
                                                className="w-5 h-5"
                                            />
                                        )}
                                    </button>
                                    <ErrorMessage name="password">
                                        {msg => (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10, scale: 0.9 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                className="error-tooltip"
                                            >
                                                {msg}
                                                <div className="error-arrow" />
                                            </motion.div>
                                        )}
                                    </ErrorMessage>
                                </div>
                                <div className="relative w-full md:w-3/4">
                                    <Field
                                        type={showConfirmPass ? "text" : "password"}
                                        name="passwordConfirm"
                                        placeholder="Confirm password..."
                                        className="input font-gaegu focus:outline-none text-xl w-full lg:text-2xl px-3 py-1 rounded-lg border-border"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPass(!showConfirmPass)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-sub hover:cursor-pointer transition-colors"
                                    >
                                        {showConfirmPass ? (
                                            <img 
                                                src={EyeOffIcon} 
                                                alt="Eye off" 
                                                className="w-5 h-5"
                                            />
                                        ) : (
                                            <img 
                                                src={EyeIcon}
                                                alt="Eye" 
                                                className="w-5 h-5"
                                            />
                                        )}
                                    </button>
                                    <ErrorMessage name="passwordConfirm">
                                        {msg => (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10, scale: 0.9 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                className="error-tooltip"
                                            >
                                                {msg}
                                                <div className="error-arrow" />
                                            </motion.div>
                                        )}
                                    </ErrorMessage>
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-8 py-1 w-full md:w-3/4 text-xl text-white bg-black rounded-lg hover:cursor-pointer lg:text-2xl"
                                >
                                    {isSubmitting ? 'Loading...' : 'Register'}
                                </button>
                                <p className="text-text-sub lg:text-xl">
                                    Already have an account?
                                    <button
                                        className="px-2 hover:cursor-pointer hover:text-highlight-3"
                                        style={{ 
                                            backgroundImage: 'var(--color-progress)',
                                            backgroundSize: '200% 200%',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                        }}
                                        type="button"
                                        onClick={() => {
                                            resetForm();
                                            setShowPass(false);
                                            setShowConfirmPass(false);
                                            setShowRegister(!showRegister);
                                        }}
                                    >
                                        Sign in
                                    </button>
                                </p>
                                <ToastContainer
                                    className="container"
                                    position="top-right"
                                    autoClose={3000}
                                />
                            </Form>
                        </motion.div>
                    )}
                </AnimatePresence>
            )}
        </Formik>
    );
};

RegisterForm.propTypes = {
    showRegister: PropTypes.bool.isRequired,
    setShowRegister: PropTypes.func.isRequired,
}

export default RegisterForm;