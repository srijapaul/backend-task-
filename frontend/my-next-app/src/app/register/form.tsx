"use client"
import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './form.module.scss';

export default function RegisterForm() {
    const initialValues = {
        email: '',
        password: '',
        confirmPassword: '',
        role: ''
    };

    const validationsSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
            .required('Required'),
        role:Yup.string().oneOf(['admin', 'user'], 'Invalid role').required('Required')    
        
    });

    const onSubmit = async (values: any, { setSubmitting, resetForm }: any) => {
        console.log("Form details", values);

        try {
            const response = await fetch('http://127.0.0.1:4000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: values.email,
                    password: values.password,
                    role: values.role,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                alert(data.message || 'Registration successful!');
                resetForm(); // Reset the form after successful submission
                window.location.href = `/login?email=${encodeURIComponent(values.email)}`;
            } else {
                const error = await response.json();
                alert(error.message || 'Something went wrong');
            }
        } catch (err) {
            console.error('Error:', err);
            alert('Failed to connect to the server');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationsSchema}
            onSubmit={onSubmit}
        >
            {formik => (
                <form onSubmit={formik.handleSubmit}>
                    <div className={styles['reg-form-container']}>
                        <div>
                            <label htmlFor="email">Email</label>
                            <Field
                                type="text"
                                name="email"
                                id="email"
                                placeholder="Enter your email"
                                className={styles['input-field']}
                                data-cy="register-email"
                            />
                            <ErrorMessage
                                name="email"
                                component="div"
                                className={styles['error-message']}
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <Field
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Enter your password"
                                className={styles['input-field']}
                                data-cy="register-password"
                            />
                            <ErrorMessage
                                name="password"
                                component="div"
                                className={styles['error-message']}
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <Field
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                placeholder="Confirm your password"
                                className={styles['input-field']}
                                data-cy="register-confirm"
                            />
                            <ErrorMessage
                                name="confirmPassword"
                                component="div"
                                className={styles['error-message']}
                            />
                            <Field
                            as="select"
                            name="role"
                            id="role"
                            placeholder="Enter your role"
                            className={styles['input-field']}
                            data-cy="register-role"
                            >   <option value="">Select your role</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </Field>
                            <ErrorMessage
                                name="role"
                                component="div"
                                className={styles['error-message']}
                            />
                            
                            <button
                        type="submit"
                        className={styles['submit-button']}
                        disabled={formik.isSubmitting}
                        data-cy="register-submit"
                    >
                        {formik.isSubmitting ? 'Submitting...' : 'Register'}
                    </button>
                        </div>
                    </div>
                    
                </form>
            )}
        </Formik>
    );
}