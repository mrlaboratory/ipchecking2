import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const Settings = () => {
    const [duration, setDuration] = useState('');
    const [selectedDuration, setSelectedDuration] = useState(''); // State to store the selected human-readable duration
    const [password, setPassword] = useState('');
    const [html, setHtml] = useState('');

    const fetchSettings = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER}/settings`);
            if (response.ok) {
                const data = await response.json();
                setDuration(data.duration || '');
                setHtml(data.html || '');
            } else {
                console.error('Failed to fetch settings:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error fetching settings:', error);
        }
    };

    useEffect(() => {
        fetchSettings();
    }, []); // Empty dependency array ensures this effect runs only once when the component mounts

    const settingSave = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER}/settings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    duration,
                    html,
                    password,
                }),
            });

            if (response.ok) {
                toast.success('Settings updated successfully');
                fetchSettings(); // Fetch updated settings after successful update
            } else {
                const errorData = await response.json();
                toast.error(`Failed to update settings: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error updating settings:', error);
            toast.error('Internal server error');
        }
    };

    // Function to handle the selection of human-readable duration
    const handleDurationChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedDuration(selectedValue);
        setDuration(selectedValue); // Set the actual duration in milliseconds
    };
    console.log(selectedDuration);
    return (
        <div className='mt-10 mb-10'>
            <div className='p-5 m-10 rounded-lg bg-white'>
                <h2 className='text-xl font-bold flex justify-center items-center'>Settings </h2>
                <form onSubmit={settingSave} className='w-full mx-w-[500px] mt-5'>
                    <input
                        name='Password'
                        type='text'
                        placeholder='Password'
                        className='input input-bordered w-full'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {/* Duration selection dropdown */}
                    <select
                        className='select select-bordered w-full mt-2'
                        value={duration}
                        onChange={handleDurationChange}
                    >
                        <option >
                            0 minute
                        </option>
                        <option value='60000'>1 minute</option>
                        <option value='3600000'>1 hour</option>
                        <option value='7200000'>2 hours</option>
                        <option value='18000000'>5 hours</option>
                        <option value='86400000'>1 day</option>
                        <option value='172800000'>2 days</option>
                        <option value='259200000'>3 days</option>
                        <option value='345600000'>4 days</option>
                        <option value='432000000'>5 days</option>
                        <option value='518400000'>6 days</option>
                        <option value='604800000'>7 days</option>
                        <option value='691200000'>8 days</option>
                        <option value='777600000'>9 days</option>
                        <option value='864000000'>10 days</option>
                    </select>

                    <textarea
                        className='mt-2 p-5 input input-bordered w-full h-[300px]'
                        placeholder='Page html'
                        name='html'
                        id=''
                        cols='30'
                        rows='10'
                        value={html}
                        onChange={(e) => setHtml(e.target.value)}
                    ></textarea>

                    <button disabled={!password} type='submit' className='btn btn-primary w-full text-white mt-5'>
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Settings;