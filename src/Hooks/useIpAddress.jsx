import { useState, useEffect } from 'react';
import axios from 'axios';
const useIpAddress = () => {
  const [ip, setIp] = useState(null);
  useEffect(() => {
    const fetchIp = async () => {
      try {
        const response = await axios.get('https://api.ipify.org?format=json');
        setIp(response.data.ip);
      } catch (error) {
        console.error('Error fetching IP:', error.message);
      }
    };

    fetchIp();
  }, []);

  return ip;
};

export default useIpAddress;
