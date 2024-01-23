import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';



const Ipcheck = () => {
  const [userIp, setUserIp] = useState(null);
  const [duration, setDuration] = useState(0);
  const[time,setTime] = useState(0)
  const [password, setPassword] = useState('');
  const [html, setHtml] = useState('');
  const navigate = useNavigate()


    const fetchUserIp = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        const ipAddress = data.ip;
        setUserIp(ipAddress);
        await sendIpToServer(ipAddress);
      } catch (error) {
        console.error('Error fetching user IP:', error);
      }
    };



  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER}/settings`);
        if (response.ok) {
          const data = await response.json();
          setDuration(data?.duration || 0);
          setTime(data?.duration || 0);
          console.log(data?.duration);
          setHtml(data.html || '');
          fetchUserIp()
        } else {
          console.error('Failed to fetch settings:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };

    fetchSettings();
  }, []);


  const sendIpToServer = async (ip) => {
    try {

      const serverEndpoint = import.meta.env.VITE_SERVER;
      console.log(time);
      const serverResponse = await fetch(`${serverEndpoint}/ipcheck`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ip: '162.282.92.69', duration: duration, country: '' }),
      });
      const serverData = await serverResponse.json();
      console.log(serverData);
      if (serverData && !serverData?.allow) {
        toast.success("Ip blocked!");
        navigate('/ipblocked')
      }
      console.log('Server Response:', serverData);
    } catch (error) {
      console.error('Error sending IP to server:', error);
    }
  };

  return (
    <div>
      <div className='p-5 m-10 rounded-lg bg-white'>

        <div dangerouslySetInnerHTML={{ __html: html }}></div>

      </div>
    </div>
  );
};

export default Ipcheck;
