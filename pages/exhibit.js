import { useState, useEffect } from 'react';
import styles from '../styles/exhibit.module.css';
import Image from 'next/image';

export default function Home() {
    const [galleryData, setGalleryData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [expandedFolders, setExpandedFolders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch('/galleryData.json')
            .then(response => response.json())
            .then(data => setGalleryData(data));
    }, []);

    const toggleFolder = (type) => { // New function
        setExpandedFolders(prevState => {
            if (prevState.includes(type)) {
                return prevState.filter(folderType => folderType !== type);
            } else {
                return [...prevState, type];
            }
        });
    }

    return (
        <div className={styles.container}>
            <div className={styles.fileExplorer}>
                {galleryData.map((folder) => (
                    <div key={folder.type} className={styles.folder}>
                        <h2 className={styles.folderTitle} onClick={() => toggleFolder(folder.type)}>{folder.type}</h2>
                        {expandedFolders.includes(folder.type) && folder.items.map((item) => (
                            <p
                                key={item.title}
                                className={`${styles.itemTitle} ${selectedItem === item ? styles.selectedItemInExplorer : ''}`}
                                onClick={() => setSelectedItem(item)}
                            >
                                {item.title || 'Untitled'}
                            </p>
                        ))}
                    </div>
                ))}
            </div>
            <div className={styles.mainContent}>
    {loading ? (
        <p>Loading...</p> // replace this with your loading animation
    ) : (
        selectedItem && (
            <div className={styles.selectedItem}>
                <h2 className={styles.selectedItemTitleInContent}>{selectedItem.title || 'Untitled'}</h2>
                <p className={styles.selectedItemDescription}>{selectedItem.description}</p>
                <p className={styles.selectedItemArtist}>{selectedItem.artist}</p>
                <Image
                    className={styles.selectedItemImage}
                    src={selectedItem.fileLocation}
                    alt={selectedItem.title}
                    width={500}
                    height={300}
                    onLoad={() => setLoading(false)}
                />
            </div>
        )
    )}
</div>
        </div>
    )
}
