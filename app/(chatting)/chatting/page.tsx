"use client"
import React from 'react';
import Image from 'next/image';
import { ThemeModeToggle } from '@/app/(chatting)/_components/themeModeToggle';
import { useState } from 'react';
import axios from 'axios';

const page = () => {
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { input_query: message };
    try {
      console.log(data);
      const response = await axios.post(
        'http://localhost:8000/chat',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response);
      setChatLog([...chatLog, { message: message, response: response.data }]);
      setMessage('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='pt-0 px-4'>
        <div className='flex justify-between p-8'>
                {/* logo */}
                <img
                    className='h-12 w-24 rounded-full'
                    src='/logo.png'
                    alt='logo'
                    content='cover'
                />

                <ThemeModeToggle />
            </div>
      <div className='flex flex-col items-center mt-8'>
        
        <Image
          className='h-30 w-30 rounded-full'
          src='/icon.png'
          alt='p'
          height={60}
          width={60}
          content='cover'
        />
        <p className='text-2xl text-pink-500 font-bold'>MiningNiti</p>
      </div>
      <div className='fixed bottom-0 h-16 w-full bg-transparent'>
        <form
          onSubmit={handleSubmit}
          className='flex items-center justify-between p-2 mx-auto w-full max-w-7xl'
        >
          <textarea
            id='chat'
            rows={1}
            className='flex-1 p-2.5 text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring focus:border-blue-500'
            placeholder='Your message...'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type='submit'
            className='p-2 ml-4 rounded-full bg-gray-600'
          >
            <svg
              className='w-5 h-5 text-blue-600 transform rotate-90'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 18 20'
              fill='currentColor'
            >
              <path d='m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z' />
            </svg>
          </button>
        </form>
      </div>
      <div className='my-4 flex flex-col items-center'>
        {chatLog.map((item, index) => (
          <div key={index} className='flex flex-col items-center'>
            <p className='text-left text-sm font-bold'>{item.message}</p>
            <p className='text-right text-sm mt-1'>{item.response}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
