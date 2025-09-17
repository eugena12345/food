import { Link } from 'react-router';
import styles from './HeaderNav.module.scss';
import { routes } from 'config/routes.config';
import { useState } from 'react';
import { stack as Menu } from 'react-burger-menu';

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

    const handleStateChange = (state: { isOpen: boolean }) => {
        setIsMenuOpen(state.isOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };
    return (
        <div>
            <Menu
                isOpen={isMenuOpen}
                onStateChange={handleStateChange}
                width={'45%'}
                right={false}
                customBurgerIcon={<button className={styles.burger}>☰</button>}
                customCrossIcon={<button className={styles.close}>×</button>}
                styles={{
                    bmBurgerButton: {
                        position: 'relative',
                        with: '25px',
                        heigth: '25px',
                    },
                    bmOverlay: {
                        top: '-16px',
                        //TODO посмотреть как сделать типа такого в топ `${vars.$spaceM}`
                        background: 'rgb(241 213 185 / 89%)',
                    },
                    bmMenuWrap: {
                        height: 'auto',
                    },
                    bmMenu: {
                        height: 'auto',
                    },
                }}
            >
                <ul className={styles.navList}>
                    {menuItems.map((item) => (
                        <li className={styles.navItem} key={item.label}>
                            <Link
                                to={item.route}
                                className={styles.navLink}
                                onClick={closeMenu}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </Menu>

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
        </div>
    )
}

export default HeaderNav;