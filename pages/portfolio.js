import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/portfolio.module.css';
import Bubble from '../components/bubble';

const projects = [
    {
        title: 'blorm',
        imageUrl: '/portfolio/blorm.gif',
        link: 'https://blorm.xyz/'
    },
    {
        title: 'giv3 (template)',
        imageUrl: '/portfolio/giv3.gif',
        link: 'https://giv3-wine.vercel.app/'
    },
    {
        title: 'lirn (mvp beta)',
        imageUrl: '/portfolio/lirn.gif',
        link: 'https://github.com/yu-jeffy/lirndapp'
    },
    {
        title: 'parallel polis',
        imageUrl: '/portfolio/parallelpolis.png',
        link: 'https://parallelpolis.llc/'
    }
    // Add more projects as needed
];

const Portfolio = () => {
    return (
        <div className={styles.container}>
            <div className={styles.backgroundContainer}>
                <div className={`${styles.backgroundShape} ${styles.shape1}`} />
                <div className={`${styles.backgroundShape} ${styles.shape2}`} />
                <div className={`${styles.backgroundShape} ${styles.shape3}`} />
                <div className={`${styles.backgroundShape} ${styles.shape4}`} />
            </div>
            <div className={styles.content}>
                <h1 className={styles.title}>Page Under Construction!</h1>
                <div className={styles.twoColumnLayout}>
                    {projects.map((project, index) => (
                        <Link key={index} href={project.link} className={styles.cell}>
                            <Image src={project.imageUrl} alt={project.title} width={300} height={200} />
                            <span className={styles.cellTitle}>{project.title}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Portfolio;
