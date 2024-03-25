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
                        <Link href="/" className={router.pathname !== '/' ? styles.navLinkWhite : styles.navLink}>
                            home
                        </Link>
                    </li>
                )}
                {/*
                {router.pathname !== '/portfolio' && (
                    <li className={styles.navItem}>
                        <Link href="/portfolio" className={styles.navLink}>
                            technical portfolio
                        </Link>
                    </li>
                )}
                */}
                {router.pathname !== '/gallery' && (
                    <li className={styles.navItem}>
                        <Link href="/gallery" className={styles.navLink}>
                            gallery (wip)
                        </Link>
                    </li>
                )}
                
            </ul>
        </nav>
    );
};

export default NavBar;
