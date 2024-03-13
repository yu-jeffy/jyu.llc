import Link from 'next/link';
import styles from '../styles/NavBar.module.css';
import { useRouter } from 'next/router';

const NavBar = () => {
    const router = useRouter();

    return (
        <nav className={styles.nav}>
            <ul className={styles.navList}>
                {router.pathname !== '/' && (
                    <li className={styles.navItem}>
                        <Link href="/" className={styles.navLink}>
                            home
                        </Link>
                    </li>
                )}
                <li className={styles.navItem}>
                    <Link href="/portfolio" className={styles.navLink}>
                        technical portfolio
                    </Link>
                    <Link href="/gallery" className={styles.navLink}>
                        gallery
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
