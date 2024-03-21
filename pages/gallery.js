import React, { useState, useEffect } from 'react';
import styles from '../styles/gallery.module.css';
import Image from 'next/image';
import galleryData from '../public/galleryData.json';

function Gallery() {
    const [view, setView] = useState('grid');
    const [activeTab, setActiveTab] = useState(galleryData[0].type);
    const [artItems, setArtItems] = useState([]);

    useEffect(() => {
        const activeArt = galleryData.find(art => art.type === activeTab);
        setArtItems(activeArt ? activeArt.items : []);
    }, [activeTab]);

    const toggleView = () => {
        setView(view === 'grid' ? 'list' : 'grid');
    };

    const renderGalleryItems = () => {
        return view === 'grid' ? renderGrid() : renderList();
    };

    const renderGrid = () => (
        <div className={styles.gridContainer}>
            {artItems.map((item, index) => (
                item.fileLocation.endsWith('.mp4') ? (
                    <video key={index} className={styles.gridArt} autoPlay loop muted playsInline preload="auto">
                        <source src={item.fileLocation} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                ) : (
                    <Image key={index} className={styles.gridArt} src={item.fileLocation} width={50} height={50} alt={item.title} unoptimized />
                )
            ))}
        </div>
    );

    const renderList = () => (
        <div className={styles.listContainer}>
            {artItems.map((item, index) => (
                <div key={index} className={styles.listItem}>
                    {item.fileLocation.endsWith('.mp4') ? (
                        <video className={styles.listArt} width="320" height="240" controls>
                            <source src={item.fileLocation} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    ) : (
                        <Image src={item.fileLocation} width={150} height={250} alt={item.title} />
                    )}
                    <div className={styles.itemDetails}>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className={styles.container}>
            <div className={styles.tabs}>
                {galleryData.map((tab, index) => (
                    <button
                        key={index}
                        className={`${styles.tabItem} ${activeTab === tab.type ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab(tab.type)}>
                        {tab.type}
                    </button>
                ))}
                <div className={styles.toggleButtonContainer}>
                    <button onClick={toggleView} className={styles.viewToggleButton}>
                        {view === 'grid' ? '\u2630' : '\u1392\u1392\u1392'}
                    </button>
                </div>
            </div>
            <div>
                {renderGalleryItems()}
            </div>
        </div>
    );
}

export default Gallery;