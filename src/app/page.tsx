/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client';
import CryptoJS from 'crypto-js';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import React, {
  ChangeEvent,
  Fragment,
  KeyboardEvent,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import swal from 'sweetalert';
import * as Yup from 'yup';

import { emailSchema, passwordSchema } from '@/helper/ValidationHelper';
import Footer from '@/shared/layout-components/footer/footer';
import { Login } from '@/supabase/auth';
import Loader from '@/utils/Loader/Loader';

import { basePath } from '../../next.config';

const validationSchema = Yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
});

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [passwordshow1, setpasswordshow1] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useRouter();
  // const [tokenVerify, setTokenVerify] = useState(true);
  const ENCRYPTION_KEY = 'pass123';
  const encryptData = (data: string | number | null | undefined): string => {
    if (!data && data !== 0) {
      return '';
    }
    const stringData = String(data); // Convert to string
    return CryptoJS.AES.encrypt(stringData, ENCRYPTION_KEY).toString();
  };
  const decryptData = (encryptedData: string | null): string | null => {
    if (!encryptedData) {
      return null;
    }
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      // console.error('Decryption error:', error);
      return null;
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value.trim().replace(/\s+/g, '');
    setEmail(newEmail);

    emailSchema
      .validate(newEmail)
      .then(() => {
        setEmailError('');
      })
      .catch((err: Yup.ValidationError) => {
        setEmailError(err.message);
      });
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value.trim();
    setPassword(newPassword);

    passwordSchema
      .validate(newPassword)
      .then(() => {
        setPasswordErr('');
      })
      .catch((err: Yup.ValidationError) => {
        setPasswordErr(err.message);
      });
  };

  const handleRememberMeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
  };

  const validateForm = async () => {
    try {
      await validationSchema.validate(
        { email, password },
        { abortEarly: false },
      );
      setEmailError('');
      setPasswordErr('');
      return true;
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const emailErrorMsg =
          err.inner.find((error) => error.path === 'email')?.message || '';
        const passwordErrorMsg =
          err.inner.find((error) => error.path === 'password')?.message || '';
        setEmailError(emailErrorMsg);
        setPasswordErr(passwordErrorMsg);
      }
      return false;
    }
  };
  // const handleSubmit = async () => {
  //   if (rememberMe) {
  //     localStorage.setItem('rememberedEmail', email);
  //     localStorage.setItem('rememberedPassword', password);
  //   } else {
  //     localStorage.removeItem('rememberedEmail');
  //     localStorage.removeItem('rememberedPassword');
  //   }
  //   const isValid = await validateForm();
  //   if (isValid) {
  //     if (rememberMe) {
  //       localStorage.setItem('rememberMe', 'true');
  //     } else {
  //       localStorage.removeItem('rememberMe');
  //     }
  //     setLoading(true);
  //     const result: any = await Login(email, password);
  //     if (result?.errorCode === 0) {
  //       // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //       const user_id: any = result.user[0]?.id;
  //       // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //       const user_role: any = result.user[0]?.user_role;
  //       // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //       const user_firstname: any = result.user[0]?.firstname;
  //       // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //       const user_lastname: any = result.user[0]?.lastname;
  //       localStorage.setItem('user_id', user_id);
  //       localStorage.setItem(
  //         'user_fname',
  //         user_firstname ? user_firstname : '',
  //       );
  //       localStorage.setItem('user_lname', user_lastname ? user_lastname : '');
  //       localStorage.setItem('user_role', user_role);
  //       navigate.push('/organization');
  //       setLoading(false);
  //     } else {
  //       swal({
  //         icon: 'error',
  //         text: result.message,
  //       });
  //       setLoading(false);
  //     }
  //   }
  // };
  const handleSubmit = async () => {
    if (rememberMe) {
      const encryptedEmail = encryptData(email);
      const encryptedPassword = encryptData(password);
      if (encryptedEmail && encryptedPassword) {
        localStorage.setItem('rememberedEmail', encryptedEmail);
        localStorage.setItem('rememberedPassword', encryptedPassword);
      }
    } else {
      localStorage.removeItem('rememberedEmail');
      localStorage.removeItem('rememberedPassword');
    }

    const isValid = await validateForm();
    if (isValid) {
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('rememberMe');
      }

      setLoading(true);
      const result: any = await Login(email, password);
      if (result?.errorCode === 0) {
        const encryptedEmail1 = encryptData(email);
        localStorage.setItem('user_email', encryptedEmail1);
        const user_id: any = result.user[0]?.id;
        const user_role: any = result.user[0]?.user_role;
        const user_firstname: any = result.user[0]?.firstname;
        const user_lastname: any = result.user[0]?.lastname;

        const encryptedUserId = encryptData(user_id);
        const encryptedUserRole = encryptData(user_role);
        const encryptedUserFirstName = encryptData(
          user_firstname ? user_firstname : '',
        );
        const encryptedUserLastName = encryptData(
          user_lastname ? user_lastname : '',
        );

        if (encryptedUserId) {
          localStorage.setItem('user_id', encryptedUserId);
        }
        if (encryptedUserRole) {
          localStorage.setItem('user_role', encryptedUserRole);
        }
        if (encryptedUserFirstName) {
          localStorage.setItem('user_fname', encryptedUserFirstName);
        }
        if (encryptedUserLastName) {
          localStorage.setItem('user_lname', encryptedUserLastName);
        }

        navigate.push('/organization');
        setLoading(false);
      } else {
        swal({
          icon: 'error',
          text: result.message,
        });
        setLoading(false);
      }
    }
  };
  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('sb-emsjiuztcinhapaurcrl-auth-token');
      if (token) {
        // setTokenVerify(true);
        redirect('/organization');
      } else {
        // setTokenVerify(false);
      }
    }
  }, []);

  // useEffect(() => {
  //   const storedEmail = localStorage.getItem('rememberedEmail');
  //   const storedPassword = localStorage.getItem('rememberedPassword');
  //   if (storedEmail && storedPassword) {
  //     setEmail(storedEmail);
  //     setPassword(storedPassword);
  //     setRememberMe(true);
  //   }
  // }, []);
  useEffect(() => {
    const storedEncryptedEmail = localStorage.getItem('rememberedEmail');
    const storedEncryptedPassword = localStorage.getItem('rememberedPassword');

    if (storedEncryptedEmail && storedEncryptedPassword) {
      const decryptedEmail = decryptData(storedEncryptedEmail);
      const decryptedPassword = decryptData(storedEncryptedPassword);

      if (decryptedEmail && decryptedPassword) {
        setEmail(decryptedEmail);
        setPassword(decryptedPassword);
        setRememberMe(true);
      }
    }
  }, []);
  return (
    <>
      {loading && <Loader />}
      {/* {tokenVerify === true ? */}
      <Fragment>
        <div className='bg-theme'>
          <div className='authentication authentication-basic signin-new'>
            <div className='container'>
              <div className='flex justify-center  items-center h-full text-defaultsize text-defaulttextcolor'>
                <div className='grid grid-cols-12'>
                  <div className='xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-3 sm:col-span-2'></div>
                  <div className='xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-8 col-span-12'>
                    <div className='my-[2.5rem] flex justify-center'>
                      <Link href='/'>
                        <img
                          src={`${
                            process.env.NODE_ENV === 'production'
                              ? basePath
                              : ''
                          }/assets/images/brand-logos/desktop-logo.png`}
                          alt='logo'
                          className='desktop-logo '
                        />
                        <img
                          src={`${
                            process.env.NODE_ENV === 'production'
                              ? basePath
                              : ''
                          }/assets/images/brand-logos/desktop-dark.png`}
                          alt='logo'
                          className='desktop-dark login-logo'
                        />
                        {/* <Image
                        src='/assets/images/brand-logos/desktop-logo.png'
                        alt='logo'
                        width={100}
                        height={100}
                        className='desktop-logo '
                      />
                      <Image
                        src='/assets/images/brand-logos/desktop-logo.png'
                        alt='logo'
                        width={100}
                        height={100}
                        className='desktop-dark login-logo'
                      /> */}
                      </Link>
                    </div>

                    <div className='box !p-[3rem]'>
                      <div
                        className='box-body'
                        role='tabpanel'
                        id='pills-with-brand-color-01'
                        aria-labelledby='pills-with-brand-color-item-1'
                      >
                        <p className='h5 font-semibold mb-2 text-center'>
                          Sign In
                        </p>

                        {/* <p className="mb-4 text-[#8c9097] dark:text-white/50 opacity-[0.7] font-normal text-center">Welcome back Jhon !</p> */}
                        <div className='grid grid-cols-12 gap-y-4'>
                          <div className='xl:col-span-12 col-span-12'>
                            <label
                              htmlFor='signin-email'
                              className='form-label text-default'
                            >
                              Email
                            </label>
                            <input
                              type='text'
                              name='email'
                              className='form-control form-control-lg w-full !rounded-md'
                              id='email'
                              placeholder='Email'
                              value={email}
                              onChange={handleEmailChange}
                              maxLength={320}
                              onKeyDown={handleKeyPress}
                            />
                            {emailError && (
                              <div className='text-danger'>{emailError}</div>
                            )}
                            {/* <input type="text" name="email" className="form-control form-control-lg w-full !rounded-md" id="email" onChange={changeHandler} value={email}/> */}
                          </div>
                          <div className='xl:col-span-12 col-span-12 mb-2'>
                            <label
                              htmlFor='signin-password'
                              className='form-label text-default block'
                            >
                              Password
                            </label>
                            <div className='input-group'>
                              <input
                                name='password'
                                type={passwordshow1 ? 'text' : 'password'}
                                value={password}
                                onChange={handlePasswordChange}
                                onKeyDown={handleKeyPress}
                                maxLength={16}
                                className='form-control form-control-lg !rounded-s-md'
                                id='signin-password'
                                placeholder='Password'
                              />
                              <button
                                onClick={() => setpasswordshow1(!passwordshow1)}
                                aria-label='button'
                                className='ti-btn ti-btn-light !rounded-s-none !mb-0'
                                type='button'
                                id='button-addon2'
                              >
                                <i
                                  className={`${
                                    passwordshow1
                                      ? 'ri-eye-line'
                                      : 'ri-eye-off-line'
                                  } align-middle`}
                                ></i>
                              </button>
                            </div>
                            {passwordErr && (
                              <div className='text-danger'>{passwordErr}</div>
                            )}
                            <div className='mt-2'>
                              <div className='form-check !ps-0'>
                                <input
                                  style={{ cursor: 'pointer' }}
                                  className='form-check-input'
                                  type='checkbox'
                                  value=''
                                  id='defaultCheck1'
                                  checked={rememberMe}
                                  onKeyDown={handleKeyPress}
                                  onChange={handleRememberMeChange}
                                />
                                <label
                                  className='form-check-label text-[#8c9097] dark:text-white/50 font-normal'
                                  htmlFor='defaultCheck1'
                                >
                                  Remember password ?
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className='xl:col-span-12 col-span-12 grid mt-2'>
                            <button
                              className='ti-btn ti-btn-primary !bg-primary !text-white !font-medium'
                              onClick={handleSubmit}
                            >
                              Sign In
                            </button>
                            {/* <Link onClick={(e)=>{handleSubmit(e)}} href="#!" className="ti-btn ti-btn-primary !bg-primary !text-white !font-medium">Sign In</Link> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-3 sm:col-span-2'></div>
                </div>
              </div>
            </div>
            <div className='position-footer'>
              <Footer />
            </div>
          </div>
        </div>
      </Fragment>
      {/* : null}  */}
    </>
  );
};

export default LoginForm;
