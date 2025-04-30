"use client";
import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './login.module.scss';
import  {jwtDecode} from 'jwt-decode';



export default function LoginForm() {
    const initialValues = {
        email: '',
        password: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Required'),
        password: Yup.string().required('Required'),
    });
    const onSubmit = async (values: any, { setSubmitting }: any) => {
        try {
            const response = await fetch('http://localhost:4000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    
                },
                body: JSON.stringify({
                    email: values.email,
                    password: values.password,
                }),
                
            });
    
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token); 


            const decodedToken:any= jwtDecode(data.token);
            const role = decodedToken.role; // Extract the role from the token
            console.log('User Role:', role);

            // Store the role in localStorage
            localStorage.setItem('role', role);
                
                
                alert('Login successful');
                await fetchProfile(); 
            } else {
                const error = await response.json();
                alert(error.message || 'Invalid credentials');
            }
        } catch (err) {
            console.error('Error:', err);
            alert('Failed to connect to the server');
        } finally {
            setSubmitting(false);
        }
    };
    const fetchProfile = async () => {
        const token = localStorage.getItem('token'); 
    
        if (!token) {
            alert('You are not logged in');
            return;
        }
    
        try {
            const response = await fetch('http://localhost:4000/auth/profile', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.ok) {
                const data = await response.json();
                window.location.href = `/dashboard`;
                console.log('User Profile:', data);
            } else {
                const error = await response.json();
                alert(error.message || 'Failed to fetch profile');
            }
        } catch (err) {
            console.error('Error:', err);
            alert('Failed to connect to the server');
        }
    };
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {formik => (
                <form onSubmit={formik.handleSubmit} className={styles['form-container']} >
                    <div>
                        <label htmlFor="email">Email</label>
                        <Field type="email" name="email" id="email" className={styles.input} data-cy="login-email"/>
                        <ErrorMessage name="email" component="div" className={styles['error-message']}/>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <Field type="password" name="password" id="password" className={styles.input} data-cy="login-password"/>
                        <ErrorMessage name="password" component="div" className={styles['error-message']}/>
                    </div>
                    
                    <button type="submit" disabled={formik.isSubmitting} data-cy="login-submit">
                        {formik.isSubmitting ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            )}
        </Formik>
    );
}

function decode(token: any): any {
    throw new Error('Function not implemented.');
}
