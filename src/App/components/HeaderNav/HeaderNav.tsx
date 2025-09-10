import { Link } from 'react-router';
import styles from './HeaderNav.module.scss';
import { routes } from 'config/routes.config';
import { useState } from 'react';

const menuItems = [
    { label: 'Recipes', route: routes.recipes.create() },
    { label: 'Meals Categories', route: routes.categories.create() },
    { label: 'Products', route: routes.products.create() },
    { label: 'Menu Items', route: routes.main.create() }, //TODO сделать роуты
    { label: 'Meal Planning', route: routes.main.create() }, //TODO сделать роуты
];

const HeaderNav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const showMenu = () => setIsMenuOpen(true);
    const closeMenu = () => setIsMenuOpen(false);
    return (
        <>
            <div className={styles.burger} >
                <button onClick={showMenu}>☰</button>
                {isMenuOpen &&
                    <div className={styles.mobileMenu} onClick={closeMenu}>
                        <ul>
                            {menuItems.map((item) => {
                                return (<li key={item.label}>
                                    <Link to={item.route} onClick={closeMenu}>
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
            <nav className={styles.headerNav}>
                <ul>
                    {menuItems.map((item) => {
                        return (<li>
                            <Link to={item.route}>
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