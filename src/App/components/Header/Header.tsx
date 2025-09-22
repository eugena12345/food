import HeaderNav from '../HeaderNav/HeaderNav';
import styles from './Header.module.scss';
import logo from '~assets/images/Group.svg';
import userSvg from '~assets/images/User.svg';
import heartSvg from '~assets/images/HeartIcon.svg';
import logoutImg from '~assets/images/logout.png';
import { useNavigate } from 'react-router';
import { routes } from '~config/routes.config';
import type { NavigateFunction } from './types';
import { authStore } from '~store/AuthStore';
import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';



const Header = observer(() => {
    const navigate = useNavigate();
    const isAuthenticated = authStore.isAuthenticated;


    const goToLogin: NavigateFunction = useCallback(() => {
        navigate(routes.login.create())
    }, [routes]);

    const goToFavorite: NavigateFunction = useCallback(() => {
        navigate(routes.favorite.create())
    }, [routes]);

    const goToCatalog: NavigateFunction = useCallback(() => {
        navigate(routes.main.create())
    }, [routes]);

    const logout = useCallback(() => authStore.logout(), [authStore]);

    return (
        <div className={styles.generalHeaderContainer}>
            <div className={styles.headerContainer}>
                <div className={styles.logoContent} onClick={goToCatalog}>
                    <img src={logo} alt='logo' className={styles.logo} />
                    <div className={styles.logoTitle}>Food Client</div>
                </div>
                <HeaderNav />
                <div className={styles.logoContent}>
                    {isAuthenticated
                        && <><img src={heartSvg} alt='heartSvg' className={styles.userInfo} onClick={goToFavorite} />
                            <div>{localStorage.getItem('username')}</div>
                            <img src={logoutImg} alt='logout' className={styles.logout} onClick={logout} />
                        </>
                    }
                    {!isAuthenticated
                        && <img src={userSvg} alt='userSvg' className={styles.userInfo} onClick={goToLogin} />
                    }
                </div>
            </div>
        </div>
    )
});

export default Header;