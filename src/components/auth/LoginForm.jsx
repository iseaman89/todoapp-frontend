import { motion, AnimatePresence } from 'motion/react';
import { login } from '../../api/auth.api.js';
import { useAuth } from '../../auth/useAuth.js';
import { toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import React, { useState } from "react";
import EyeOffIcon from "../../assets/icon/eye-off.png";
import EyeIcon from "../../assets/icon/eye.png";

function LoginForm({ showRegister, setShowRegister }) {
    const [showPass, setShowPass] = useState(false);
    const { authLogin } = useAuth();

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={Yup.object({
                email: Yup.string()
                    .email('Wrong email')
                    .required('Required field'),
                password: Yup.string()
                    .min(8, 'Min 8 symbols')
                    .required('Required field'),
            })}
            onSubmit={async (values, { setSubmitting }) => {
                try {
                    const data = await login(values.email, values.password);
                    authLogin(data);
                    toast.success('Login successful!');
                } catch {
                    toast.error('Please check your credentials.');
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
                    {!showRegister && (
                        <motion.div
                            key="login-form"
                            initial={{ x: 400 }}
                            animate={{ x: 0 }}
                            exit={{ x: -400 }}
                            transition={{ duration: 0.8, ease: 'easeInOut' }}
                            className="h-full"
                        >
                            <Form className="flex flex-col items-center p-8 justify-between h-full w-full">
                                <h3 className="text-4xl text-text-sub">
                                    Login
                                </h3>
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
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-8 py-1 w-full md:w-3/4 text-xl text-white bg-black rounded-lg hover:cursor-pointer lg:text-2xl"
                                >
                                    {isSubmitting ? 'Loading...' : 'Login'}
                                </button>

                                <p className="text-text-sub lg:text-xl">
                                    Any account?
                                    <button
                                        type="button"
                                        className="px-2 hover:cursor-pointer hover:text-highlight-3"
                                        style={{ 
                                            backgroundImage: 'var(--color-progress)',
                                            backgroundSize: '200% 200%',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                        }}
                                        onClick={() => {
                                            resetForm();
                                            setShowPass(false);
                                            setShowRegister(true)
                                        }}
                                    >
                                        Register
                                    </button>
                                </p>
                            </Form>
                        </motion.div>
                    )}
                </AnimatePresence>
            )}
        </Formik>
    );
}

LoginForm.propTypes = {
    showRegister: PropTypes.bool.isRequired,
    setShowRegister: PropTypes.func.isRequired,
};

export default LoginForm;