import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../styles/wheredowegonow.module.css';

const WhereDoWeGoNow = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('/wheredowegonow/data.json')
            .then(response => response.json())
            .then(data => setData(data));
    }, []);

    return (
        <div className={styles.container}>
            <div>
                <h1 className={styles.title}>where do we go now?</h1>
            </div>
            {data.map((item, index) => (
                <div key={index} className={styles.exampleDiv}>
                    <div className={styles.left}>
                        <Image className={styles.art} src={item.image} alt={item.title} width={500} height={300} />
                    </div>
                    <div className={styles.right}>
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>
                        <p>{item.artists}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default WhereDoWeGoNow;