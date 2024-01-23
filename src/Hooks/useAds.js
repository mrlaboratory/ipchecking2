import { useState, useEffect } from 'react';

const useAds = () => {
    const [adsData, setAdsData] = useState(null); 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_SERVER}/ads/live`);
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await res.json();
                console.log(data);
                setAdsData(data); 
            } catch (error) {
                console.error('Error fetching ad data:', error);
            }
        };

        fetchData(); 
    }, []); 
    return adsData; 
};

export default useAds;
