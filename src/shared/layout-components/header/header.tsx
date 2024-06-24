/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import CryptoJS from 'crypto-js';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert';

import InitialsComponent from '@/helper/NameHelper';
import store from '@/shared/redux/store';
// import Modalsearch from '../modal-search/modalsearch';
// import { "" } from '@/next.config';
import { getUserRole } from '@/supabase/org_details';
import { getOrgUserRole } from '@/supabase/org_user';
import { getSiteUserRole } from '@/supabase/site_users';
import Loader from '@/utils/Loader/Loader';

import { ThemeChanger } from '../../redux/action';
const Header = ({ local_varaiable, ThemeChanger }: any) => {
  const data = (
    <span className='font-[600] py-[0.25rem] px-[0.45rem] rounded-[0.25rem] bg-pink/10 text-pink text-[0.625rem]'>
      Free shipping
    </span>
  );

  const cartProduct = [
    {
      id: 1,
      src: '/assets/images/ecommerce/jpg/1.jpg',
      name: 'SomeThing Phone',
      price: '$1,299.00',
      color: 'Metallic Blue',
      text: '6gb Ram',
      class: '',
    },
    {
      id: 2,
      src: '/assets/images/ecommerce/jpg/3.jpg',
      name: 'Stop Watch',
      price: '$179.29',
      color: 'Analog',
      text: data,
      class: '',
    },
    {
      id: 3,
      src: '/assets/images/ecommerce/jpg/5.jpg',
      name: 'Photo Frame',
      price: '$29.00',
      color: 'Decorative',
      text: '',
      class: '',
    },
    {
      id: 4,
      src: '/assets/images/ecommerce/jpg/4.jpg',
      name: 'Kikon Camera',
      price: '$4,999.00',
      color: 'Black',
      text: '50MM',
      class: '',
    },
    {
      id: 5,
      src: '/assets/images/ecommerce/jpg/6.jpg',
      name: 'Canvas Shoes',
      price: '$129.00',
      color: 'Gray',
      text: 'Sports',
      class: 'border-b-0',
    },
  ];

  // const toggleFullscreen = () => {
  //   const element = document.documentElement;
  //   if (
  //     !document.fullscreenElement &&
  //     !document.mozFullScreenElement &&
  //     !document.webkitFullscreenElement
  //   ) {
  //     // Enter fullscreen mode
  //     if (element.requestFullscreen) {
  //       element.requestFullscreen();
  //     } else if (element.mozRequestFullScreen) {
  //       element.mozRequestFullScreen();
  //     } else if (element.webkitRequestFullscreen) {
  //       element.webkitRequestFullscreen();
  //     }
  //   } else {
  //     // Exit fullscreen mode
  //     if (document.exitFullscreen) {
  //       document.exitFullscreen();
  //     } else if (document.mozCancelFullScreen) {
  //       document.mozCancelFullScreen();
  //     } else if (document.webkitExitFullscreen) {
  //       document.webkitExitFullscreen();
  //     }
  //   }
  // };

  useEffect(() => {
    const handleResize = () => {
      const windowObject = window;
      if (windowObject.innerWidth <= 991) {
        // ThemeChanger({ ...local_varaiable, "dataToggled": "close" })
      } else {
        // ThemeChanger({...local_varaiable,"dataToggled":""})
      }
    };
    handleResize(); // Check on component mount
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // useEffect(() => {
  //   SetStoreData(local_varaiable);
  // }, [local_varaiable]);

  // function menuClose() {
  //   const theme = store.getState();
  //   ThemeChanger({ ...theme, "dataToggled": "close" });
  // }

  function menuClose() {
    const theme = store.getState();
    if (window.innerWidth <= 992) {
      ThemeChanger({ ...theme, dataToggled: 'close' });
    }
    if (window.innerWidth >= 992) {
      ThemeChanger({
        ...theme,
        dataToggled: local_varaiable.dataToggled
          ? local_varaiable.dataToggled
          : '',
      });
      // local_varaiable.dataHeaderStyles == 'dark' ? 'light' : 'dark',
    }
  }

  const toggleSidebar = () => {
    const theme = store.getState();
    const sidemenuType = theme.dataNavLayout;
    if (window.innerWidth >= 992) {
      if (sidemenuType === 'vertical') {
        const verticalStyle = theme.dataVerticalStyle;
        const navStyle = theme.dataNavStyle;
        switch (verticalStyle) {
          // closed
          case 'closed':
            ThemeChanger({ ...theme, dataNavStyle: '' });
            if (theme.dataToggled === 'close-menu-close') {
              ThemeChanger({ ...theme, dataToggled: '' });
            } else {
              ThemeChanger({ ...theme, dataToggled: 'close-menu-close' });
            }
            break;
          // icon-overlay
          case 'overlay':
            ThemeChanger({ ...theme, dataNavStyle: '' });
            if (theme.dataToggled === 'icon-overlay-close') {
              ThemeChanger({ ...theme, dataToggled: '', iconOverlay: '' });
            } else {
              if (window.innerWidth >= 992) {
                ThemeChanger({
                  ...theme,
                  dataToggled: 'icon-overlay-close',
                  iconOverlay: '',
                });
              }
            }
            break;
          // icon-text
          case 'icontext':
            ThemeChanger({ ...theme, dataNavStyle: '' });
            if (theme.dataToggled === 'icon-text-close') {
              ThemeChanger({ ...theme, dataToggled: '' });
            } else {
              ThemeChanger({ ...theme, dataToggled: 'icon-text-close' });
            }
            break;
          // doublemenu
          case 'doublemenu':
            ThemeChanger({ ...theme, dataNavStyle: '' });
            ThemeChanger({ ...theme, dataNavStyle: '' });
            if (theme.dataToggled === 'double-menu-open') {
              ThemeChanger({ ...theme, dataToggled: 'double-menu-close' });
            } else {
              const sidemenu = document.querySelector(
                '.side-menu__item.active',
              );
              if (sidemenu) {
                ThemeChanger({ ...theme, dataToggled: 'double-menu-open' });
                if (sidemenu.nextElementSibling) {
                  sidemenu.nextElementSibling.classList.add(
                    'double-menu-active',
                  );
                } else {
                  ThemeChanger({ ...theme, dataToggled: '' });
                }
              }
            }
            // doublemenu(ThemeChanger);
            break;
          // detached
          case 'detached':
            if (theme.dataToggled === 'detached-close') {
              ThemeChanger({ ...theme, dataToggled: '', iconOverlay: '' });
            } else {
              ThemeChanger({
                ...theme,
                dataToggled: 'detached-close',
                iconOverlay: '',
              });
            }

            break;

          // default
          case 'default':
            ThemeChanger({ ...theme, dataToggled: '' });
        }
        switch (navStyle) {
          case 'menu-click':
            if (theme.dataToggled === 'menu-click-closed') {
              ThemeChanger({ ...theme, dataToggled: '' });
            } else {
              ThemeChanger({ ...theme, dataToggled: 'menu-click-closed' });
            }
            break;
          // icon-overlay
          case 'menu-hover':
            if (theme.dataToggled === 'menu-hover-closed') {
              ThemeChanger({ ...theme, dataToggled: '' });
            } else {
              ThemeChanger({ ...theme, dataToggled: 'menu-hover-closed' });
            }
            break;
          case 'icon-click':
            if (theme.dataToggled === 'icon-click-closed') {
              ThemeChanger({ ...theme, dataToggled: '' });
            } else {
              ThemeChanger({ ...theme, dataToggled: 'icon-click-closed' });
            }
            break;
          case 'icon-hover':
            if (theme.dataToggled === 'icon-hover-closed') {
              ThemeChanger({ ...theme, dataToggled: '' });
            } else {
              ThemeChanger({ ...theme, dataToggled: 'icon-hover-closed' });
            }
            break;
        }
      }
    } else {
      if (theme.dataToggled === 'close') {
        ThemeChanger({ ...theme, dataToggled: 'open' });

        setTimeout(() => {
          if (theme.dataToggled == 'open') {
            const overlay = document.querySelector('#responsive-overlay');

            if (overlay) {
              overlay.classList.add('active');
              overlay.addEventListener('click', () => {
                const overlay = document.querySelector('#responsive-overlay');

                if (overlay) {
                  overlay.classList.remove('active');
                  menuClose();
                }
              });
            }
          }

          window.addEventListener('resize', () => {
            if (window.screen.width >= 992) {
              const overlay = document.querySelector('#responsive-overlay');

              if (overlay) {
                overlay.classList.remove('active');
              }
            }
          });
        }, 100);
      } else {
        ThemeChanger({ ...theme, dataToggled: 'close' });
      }
    }
  };

  useEffect(() => {
    const navbar = document?.querySelector('.header');
    const navbar1 = document?.querySelector('.app-sidebar');
    const sticky: any = navbar?.clientHeight;
    // const sticky1 = navbar1.clientHeight;

    function stickyFn() {
      if (window.pageYOffset >= sticky) {
        navbar?.classList.add('sticky-pin');
        navbar1?.classList.add('sticky-pin');
      } else {
        navbar?.classList.remove('sticky-pin');
        navbar1?.classList.remove('sticky-pin');
      }
    }

    window.addEventListener('scroll', stickyFn);
    window.addEventListener('DOMContentLoaded', stickyFn);

    // Cleanup event listeners when the component unmounts
    return () => {
      window.removeEventListener('scroll', stickyFn);
      window.removeEventListener('DOMContentLoaded', stickyFn);
    };
  }, []);
  /////////////////////////////////
  const ENCRYPTION_KEY = 'pass123';

  const decryptData = (
    encryptedData: string | null,
  ): string | number | null => {
    if (!encryptedData) {
      return null;
    }
    try {
      const decryptedString = CryptoJS.AES.decrypt(
        encryptedData,
        ENCRYPTION_KEY,
      ).toString(CryptoJS.enc.Utf8);
      return !isNaN(Number(decryptedString))
        ? Number(decryptedString)
        : decryptedString;
    } catch (error) {
      return null;
    }
  };
  const history = useRouter();
  const pathname = usePathname();

  const [user_id, setuser_id] = useState<any>('');
  const [user_fname, setUser_fname] = useState<any>('');
  const [user_lname, setUserlname] = useState<any>('');
  const [user_role, setUserrole] = useState<any>('');
  const [org_id, setOrg_id] = useState<any>('');
  const [site_id, setSite_id] = useState<any>('');
  // useEffect(() => {
  //   const userid: any = localStorage.getItem('user_id');
  //   const userfname: any = localStorage.getItem('user_fname');
  //   const userlname: any = localStorage.getItem('user_lname');
  //   const userrole: any = localStorage.getItem('user_role');
  //   const orgid: any = localStorage.getItem('org_id');
  //   setuser_id(userid);
  //   setUser_fname(userfname);
  //   setUserlname(userlname);
  //   setUserrole(userrole);
  //   setOrg_id(orgid);
  // }, [pathname]);
  useEffect(() => {
    const decryptedUserId = decryptData(localStorage.getItem('user_id'));
    const decryptedUserFname = decryptData(localStorage.getItem('user_fname'));
    const decryptedUserLname = decryptData(localStorage.getItem('user_lname'));
    const decryptedUserRole = decryptData(localStorage.getItem('user_role'));
    const decryptedOrgId = decryptData(localStorage.getItem('org_id'));
    const decryptedsiteId = decryptData(localStorage.getItem('site_id'));
    setuser_id(decryptedUserId);
    setUser_fname(decryptedUserFname);
    setUserlname(decryptedUserLname);
    setUserrole(decryptedUserRole);
    setOrg_id(decryptedOrgId);
    setSite_id(decryptedsiteId);
  }, [pathname]);
  const [userRoleName, setUserRoleName] = useState('');
  useEffect(() => {
    const fetchData2 = async () => {
      try {
        const data: any = await getUserRole();

        if (data && data.data && data.data.length > 0) {
          for (let i = 0; i < data.data.length; i++) {
            if (data.data[i].id == user_role) {
              setUserRoleName(data.data[i].name);
            } else {
              //
            }
          }
        } else {
          //
        }
      } catch (error: any) {
        /* empty */
      }
    };

    fetchData2();
  }, [user_role]);

  const [userrole2, setuserrole2] = useState('');
  useEffect(() => {
    const fetchData2 = async () => {
      try {
        const data: any = await getOrgUserRole(user_id, org_id);

        if (data) {
          setuserrole2(data.data.name);
        } else {
          //
        }
      } catch (error: any) {
        //
      }
    };

    fetchData2();
  }, [user_id, org_id, pathname]);
  const [userrole3, setuserrole3] = useState('');
  useEffect(() => {
    const fetchData2 = async () => {
      try {
        const data: any = await getSiteUserRole(user_id, site_id);

        if (data) {
          setuserrole3(data.data.name);
        } else {
          //
        }
      } catch (error: any) {
        //
      }
    };

    fetchData2();
  }, [site_id, user_id, pathname]);
  const [roleToDisplay, setRoleToDisplay] = useState('');

  useEffect(() => {
    if (pathname == '/organization') {
      // setRoleToDisplay(userRoleName);
      setRoleToDisplay('');
    } else if (pathname === '/orgdashboard' || pathname === '/sites') {
      setRoleToDisplay(userrole2);
    } else if (
      pathname === '/sitedashboard' ||
      pathname === '/license' ||
      pathname === '/products' ||
      pathname === '/solution'
    ) {
      setRoleToDisplay(userrole3);
    }
  }, [userRoleName, org_id, userrole2, site_id, userrole3, pathname]);
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <>
      {loading && <Loader />}
      <Fragment>
        <div className='app-header'>
          <nav className='main-header !h-[3.75rem]' aria-label='Global'>
            <div className='main-header-container ps-[0.725rem] pe-[1rem] '>
              <div className='header-content-left'>
                <div className='header-element'>
                  <div className='horizontal-logo'>
                    <Link href='/organization' className='header-logo'>
                      <Image
                        src={`${
                          process.env.NODE_ENV === 'production' ? '' : ''
                        }/assets/images/brand-logos/desktop-logo.png`}
                        alt='logo'
                        className='desktop-logo'
                        width={100}
                        height={100}
                      />
                      <Image
                        src={`${
                          process.env.NODE_ENV === 'production' ? '' : ''
                        }/assets/images/brand-logos/toggle-logo.png`}
                        alt='logo'
                        className='toggle-logo'
                        width={100}
                        height={100}
                      />
                      <Image
                        src={`${
                          process.env.NODE_ENV === 'production' ? '' : ''
                        }/assets/images/brand-logos/desktop-dark.png`}
                        alt='logo'
                        className='desktop-dark'
                        width={100}
                        height={100}
                      />
                      <Image
                        src={`${
                          process.env.NODE_ENV === 'production' ? '' : ''
                        }/assets/images/brand-logos/toggle-dark.png`}
                        alt='logo'
                        className='toggle-dark'
                        width={100}
                        height={100}
                      />
                      <Image
                        src={`${
                          process.env.NODE_ENV === 'production' ? '' : ''
                        }/assets/images/brand-logos/desktop-white.png`}
                        alt='logo'
                        className='desktop-white'
                        width={100}
                        height={100}
                      />
                      <Image
                        src={`${
                          process.env.NODE_ENV === 'production' ? '' : ''
                        }/assets/images/brand-logos/toggle-white.png`}
                        alt='logo'
                        className='toggle-white'
                        width={100}
                        height={100}
                      />
                    </Link>
                  </div>
                </div>
                <div
                  className='header-element md:px-[0.325rem] !items-center'
                  onClick={() => toggleSidebar()}
                >
                  <Link
                    aria-label='Hide Sidebar'
                    className='sidemenu-toggle animated-arrow  hor-toggle horizontal-navtoggle inline-flex items-center'
                    href=''
                  >
                    <span></span>
                  </Link>
                </div>
              </div>
              <div className='header-content-right'>
                <div className='header-element md:!px-[0.65rem] px-2 hs-dropdown !items-center ti-dropdown [--placement:bottom-left]'>
                  <button
                    id='dropdown-profile'
                    type='button'
                    className='hs-dropdown-toggle ti-dropdown-toggle !gap-2 !p-0 flex-shrink-0 sm:me-2 me-0 !rounded-full !shadow-none text-xs align-middle !border-0 !shadow-transparent '
                  >
                    <div className='avatar avatar-xl avatar-rounded '>
                      {' '}
                      <span
                        style={{ cursor: 'pointer' }}
                        className='inline-flex items-center justify-center !w-[2.75rem] !h-[2.75rem] leading-[2.75rem] text-[0.85rem]  rounded-full text-success bg-success/10 font-semibold'
                      >
                        {/* {SingleSite?.site?SingleSite?.site?.name[0].toUpperCase(): ""} */}
                        {user_fname ? (
                          <InitialsComponent name={user_fname} />
                        ) : (
                          ''
                        )}

                        {user_lname ? (
                          <InitialsComponent name={user_lname} />
                        ) : (
                          ''
                        )}
                      </span>
                    </div>
                    {/* <Image
                    className='inline-block rounded-full '
                    src='/assets/images/user.jpg'
                    width='32'
                    height='32'
                    alt='Image Description'
                  /> */}
                  </button>
                  <div
                    className='md:block hidden dropdown-profile'
                    style={{ cursor: 'pointer' }}
                  >
                    <p className='font-semibold mb-0 leading-none text-[#536485] text-[0.813rem] '>
                      {user_fname} {user_lname}
                    </p>
                    <span className='opacity-[0.7] font-normal text-[#536485] block text-[0.6875rem] '>
                      {/* {userRoleName} */}
                      {roleToDisplay ? roleToDisplay : ''}
                    </span>
                  </div>
                  <div
                    className='hs-dropdown-menu ti-dropdown-menu !-mt-3 border-0 w-[11rem] !p-0 border-defaultborder hidden main-header-dropdown  pt-0 overflow-hidden header-profile-dropdown dropdown-menu-end'
                    aria-labelledby='dropdown-profile'
                  >
                    <ul className='text-defaulttextcolor font-medium dark:text-[#8c9097] dark:text-white/50'>
                      {/* <li>
                      <Link className="w-full ti-dropdown-item !text-[0.8125rem] !gap-x-0  !p-[0.65rem] !inline-flex" href="/components/pages/profile/">
                        <i className="ti ti-user-circle text-[1.125rem] me-2 opacity-[0.7]"></i>Profile
                      </Link>
                    </li>
                    <li>
                      <Link className="w-full ti-dropdown-item !text-[0.8125rem] !gap-x-0  !p-[0.65rem] !inline-flex" href="/components/pages/email/mail-app/"><i
                        className="ti ti-inbox text-[1.125rem] me-2 opacity-[0.7]"></i>Inbox <span
                          className="!py-1 !px-[0.45rem] !font-semibold !rounded-sm text-success text-[0.75em] bg-success/10 ms-auto">25</span>
                      </Link>
                    </li>
                    <li><Link className="w-full ti-dropdown-item !text-[0.8125rem] !gap-x-0 !p-[0.65rem] !inline-flex" href="/components/pages/todo-list/"><i
                      className="ti ti-clipboard-check text-[1.125rem] me-2 opacity-[0.7]"></i>Task Manager</Link></li>
                    <li><Link className="w-full ti-dropdown-item !text-[0.8125rem] !gap-x-0 !p-[0.65rem] !inline-flex" href="/components/pages/email/mail-settings/"><i
                      className="ti ti-adjustments-horizontal text-[1.125rem] me-2 opacity-[0.7]"></i>Settings</Link></li>
                    <li><Link className="w-full ti-dropdown-item !text-[0.8125rem] !gap-x-0 !p-[0.65rem] !inline-flex " href="#!"><i
                      className="ti ti-wallet text-[1.125rem] me-2 opacity-[0.7]"></i>Bal: $7,12,950</Link></li>
                    <li><Link className="w-full ti-dropdown-item !text-[0.8125rem] !p-[0.65rem] !gap-x-0 !inline-flex" href="/components/pages/chat/"><i
                      className="ti ti-headset text-[1.125rem] me-2 opacity-[0.7]"></i>Support</Link></li> */}

                      <li
                        onClick={() => {
                          swal({
                            title: 'Are you sure?',
                            text: 'Do you really want to logout?',
                            icon: 'warning',
                            buttons: {
                              cancel: {
                                text: 'Cancel',
                                value: null,
                                visible: true,
                                className: '',
                                closeModal: true,
                              },
                              confirm: {
                                text: 'Yes, logout!',
                                value: true,
                                visible: true,
                                className:
                                  'swal-button--confirm hover:!bg-primary hover:!text-white',
                                closeModal: true,
                              },
                            },
                          }).then((willLogout: any) => {
                            if (willLogout) {
                              setLoading(true);
                              localStorage.removeItem(
                                'sb-emsjiuztcinhapaurcrl-auth-token',
                              );
                              localStorage.removeItem('org_id');
                              localStorage.removeItem('org_name');
                              localStorage.removeItem('site_id');
                              localStorage.removeItem('site_name');
                              localStorage.removeItem('user_role');
                              localStorage.removeItem('user_id');
                              localStorage.removeItem('site_owner_name');
                              localStorage.removeItem('user_fname');
                              localStorage.removeItem('user_lname');
                              localStorage.removeItem('org_type_id');
                              history.push('/');
                              setLoading(false);
                            }
                          });
                        }}
                      >
                        <button className='w-full ti-dropdown-item !text-[0.8125rem] !p-[0.65rem] !gap-x-0 !inline-flex'>
                          {/* <Link className="w-full ti-dropdown-item !text-[0.8125rem] !p-[0.65rem] !gap-x-0 !inline-flex" href="/components/authentication/sign-in/signin-cover/"> */}
                          <i className='ri-logout-circle-line text .cs-[1.125rem] me-2 opacity-[1]'></i>
                          Log Out
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* <div className="header-element md:px-[0.48rem]">
              <button aria-label="button" type="button"
                className="hs-dropdown-toggle switcher-icon inline-flex flex-shrink-0 justify-center items-center gap-2  rounded-full font-medium  align-middle transition-all text-xs dark:text-[#8c9097] dark:text-white/50 dark:hover:text-white dark:focus:ring-white/10 dark:focus:ring-offset-white/10"
                data-hs-overlay="#hs-overlay-switcher">
                <i className="bx bx-cog header-link-icon animate-spin-slow"></i>
              </button>
            </div> */}
              </div>
            </div>
          </nav>
        </div>
        {/* <Modalsearch /> */}
      </Fragment>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  local_varaiable: state,
});
export default connect(mapStateToProps, { ThemeChanger })(Header);
