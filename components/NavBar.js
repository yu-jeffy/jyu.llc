import Link from 'next/link';
import styles from '../styles/NavBar.module.css';

const NavBar = () => {
    return (
        <nav className={styles.nav}>
            <ul className={styles.navList}>
                <li className={styles.navItem}>
                    <Link href="/gallery" className={styles.navLink}>
                        gallery
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
