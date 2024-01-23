import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';


const Iplist = () => {
    const [ipList, setIpList] = useState([]);
    const [password, setPassword] = useState('');
    const [count, setCount] = useState(0)
    const [loader,setLoader] = useState(false)
    const handleInputChange = (event) => {
        setPassword(event.target.value);
    };

    useEffect(() => {
        // Fetch IP data from the server when the component mounts
        const fetchIpData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_SERVER}/getallip`); // Update the endpoint as needed
                const response2 = await fetch(`${import.meta.env.VITE_SERVER}/datacount`); // Update the endpoint as needed
                const data = await response.json();
                const data2 = await response2.json();
                setCount(data2?.count)
                console.log(data2);
                console.log(data);
                // Fetch country information for each IP
                const ipDataWithCountry = await Promise.all(
                    data.map(async (ipData) => {
                        const countryInfo = await fetchCountryInfo(ipData.ip);
                        return { ...ipData, country: countryInfo.country };
                    })
                );

                setIpList(ipDataWithCountry);
            } catch (error) {
                console.error('Error fetching IP data:', error);
            }
        };

        fetchIpData();
    }, []); // Empty dependency array ensures this effect runs only once when the component mounts
    const convertMillisecondsToHumanReadable = (milliseconds) => {
        if (!milliseconds) return '0s';
      
        const seconds = milliseconds / 1000;
        const minutes = seconds / 60;
        const hours = minutes / 60;
        const days = hours / 24;
        const weeks = days / 7;
      
        if (weeks >= 1) {
          return `${Math.floor(weeks)} week${Math.floor(weeks) > 1 ? 's' : ''}`;
        } else if (days >= 1) {
          return `${Math.floor(days)} day${Math.floor(days) > 1 ? 's' : ''}`;
        } else if (hours >= 1) {
          return `${Math.floor(hours)} hour${Math.floor(hours) > 1 ? 's' : ''}`;
        } else if (minutes >= 1) {
          return `${Math.floor(minutes)} minute${Math.floor(minutes) > 1 ? 's' : ''}`;
        } else {
          return `${Math.floor(seconds)} second${Math.floor(seconds) > 1 ? 's' : ''}`;
        }
      };

    const fetchCountryInfo = async (ip) => {
        try {
            const response = await fetch(`https://ipapi.co/${ip}/json/`);
            const data = await response.json();

            // Extract the country information from the response
            const country = data.country_name || 'Unknown';

            return { country };
        } catch (error) {
            console.error('Error fetching country information:', error);
            return { country: 'Unknown' }; // Default to 'Unknown' in case of an error
        }
    };


    const deleteAll = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER}/deleteallip`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    password,
                }),
            });

            if (response.ok) {
                toast.success('Deleted all data successfully');
                setIpList([]); // Clear the IP list after successful deletion
            } else {
                const errorData = await response.json();
                toast.error(`Failed to delete data: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error deleting data:', error);
            toast.error('Internal server error');
        }
    };


    const formatDate = (timestamp) => {
        const options = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        };
        const formattedDate = new Date(timestamp).toLocaleDateString('en-US', options);
        return formattedDate;
      };

    return (
        <div className='mt-10 mb-10'>
            <div className='p-5 m-10 rounded-lg bg-white'>
                <div className="overflow-x-auto">
                    <div className='grid grid-cols-2'>
                        <form >
                        <input defaultValue={password} onChange={handleInputChange}
                            type="text" name='Password' placeholder="password" className="input input-bordered w-full " />
                        </form>
                        <div className='text-xl font-bold flex justify-center items-center'>
                            Total Data : {count}
                        </div>


                    </div>
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>IP</th>
                                <th>Country</th>
                                <th>Date</th>
                                <th>Duration</th>

                            </tr>
                        </thead>
                        <tbody>
                            {ipList.map((ipData, index) => (
                                <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>{ipData.ip}</td>
                                    <td>{ipData.country}</td>
                                    <td>{formatDate(ipData.timestamp)}</td>
                                    <td>{convertMillisecondsToHumanReadable(ipData.duration)}</td>
                                    {/* Add your Action buttons or any additional columns here */}

                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button disabled={!password} onClick={deleteAll} className='btn btn-primary text-white w-full'>Delete All Data</button>
                </div>
            </div>
        </div>
    );
};

export default Iplist;
