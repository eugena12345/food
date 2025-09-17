import HeaderNav from '../HeaderNav/HeaderNav';
import styles from './Header.module.scss';
import logo from 'assets/images/Group.svg';
import userSvg from 'assets/images/User.svg'
import heartSvg from 'assets/images/HeartIcon.svg'
import { useNavigate } from 'react-router';
import { routes } from 'config/routes.config';
import type { NavigateFunction } from './types';


const Header = () => {
    const navigate = useNavigate()
    const goToLogin: NavigateFunction = () => {
        navigate(routes.login.create())
    }

    const goToFavorite: NavigateFunction = () => {
        navigate(routes.favorite.create())
    }

    const goToCatalog: NavigateFunction = () => {
        navigate(routes.main.create())

    }

    return (
        <div className={styles.generalHeaderContainer}>
            <div className={styles.headerContainer}>
                <div className={styles.logoContent} onClick={goToCatalog}>
                    <img src={logo} alt='logo' className={styles.logo} />
                    <div className={styles.logoTitle}>Food Client</div>
                </div>
                <HeaderNav />
                <div className={styles.logoContent}>
                    <img src={heartSvg} alt='heartSvg' className={styles.userInfo} onClick={goToFavorite} />
                    <img src={userSvg} alt='userSvg' className={styles.userInfo} onClick={goToLogin} />
                </div>
            </div>
        </div>
    )
};

export default Header;