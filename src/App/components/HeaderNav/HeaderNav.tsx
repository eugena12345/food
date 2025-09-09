//import { Link } from 'react-router';
import styles from './HeaderNav.module.scss';
//import { routes } from 'config/routes.config';
import { useState } from 'react';

const menuItems = [
    { label: 'Recipes', },//route: routes.recipes.create()
    { label: 'Meals Categories', },
    { label: 'Products', },
    { label: 'Menu Items', },
    { label: 'Meal Planning', },
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
                        {/* <ul>
                            <li><Link to={routes.main.create()} onClick={closeMenu} >Products</Link></li>
                            <li><Link to={routes.categories.create()} onClick={closeMenu}>Categories</Link></li>
                            <li><Link to={routes.about.create()} onClick={closeMenu}>About us</Link></li>
                        </ul> */}
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
                            {/* <Link to={item.route}> */}
                            {/* TODO убрать тег а */}
                            <a>{item.label}</a>
                            {/* </Link> */}
                        </li>)
                    })}
                    {/* <li><Link to={routes.main.create()}>Products</Link></li>
                    <li><Link to={routes.categories.create()}>Categories</Link></li>
                    <li><Link to={routes.about.create()}>About us</Link></li> */}
                </ul>
            </nav>
        </>
    )
}

export default HeaderNav;