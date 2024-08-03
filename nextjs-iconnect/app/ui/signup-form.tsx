'use client';

import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  KeyIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { redirect } from 'next/navigation';
import { Response } from '../lib/definitions';
import Link from 'next/link';
import { useRouter } from 'next/router';

const SignUpForm = () => {
  const [formData, setFormData] = useState({name: '', username: '', password: ''});
  const [pwdConfirm, setPwdConfirm] = useState('');
  const [pwdError, setPwdError] = useState(false);
  const [response, setResponse] = useState<Response>({success: false, data: null});
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setResponse({success: false, data: null});
    event.preventDefault();
    await axios.post(`/api/signup`, formData)
      .then(({ data }) => {
        setResponse({success: true, data });
        router.push('/login');
      }).catch(({ response: { data } }) => {
        setResponse({success: false, data });
      })
  }

  useEffect(() => {
    if (formData.password !== pwdConfirm) {
      setPwdError(true);
    } else {
      setPwdError(false);
    }
  }, [pwdConfirm]);

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex-1 rounded-lg shadow-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Please Enter your details.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="username"
            >
              Name
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="name"
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="username"
            >
              Username
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="username"
                type="text"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="confirm-password"
                type="password"
                placeholder="Confirm password"
                value={pwdConfirm}
                onChange={(e) => setPwdConfirm(e.target.value)}
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <Button className="mt-4 w-full">
          Sign up <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        <div className="flex h-8 items-end space-x-1">
          {pwdError && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">Password not matching!</p>
            </>
          )}

          {response.data && (
            response.success ? (
              <>
                <CheckCircleIcon className="h-5 w-5 text-green-500" />
                <p className="text-sm text-green-500">{response.data.message}</p>
              </>
            ) : (
              <>
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                <p className="text-sm text-red-500">{response.data.message}</p>
              </>
            )
          )}
        </div>
        <p className='text-sm text-gray-500'>Have an account already ? Click to
            <Link
                href="/login"
                className="text-sm font-medium text-teal-600 cursor-pointer"
            > login</Link>.
        </p>
      </div>
    </form>
  );
}

export default SignUpForm;