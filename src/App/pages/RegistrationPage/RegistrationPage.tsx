import { useFormik } from 'formik';
import styles from './RegistrationPage.module.scss';
import { useNavigate } from 'react-router';
import { routes } from 'config/routes.config';
import { useState } from 'react';
import axios from 'axios';
import Button from 'components/Button';

const RegistrationPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);


    const registration = async ({ username, email, password }) => {
        try {
            setIsLoading(true);
            const response = await axios.post(
                'https://front-school-strapi.ktsdev.ru/api/auth/local/register',
                {
                    username,
                    email,
                    password,
                }
            );
            setIsLoading(false);
            // TODO setError(null);
            localStorage.setItem('username', response.data.user.username);
            localStorage.setItem('JWT', response.data.jwt);
            navigate(routes.favorite.create());


        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
            setIsLoading(false);
            // TODO setError('Не удалось загрузить данные. Попробуйте позже.');
        }

    };





    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
        },
        onSubmit: (values) => {
            registration(values);
        },
    });
    return (
        <div className={styles.container}>
            <div className={styles['container--withMax']}>
                <form className={styles.authForm} onSubmit={formik.handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input className={styles.element}
                        id="username"
                        name="username"
                        type="username"
                        placeholder='type username'
                        onChange={formik.handleChange}
                        value={formik.values.username}
                    />
                    <label htmlFor="email">Email Address</label>
                    <input className={styles.element}
                        id="email"
                        name="email"
                        type="email"
                        placeholder='type email'
                        onChange={formik.handleChange}
                        value={formik.values.email}
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
                    {/* TODO добавить дизейбл кнопки при отправке запроса на сервер */}
                    <Button type="submit">Submit</Button>
                </form>


            </div>

        </div>
    )
}

export default RegistrationPage;