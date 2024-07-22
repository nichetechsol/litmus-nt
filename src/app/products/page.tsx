/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client';

import { redirect, useRouter } from 'next/navigation';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import swal from 'sweetalert';

import 'react-toastify/dist/ReactToastify.css';

import { decryptData } from '@/helper/Encryption_Decryption';
import { logActivity } from '@/supabase/activity';
import { reqProductsforLitmus } from '@/supabase/licence';
import {
  downloadProduct,
  listofallFiles,
  listofProducts,
  listofProductsFolder,
} from '@/supabase/products';
import { refreshToken } from '@/supabase/session';
import Loader from '@/utils/Loader/Loader';
interface folderDetailsData {
  name: string;
  product_type: string;
}
interface subfolderDetailsData {
  name: string;
  status: string;
}

interface files {
  FileName: string;
  status: string;
  subfolder: string;
  disabled: boolean;
}
const Page = () => {
  const navigate = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [tokenVerify, setTokenVerify] = useState(false);
  const [orgName, setorgName] = useState<any>('');
  const [user_id, setuser_id] = useState<any>('');
  const [org_id, setorg_id] = useState<any>('');
  const [site_id, setsite_id] = useState<any>('');
  const [org_type_id, setOrg_type_id] = useState<any>('');
  const [folderTrue, setFolderTrue] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<any>('');
  const [onlyToken, setOnlyToken] = useState('');
  const [userEmail, setUseremail] = useState<any>('');

  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      const tokens = localStorage.getItem('sb-emsjiuztcinhapaurcrl-auth-token');
      if (!tokens) {
        setTokenVerify(false);
        redirect('/');
      } else {
        setTokenVerify(true);
        const token = JSON.parse(tokens);
        setOnlyToken(token.access_token);
      }
    }
  }, []);

  useEffect(() => {
    const encryptedUserId = localStorage.getItem('user_id');
    const encryptedOrgId = localStorage.getItem('org_id');
    const encryptedSiteId = localStorage.getItem('site_id');
    const encrytedOrgTypeId = localStorage.getItem('org_type_id');
    const decryptedOrgName = decryptData(localStorage.getItem('org_name'));
    const decrypteduserEmail = decryptData(localStorage.getItem('user_email'));

    const decryptedUserId = decryptData(encryptedUserId);
    const decryptedOrgId = decryptData(encryptedOrgId);
    const decryptedSiteId = decryptData(encryptedSiteId);
    const decrytedOrgTypeId = decryptData(encrytedOrgTypeId);

    if (decryptedOrgId) {
      setorg_id(decryptedOrgId);
      if (!decryptedSiteId) {
        document.body.classList.add('no-scroll');
        swal('Please select a Site', { icon: 'error' }).then(() => {
          document.body.classList.remove('no-scroll');
          navigate.push('/sites');
          // redirect('/organization');
        });
      }
    } else {
      document.body.classList.add('no-scroll');
      swal('Please select a Organization', { icon: 'error' }).then(() => {
        document.body.classList.remove('no-scroll');
        navigate.push('/organization');
        return;
        // redirect('/organization');
      });
    }
    if (decryptedOrgName) {
      setorgName(decryptedOrgName);
      setUseremail(decrypteduserEmail);
    }
    if (decryptedSiteId) {
      setsite_id(decryptedSiteId);
    }
    if (decrytedOrgTypeId) {
      setOrg_type_id(decrytedOrgTypeId);
    }
    if (decryptedUserId) {
      setuser_id(decryptedUserId);
    }

    // if (!decryptedSiteId) {
    //   swal('Please select a Site or Organization', { icon: 'error' });
    //   redirect('/organization');
    // }
  }, []);
  useEffect(() => {
    const refresh = async () => {
      try {
        await refreshToken();
      } catch {
        //
      }
    };
    refresh();
  }, []);

  const [currentTrue, setCurrentTrue] = useState(true);

  const handleDownload = async (fileName: string, subfolder: string) => {
    setLoading(true);
    const result = await downloadProduct(
      currentSelectedFolder?.name,
      subfolder,
      fileName,
    );
    if (result) {
      // Convert the response to a blob
      const blob = new Blob([result], { type: result.type });
      const url = window.URL.createObjectURL(blob);

      // Create a link element and simulate a click to download the file
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Revoke the object URL to free up memory
      window.URL.revokeObjectURL(url);
    }
    setLoading(false);
    const data = {
      org_id: org_id,
      site_id: site_id,
      user_id: user_id,
      activity_type: 'download_file',
      details: { filename: fileName },
    };
    const response = await logActivity(data);
    if (response) {
      //
    }
  };

  const [folder1, setFolder1] = useState<folderDetailsData[] | null>(null);
  const [currentSubFolder, setCurrentSubFolder] =
    useState<subfolderDetailsData | null>(null);
  const [bucketName, setBucketName] = useState<string>('');
  const [currentSelectedFolder, setCurrentSelectedFolder] =
    useState<folderDetailsData | null>(null);
  const [subFolder, setSubFolder] = useState<subfolderDetailsData[] | null>(
    null,
  );
  const [files, setFiles] = useState<files[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (org_id) {
          const data: any = await listofProducts(org_id);

          if (data) {
            setFolder1(data.data);
            setCurrentTrue(true);
            setBucketName(data.bucket_name);
          } else {
            setFolder1(null);
            setFolderTrue(true);
          }

          setLoading(false);
        }
      } catch (error: any) {
        setLoading(false);
      }
    };
    fetchData();
  }, [org_id]);

  useEffect(() => {
    if (folder1) {
      handlefolderclick1(folder1[0]);
      setCurrentTrue(true);
    }
  }, [folder1]);
  function handlefolderclick1(folder: any) {
    setCurrentSelectedFolder(folder);
    const fetchData = async () => {
      try {
        setLoading(true);
        if (org_id) {
          const data: any = await listofProductsFolder(folder.name, bucketName);
          if (data) {
            setSubFolder(data.data);
            setCurrentTrue(true);
          } else {
            setSubFolder(null);
          }

          setLoading(false);
        }
      } catch (error: any) {
        setLoading(false);
      }
    };
    fetchData();
  }
  useEffect(() => {
    if (subFolder) {
      const current = subFolder.find((folder) => folder.status === 'current');
      const archive = subFolder.find((folder) => folder.status === 'all');
      if (currentTrue && current) {
        setCurrentSubFolder(current);
        handleSubFolderClick(current);
      } else if (!currentTrue && archive) {
        setCurrentSubFolder(archive);
        handleSubFolderClick(archive);
      }
    }
  }, [subFolder, currentTrue]);

  const handleSubFolderClick = (subFolder: any) => {
    setCurrentSubFolder(subFolder);
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = {
          bucket_name: bucketName,
          folder: currentSelectedFolder?.name,
          subfolder: subFolder.name,
          version: subFolder.status,
          product: currentSelectedFolder?.product_type,
          org_type_id: org_type_id,
          org_id: org_id,
        };

        const result: any = await listofallFiles(data);
        if (result) {
          setFiles(result.data);
          // setCurrentTrue(true)
        } else {
          setFiles(null);
        }

        setLoading(false);
      } catch (error: any) {
        setLoading(false);
      }
    };
    fetchData();
  };

  const handleRequestMail = async () => {
    // toast.warning('Work In Progress..', { autoClose: 3000 });
    const data = {
      userName: userEmail,
      name: orgName,
      token: onlyToken,
    };
    setLoading(true);
    try {
      const response: any = await reqProductsforLitmus(data);
      if (response) {
        setLoading(false);
        toast.success(response.message, { autoClose: 3000 });
      } else if (response.errorCode === 0) {
        toast.error(response.message, { autoClose: 3000 });
      }
    } catch (error: any) {
      toast.error(`Error: ${error.message}`, { autoClose: 3000 });
    }
  };

  return (
    <>
      {loading && <Loader />}
      {tokenVerify && (
        <>
          <ToastContainer />
          <div className='my-5'>
            <div className='grid grid-cols-12 gap-6'>
              <div className='xl:col-span-12 col-span-12'>
                <h6 className='font-semibold mb-0 text-[1rem]'>Products</h6>
              </div>
              <div className='xl:col-span-3 col-span-12'>
                <div className='box custom-box overflow-hidden'>
                  <div className='box-header !border-b-0'>
                    <div className='box-title'>Folders</div>
                  </div>
                  <div className='box-body !p-0'>
                    <ul className='list-group nft-list'>
                      {folder1 && folder1.length > 0
                        ? folder1.map((folder: any) => (
                            <>
                              <li
                                style={{ cursor: 'pointer' }}
                                key={folder}
                                className={`list-group-item ${
                                  currentSelectedFolder === folder
                                    ? 'checkforactive'
                                    : ''
                                }`}
                                onClick={() => handlefolderclick1(folder)}
                              >
                                <div className='flex items-center gap-2'>
                                  <div>
                                    <span className='avatar avatar-rounded avatar-sm bg-primary p-1'>
                                      <i className='ri-folder-line text-[1rem]  text-white'></i>
                                    </span>
                                    {/* <span className='avatar avatar-rounded avatar-sm bg-light p-1'>
                                 
                                </span> */}
                                  </div>
                                  <div className='text-[.875rem] font-semibold my-auto '>
                                    {folder?.name}
                                  </div>
                                </div>
                              </li>
                            </>
                          ))
                        : null}

                      {folderTrue && folderTrue === true && (
                        <div className='col-md-12 w-100 mt-4'>
                          <p className='text-center py-3'>No Folder Found</p>{' '}
                        </div>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
              <div className='xl:col-span-9 col-span-12'>
                <div className='box custom-box'>
                  <div className='box-header flex justify-between'>
                    <div className='box-title'>
                      {currentTrue ? 'Current' : 'Archive'}
                    </div>
                    <div>
                      <button
                        type='button'
                        className={
                          currentTrue
                            ? 'ti-btn ti-btn-primary-full btn-wave !me-3'
                            : 'ti-btn btn-wave !me-3 ti-btn-outline-primary'
                        }
                        onClick={() => {
                          setCurrentTrue(true);
                        }}
                      >
                        Current{' '}
                      </button>
                      {/* ti-btn ti-btn-secondary-full btn-wave */}
                      <button
                        type='button'
                        className={
                          currentTrue
                            ? 'ti-btn btn-wave ti-btn-outline-primary'
                            : 'ti-btn ti-btn-primary-full btn-wave'
                        }
                        onClick={() => {
                          setCurrentTrue(false);
                        }}
                      >
                        Archive
                      </button>
                    </div>
                  </div>
                  <div className='box-header'>
                    <div className='box-header justify-between'>
                      <div className='box-title'>Subfolders</div>
                    </div>

                    {subFolder && subFolder.length > 0 ? (
                      <div className='flex-lg justify-between w-full'>
                        {subFolder
                          .filter((subFolder: subfolderDetailsData) => {
                            return currentTrue
                              ? subFolder.status === 'current'
                              : subFolder.status === 'all';
                          })
                          .map((subFolder: subfolderDetailsData) => (
                            <button
                              key={subFolder.name}
                              type='button'
                              className={
                                currentSubFolder === subFolder
                                  ? 'ti-btn ti-btn-primary-full break-all btn-wave !me-3 w-full'
                                  : 'ti-btn ti-btn-outline-primary break-all btn-wave !me-3 w-full'
                              }
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                handleSubFolderClick(subFolder);
                              }}
                            >
                              {subFolder.name}{' '}
                            </button>
                          ))}
                      </div>
                    ) : null}
                  </div>
                  <div className='box-body'>
                    <ul className='list-none crm-top-deals mb-0'>
                      {files && files.length > 0
                        ? files?.map((file: any) => (
                            <>
                              <li className='mb-[0.9rem] p-4 hover:bg-light border dark:border-defaultborder/10 rounded-md relative"'>
                                <div className='flex items-center flex-wrap'>
                                  <div className='me-2'>
                                    <span className='avatar avatar-rounded avatar-sm bg-primary p-1'>
                                      <i className='ri-file-line text-[1rem]  text-white'></i>
                                    </span>
                                  </div>
                                  <div className='flex-grow  ic-product-p'>
                                    <p
                                      className={`font-semibold mb-[1.4px]  text-[0.813rem] ${
                                        file.disabled ? '' : 'text-gray-500'
                                      }`}
                                    >
                                      {file.FileName}
                                    </p>

                                    {/* <p className='text-[#8c9097] dark:text-white/50 text-[0.75rem]'>
                                    Size 16MB
                                  </p> */}
                                  </div>
                                  <div className='font-semibold text-[0.9375rem] '>
                                    {file.disabled ? (
                                      <a
                                        onClick={() =>
                                          handleDownload(
                                            file.FileName,
                                            file.subfolder,
                                          )
                                        }
                                        // href={files.downloadLink}
                                        className='text-[1rem] !w-[1.9rem] rounded-sm !h-[1.9rem] !leading-[1.9rem] inline-flex items-center justify-center bg-primary'
                                        style={{ cursor: 'pointer' }}
                                      >
                                        <i className='ri-download-line text-[.8rem] text-white'></i>
                                      </a>
                                    ) : (
                                      <>
                                        {bucketName &&
                                        bucketName === 'Litmus_Products' ? (
                                          <a
                                            onClick={() => handleRequestMail()}
                                            // href={files.downloadLink}
                                            className='text-[1rem] !w-[7.9rem] rounded-sm !h-[1.9rem] !leading-[1.9rem] inline-flex items-center justify-center bg-primary'
                                            style={{ cursor: 'pointer' }}
                                          >
                                            {/* <i className='ri-mail-line text-[.8rem] text-white'></i> */}
                                            <p className='text-white text-[.8rem]'>
                                              Request Access
                                            </p>
                                          </a>
                                        ) : (
                                          'false'
                                        )}
                                      </>
                                    )}
                                  </div>
                                </div>
                              </li>
                            </>
                          ))
                        : null}

                      {folderTrue && folderTrue === true && (
                        <>
                          <div className='col-md-12 w-100 mt-4'>
                            <p className='text-center'>No Files Found</p>{' '}
                          </div>
                          <></>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Page;
