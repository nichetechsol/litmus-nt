'use client';
import CryptoJS from 'crypto-js';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, {
  ChangeEvent,
  Fragment,
  KeyboardEvent,
  useEffect,
  useState,
} from 'react';
import swal from 'sweetalert';
import * as Yup from 'yup';

import { emailSchemaSign, passwordSchema } from '@/helper/ValidationHelper';
import Footer from '@/shared/layout-components/footer/footer';
import { AsureAuth, GetUser, Login, LoginResult } from '@/supabase/auth';
import supabase from '@/supabase/db';
import Loader from '@/utils/Loader/Loader';

import { basePath } from '../../next.config';

const validationSchema = Yup.object().shape({
  email: emailSchemaSign,
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
  const handleLogin = async () => {
    await AsureAuth('azure');
  };
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
      return null;
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value.trim().replace(/\s+/g, '');
    setEmail(newEmail);

    emailSchemaSign
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
      const result: LoginResult = await Login(email, password);
      if (result?.errorCode === 0) {
        if (result?.user) {
          const encryptedEmail1 = encryptData(email);
          localStorage.setItem('user_email', encryptedEmail1);
          const user_id = result?.user[0]?.id;
          const user_role = result.user[0]?.user_role;
          const user_firstname = result.user[0]?.firstname;
          const user_lastname = result.user[0]?.lastname;
          const add_orgUser = result.add_orgUser ? 'true' : 'false';
          const org_exists = result.org_exists ? 'true' : 'false';

          const encryptedUserId = encryptData(user_id);
          const encryptedUserRole = encryptData(user_role);
          const encryptedUserFirstName = encryptData(
            user_firstname ? user_firstname : '',
          );
          const encryptedUserLastName = encryptData(
            user_lastname ? user_lastname : '',
          );
          const encryptedAddOrgUser = encryptData(
            add_orgUser ? add_orgUser : '',
          );
          const encryptedOrgExists = encryptData(org_exists ? org_exists : '');
          localStorage.setItem('azure', 'false');
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
          if (encryptedAddOrgUser) {
            localStorage.setItem('add_orgUser', encryptedAddOrgUser);
          }
          if (encryptedOrgExists) {
            localStorage.setItem('org_exists', encryptedOrgExists);
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
    }
  };
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          // User is logged in
          // alert('signed IN');
          setLoading(true);
          // navigate.push('/organization');

          const checkUser = async () => {
            setLoading(true);

            // INITIAL_SESSION -- Emitted right after the Supabase client is constructed and the initial session from storage is loaded.
            if (event == 'INITIAL_SESSION') {
              const result = await GetUser();

              if (result) {
                if (result?.errorCode === 0) {
                  const encryptedEmail1 = encryptData(
                    result.user.data[0]?.email,
                  );
                  localStorage.setItem('user_email', encryptedEmail1);
                  localStorage.setItem('azure', 'true');
                  const user_id = result.user.data[0]?.id;
                  const user_firstname = result.user.data[0]?.firstname;
                  const user_lastname = result.user.data[0]?.lastname;
                  const add_orgUser = result.add_orgUser ? 'true' : 'false';
                  const org_exists = result.org_exists ? 'true' : 'false';

                  const encryptedUserId = encryptData(user_id);
                  const encryptedUserFirstName = encryptData(
                    user_firstname ? user_firstname : '',
                  );
                  const encryptedUserLastName = encryptData(
                    user_lastname ? user_lastname : '',
                  );
                  const encryptedAddOrgUser = encryptData(
                    add_orgUser ? add_orgUser : '',
                  );
                  const encryptedOrgExists = encryptData(
                    org_exists ? org_exists : '',
                  );

                  if (encryptedUserId) {
                    localStorage.setItem('user_id', encryptedUserId);
                  }

                  if (encryptedUserFirstName) {
                    localStorage.setItem('user_fname', encryptedUserFirstName);
                  }
                  if (encryptedUserLastName) {
                    localStorage.setItem('user_lname', encryptedUserLastName);
                  }
                  if (encryptedAddOrgUser) {
                    localStorage.setItem('add_orgUser', encryptedAddOrgUser);
                  }
                  if (encryptedOrgExists) {
                    localStorage.setItem('org_exists', encryptedOrgExists);
                  }
                  navigate.push('/organization');
                  setLoading(false);
                } else if (result == undefined || result == null) {
                  setLoading(false);
                } else {
                  if (result.message != 'User data is not found') {
                    swal({
                      icon: 'error',
                      text: result.message,
                    });
                  }
                  // window.location.reload();
                  setLoading(false);
                }

                // User is already logged in, redirect to the desired page
                // navigate.push('/organization'); // or any other page you want to redirect to
              } else {
                setLoading(false);
              }
            } else {
              setLoading(false);
            }
          };

          setTimeout(async () => {
            await checkUser();
          }, 10000);
        } else {
          setLoading(false);
          // User is logged out
        }
      },
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [navigate]);

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
              <div className='flex justify-center   items-center h-90 text-defaultsize text-defaulttextcolor'>
                <div className='login-div'>
                  <div className='xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-8 col-span-12'>
                    <div className='my-[2.5rem] flex justify-center'>
                      <Link href='/' onClick={() => window.location.reload()}>
                        <Image
                          src={`${
                            process.env.NODE_ENV === 'production'
                              ? basePath
                              : ''
                          }/assets/images/brand-logos/desktop-logo.png`}
                          alt='logo'
                          className='desktop-logo '
                          width={200}
                          height={100}
                        />
                        <Image
                          src={`${
                            process.env.NODE_ENV === 'production'
                              ? basePath
                              : ''
                          }/assets/images/brand-logos/desktop-dark.png`}
                          alt='logo'
                          className='desktop-dark login-logo'
                          width={200}
                          height={100}
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
                        className='box-body !p-0'
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
                              Email<span className='text-danger'>&nbsp;*</span>
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
                              <span className='text-danger'>&nbsp;*</span>
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
                                  className='form-check-input check-1'
                                  type='checkbox'
                                  value=''
                                  id='defaultCheck1'
                                  checked={rememberMe}
                                  onKeyDown={handleKeyPress}
                                  onChange={handleRememberMeChange}
                                />
                                <label className='form-check-label text-[#8c9097] dark:text-white/50 font-normal'>
                                  Remember Password?
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

                            <button
                              className='ti-btn ti-btn-primary !bg-primary !text-white !font-medium'
                              onClick={handleLogin}
                            >
                              Login with Azure
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
