import HeaderNav from '../HeaderNav/HeaderNav';
import styles from './Header.module.scss';


const Header = () => {
    return (
        <div className={styles.headerContainer}>
            <div>Logo</div>
            <div>Food Client</div>
            <HeaderNav/>
            <div>
                <div>сердечко</div>
                <div>человечек</div>
            </div>
        </div>
    )
};

export default Header;