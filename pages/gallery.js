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
                    <Image src="/path/to/image1.jpg" width={300} height={200} />
                    <Image src="/path/to/image2.jpg" width={300} height={200} />
                    <Image src="/path/to/image3.jpg" width={300} height={200} />
                    <Image src="/path/to/image1.jpg" width={300} height={200} />
                    <Image src="/path/to/image2.jpg" width={300} height={200} />
                    <Image src="/path/to/image3.jpg" width={300} height={200} />
                    <Image src="/path/to/image1.jpg" width={300} height={200} />
                    <Image src="/path/to/image2.jpg" width={300} height={200} />
                    <Image src="/path/to/image3.jpg" width={300} height={200} />
                    <Image src="/path/to/image1.jpg" width={300} height={200} />
                    <Image src="/path/to/image2.jpg" width={300} height={200} />
                    <Image src="/path/to/image3.jpg" width={300} height={200} />
                </div>
            );
        } else {
            return (
                <div className={styles.listContainer}>
                    {/* Add your list view content here */}
                    <div className={styles.listItem}>
                        <Image src="/path/to/image1.jpg" width={100} height={100} />
                        <div className={styles.itemDetails}>
                            <h3>Art Piece 1</h3>
                            <p>Description of art piece 1</p>
                        </div>
                    </div>
                    <div className={styles.listItem}>
                        <Image src="/path/to/image2.jpg" width={100} height={100} />
                        <div className={styles.itemDetails}>
                            <h3>Art Piece 2</h3>
                            <p>Description of art piece 2</p>
                        </div>
                    </div>
                    <div className={styles.listItem}>
                        <Image src="/path/to/image3.jpg" width={100} height={100} />
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
        <div>
            <button onClick={toggleView}>Switch View</button>
            {renderGallery()}
        </div>
    );
}

export default Gallery;
