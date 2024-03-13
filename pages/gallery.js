import React, { useState } from 'react';
import styles from '../styles/gallery.module.css';
import Image from 'next/image';

function Gallery() {
    const [view, setView] = useState('grid');

    const toggleView = () => {
        setView(view === 'grid' ? 'list' : 'grid');
    };

    const renderGallery = () => {
        if (view === 'grid') {
            return (
                <div className={styles.gridContainer}>
                    <Image className = {styles.gridArt} src="/art/plastic.jpg" width={150} height={250} />
                    <Image className = {styles.gridArt} src="/art/plastic.jpg" width={150} height={250} />
                    <Image className = {styles.gridArt} src="/art/plastic.jpg" width={150} height={250} />
                    <Image className = {styles.gridArt} src="/art/plastic.jpg" width={150} height={250} />
                    <Image className = {styles.gridArt} src="/art/plastic.jpg" width={150} height={250} />
                    <Image className = {styles.gridArt} src="/art/plastic.jpg" width={150} height={250} />
                    <Image className = {styles.gridArt} src="/art/plastic.jpg" width={150} height={250} />
                    <Image className = {styles.gridArt} src="/art/plastic.jpg" width={150} height={250} />
                    
                </div>
            );
        } else {
            return (
                    <div className={styles.listContainer}>
                        {/* Add your list view content here */}
                        <div className={styles.listItem}>
                            <Image src="/art/plastic.jpg" width={150} height={250} />
                            <div className={styles.itemDetails}>
                                <h3>Art Piece 1</h3>
                                <p>Description of art piece 1</p>
                            </div>
                        </div>
                        <div className={styles.listItem}>
                            <Image src="/art/plastic.jpg" width={150} height={250} />
                            <div className={styles.itemDetails}>
                                <h3>Art Piece 2</h3>
                                <p>Description of art piece 2</p>
                            </div>
                        </div>
                        <div className={styles.listItem}>
                            <Image src="/art/plastic.jpg" width={150} height={250} />
                            <div className={styles.itemDetails}>
                                <h3>Art Piece 3</h3>
                                <p>Description of art piece 3</p>
                            </div>
                        </div>
                    </div>
            );
        }
    };

    return (
        <div className={styles.container}>
            <div>
                <button onClick={toggleView} style={{ fontFamily: 'Arial', fontSize: '3rem' }}>
                    {view === 'grid' ? '\u2630' : '\u1392\u1392\u1392'}
                </button>
            </div>
            <div>
                {renderGallery()}
            </div>
        </div>
    );
}

export default Gallery;
