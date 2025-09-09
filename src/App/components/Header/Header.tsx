import HeaderNav from '../HeaderNav/HeaderNav';
import styles from './Header.module.scss';
import logo from 'assets/images/Group.svg';
import userSvg from 'assets/images/User.svg'
import heartSvg from 'assets/images/HeartIcon.svg'


const Header = () => {
    const goToLogin = () => {
        //TODO переадресация на страницу авторизации
    }

    const goToFavorite = () => {
        //TODO переадресация на страницу любимых блюд
    }

    return (
        <div className={styles.headerContainer}>
            <div className={styles.logoContent}>
                <img src={logo} alt='logo' className={styles.logo} />
                <div>Food Client</div>
            </div>
            <HeaderNav />
            <div>
                <img src={heartSvg} alt='heartSvg' className={styles.userInfo} onClick={goToFavorite} />
                <img src={userSvg} alt='userSvg' className={styles.userInfo} onClick={goToLogin} />
            </div>
        </div>
    )
};

export default Header;