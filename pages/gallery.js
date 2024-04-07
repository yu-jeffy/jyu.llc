import React, { useState, useEffect } from 'react';
import styles from '../styles/gallery.module.css';
import Image from 'next/image';
import galleryData from '../public/galleryData.json';

function Gallery() {
    const [view, setView] = useState('grid');
    const [activeTab, setActiveTab] = useState(galleryData[0].type);
    const [artItems, setArtItems] = useState([]);
    const [popupItem, setPopupItem] = useState(null);

    useEffect(() => {
        const activeArt = galleryData.find(art => art.type === activeTab);
        setArtItems(activeArt ? activeArt.items : []);
    }, [activeTab]);

    const toggleView = () => {
        setView(view === 'grid' ? 'list' : 'grid');
    };

    const openPopup = (item) => {
        setPopupItem(item); // Set the item to be displayed in the popup
    };

    const closePopup = () => {
        setPopupItem(null); // Reset the popup item to close the popup
    }

    const renderGalleryItems = () => {
        return view === 'grid' ? renderGrid() : renderList();
    };

    const renderGrid = () => (
        <div className={styles.gridContainer}>
            {artItems.map((item, index) => (
                item.fileLocation && item.fileLocation.endsWith('.mp4') ? (
                    <video key={index} className={styles.gridArt} autoPlay loop muted playsInline preload="auto" onClick={() => openPopup(item)}>
                        <source src={item.fileLocation} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                ) : (
                    <Image key={index} className={styles.gridArt} src={item.fileLocation} width={50} height={50} alt={item.title} unoptimized onClick={() => openPopup(item)} />
                )
            ))}
        </div>
    );

    const renderList = () => (
        <div className={styles.listContainer}>
            {artItems.map((item, index) => (
                <div key={index} className={styles.listItem}>
                    {item.fileLocation && item.fileLocation.endsWith('.mp4') ? (
                        <video className={styles.listArt} width="320" height="240" controls onClick={() => openPopup(item)}>
                            <source src={item.fileLocation} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    ) : (
                        <Image className={styles.listArt} src={item.fileLocation} width={150} height={250} alt={item.title} unoptimized onClick={() => openPopup(item)} />
                    )}
                    <div className={styles.itemDetails}>
                        <h2>{item.title}</h2>
                        <h3>{item.artist}</h3>
                        <p>{item.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className={styles.container}>
            <span className={styles.mobileWarning}>Site Optimized for Desktop</span>
            <div className={styles.starContainer}>
                <div className={styles.stars}></div>
                <div className={styles.stars2}></div>
                <div className={styles.stars3}></div>
            </div>
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
            {popupItem && (
                <div className={styles.popupContainer} onClick={closePopup}> {/* Close popup when clicked outside */}
                    <div className={styles.popupContent} > {/* onClick={e => e.stopPropagation()} Prevent click inside popup from closing it */}
                        {popupItem.fileLocation.endsWith('.mp4') ? (
                            <div className={styles.popupArtContainer}>
                                <video className={styles.popupArt} controls>
                                    <source src={popupItem.fileLocation} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        ) : (
                            <div className={styles.popupArtContainer}>
                                <Image className={styles.popupArt} src={popupItem.fileLocation} width={50} height={50} alt={popupItem.title} unoptimized />
                            </div>
                        )}

                        <div className={styles.popupDetails}>
                            <h2>{popupItem.title}</h2>
                            <h3>{popupItem.artist}</h3>
                            <p>{popupItem.description}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Gallery;