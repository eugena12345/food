import { useFormik } from 'formik';
import styles from './LoginPage.module.scss';
import { useNavigate } from 'react-router';
import { routes } from 'config/routes.config';
import axios from 'axios';
import { useState } from 'react';

const LoginPage = () => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);


    const login = async ({ identifier, password }) => {
        try {
            setIsLoading(true);
            const response = await axios.post(
                'https://front-school-strapi.ktsdev.ru/api/auth/local',
                {
                    identifier,
                    password,
                }
            );

            //console.log(response.data)
            setIsLoading(false);
            //setError(null);
            localStorage.setItem('username', identifier);
            localStorage.setItem('JWT', response.data.jwt);
            navigate(routes.favorite.create());


        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
            setIsLoading(false);
            //setError('Не удалось загрузить данные. Попробуйте позже.');
        }

    };

    const formik = useFormik({
        initialValues: {
            identifier: "",
            password: "",
        },
        onSubmit: (values) => {
            login(values);
        },
    });
    return (
        <div className={styles.container}>
            <div className={styles['container--withMax']}>
                <form className={styles.form} onSubmit={formik.handleSubmit}>
                    <label htmlFor="identifier">Username</label>
                    <input className={styles.element}
                        id="identifier"
                        name="identifier"
                        type="identifier"
                        placeholder='type username'
                        onChange={formik.handleChange}
                        value={formik.values.identifier}
                    />
                    <label htmlFor="password">Password</label>
                    <input className={styles.element}
                        id="password"
                        name="password"
                        type="password"
                        placeholder='type password'

                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />

                    <button type="submit">Submit</button>
                </form>


            </div>

        </div>
    )
}

export default LoginPage;