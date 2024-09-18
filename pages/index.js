import styles from '../styles/index.module.css';
import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NavBar from '../components/NavBar';

const Home = () => {
    useEffect(() => {
        const reveal = () => {
            const reveals = document.querySelectorAll(".reveal");

            for (let i = 0; i < reveals.length; i++) {
                const windowHeight = window.innerHeight;
                const elementTop = reveals[i].getBoundingClientRect().top;
                const elementVisible = 150;

                if (elementTop < windowHeight - elementVisible) {
                    reveals[i].classList.add("active");
                } else {
                    reveals[i].classList.remove("active");
                }
            }
        };

        window.addEventListener("scroll", reveal);
        // Cleanup on unmount
        return () => window.removeEventListener("scroll", reveal);
    }, []);

    return (
        <div className={styles.container}>
            <NavBar />
            <div className={styles.starContainer}>
                <div className={styles.stars}></div>
                <div className={styles.stars2}></div>
                <div className={styles.stars3}></div>
            </div>
            <div className={styles.content}>
                <section className={styles.homeSection}>
                    <div className={styles.name}><span className={styles.nameText}>jeffy yu</span></div>
                </section>
                <section className={styles.homeSection}>
                    <div className={styles.occupation}>
                        <span className={styles.occupationText}>full stack eng, ml research, web3, art</span>
                    </div>

                    <div className={styles.links}>
                        <Link href="https://github.com/yu-jeffy/">
                            <Image
                                className={styles.icon}
                                src="/logos/github.png"
                                width={50}
                                height={50}
                                alt="foundation"
                            />
                        </Link>
                        <Link href="https://www.linkedin.com/in/jeffyyu/">
                            <Image
                                className={styles.icon}
                                src="/logos/linkedin.png"
                                width={50}
                                height={50}
                                alt="linkedin"
                            />
                        </Link>
                        <Link href="https://mirror.xyz/jyu.eth">
                            <Image
                                className={styles.icon}
                                src="/logos/mirrorxyz.png"
                                width={50}
                                height={50}
                                alt="mirror"
                            />
                        </Link>
                        <Link href="https://parallelpolis.llc">
                            <Image
                                className={styles.icon}
                                src="/logos/parallelpolis.png"
                                width={50}
                                height={50}
                                alt="parallelpolis"
                            />
                        </Link>
                        <Link href="https://twitter.com/jyu_eth">
                            <Image
                                className={styles.icon}
                                src="/logos/x.png"
                                width={50}
                                height={50}
                                alt="x"
                            />
                        </Link>
                        <Link href="https://foundation.app/@jeffy">
                            <Image
                                className={styles.icon}
                                src="/logos/foundation.png"
                                width={50}
                                height={50}
                                alt="foundation"
                            />
                        </Link>
                        <Link href="https://soundcloud.com/korinayu">
                            <Image
                                className={styles.icon}
                                src="/logos/soundcloud.png"
                                width={50}
                                height={50}
                                alt="soundcloud"
                            />
                        </Link>
                    </div>

                    <div className={styles.about}>
                        <span className={styles.aboutText}>0x0c778e66efa266b5011c552C4A7BDA63Ad24C37B</span>
                        <span className={styles.aboutText}>+1 (480) 370 7055 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; jeff.yu@parallelpolis.llc</span>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Home;
