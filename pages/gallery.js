import React, { useState, useEffect } from 'react';
import styles from '../styles/gallery.module.css';
import Image from 'next/image';
import galleryData from '../public/galleryData.json'; // Assuming the json file is inside your project

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
                <Image key={index} className={styles.gridArt} src={item.fileLocation} width={150} height={250} alt={item.title}/>
            ))}
        </div>
    );

    const renderList = () => (
        <div className={styles.listContainer}>
            {artItems.map((item, index) => (
                <div key={index} className={styles.listItem}>
                    <Image src={item.fileLocation} width={150} height={250} alt={item.title}/>
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
                <button onClick={toggleView} className={styles.viewToggleButton}>
                    {view === 'grid' ? '\u2630' : '\u1392\u1392\u1392'}
                </button>
            </div>
            <div>
                {renderGalleryItems()}
            </div>
        </div>
    );
}

export default Gallery;