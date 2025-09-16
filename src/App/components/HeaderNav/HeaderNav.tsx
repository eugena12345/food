import { Link } from 'react-router';
import styles from './HeaderNav.module.scss';
import { routes } from 'config/routes.config';
import { useState } from 'react';

interface MenuItem {
    label: string;
    route: string;
}
const menuItems: MenuItem[] = [
    { label: 'Recipes', route: routes.recipes.create() },
    { label: 'Meals Categories', route: routes.categories.create() },
    { label: 'Products', route: routes.products.create() },
    { label: 'Menu Items', route: routes.main.create() }, //TODO сделать роуты
    { label: 'Meal Planning', route: routes.main.create() }, //TODO сделать роуты
];

const HeaderNav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const showMenu = () => setIsMenuOpen(true);
    const closeMenu = () => setIsMenuOpen(false);
    return (
        <>
            <div className={styles.burger} >
                <button onClick={showMenu}>☰</button>
                {isMenuOpen &&
                    <div className={styles.mobileMenu} onClick={closeMenu}>
                        <ul className={styles.navList}>
                            {menuItems.map((item) => {
                                return (<li className={styles.navItem} key={item.label}>
                                    <Link to={item.route} className={styles.navLink} onClick={closeMenu}>
                                        {item.label}
                                    </Link>
                                </li>)
                            })}
                        </ul>
                        <button onClick={closeMenu} className={styles.close}>
                            ×
                        </button>
                    </div>
                }

            </div>
            <nav className={styles.navMenu}>
                <ul className={styles.navList}>
                    {menuItems.map((item) => {
                        return (<li className={styles.navItem} key={item.label}>
                            <Link className={styles.navLink} to={item.route}>
                                {item.label}
                            </Link>
                        </li>)
                    })}
                </ul>
            </nav>
        </>
    )
}

export default HeaderNav;