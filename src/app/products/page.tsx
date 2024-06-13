/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client';

import { redirect } from 'next/navigation';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import swal from 'sweetalert';

import { decryptData } from '@/helper/Encryption_Decryption';
import { allCurrentfiles } from '@/supabase/products';
import { refreshToken } from '@/supabase/session';
import Loader from '@/utils/Loader/Loader';

const Page = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [tokenVerify, setTokenVerify] = useState(false);
  const [org_id, setorg_id] = useState<any>('');
  const [site_id, setsite_id] = useState<any>('');
  const [org_type_id, setOrg_type_id] = useState<any>('');
  const [folder, setFolder] = useState<any>('');
  const [innerFolder, setInnerFolder] = useState<any>('');
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [filteredFiles, setFilteredFiles] = useState<any>('');
  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      const tokens = localStorage.getItem('sb-emsjiuztcinhapaurcrl-auth-token');
      if (!tokens) {
        setTokenVerify(false);
        redirect('/');
      } else {
        setTokenVerify(true);
      }
    }
  }, []);

  useEffect(() => {
    const encryptedOrgId = localStorage.getItem('org_id');
    const encryptedSiteId = localStorage.getItem('site_id');
    const encrytedOrgTypeId = localStorage.getItem('org_type_id');

    const decryptedOrgId = decryptData(encryptedOrgId);
    const decryptedSiteId = decryptData(encryptedSiteId);
    const decrytedOrgTypeId = decryptData(encrytedOrgTypeId);
    if (decryptedOrgId) {
      setorg_id(decryptedOrgId);
    }

    if (decryptedSiteId) {
      setsite_id(decryptedSiteId);
    }
    if (decrytedOrgTypeId) {
      setOrg_type_id(decrytedOrgTypeId);
    }
    if (!decryptedSiteId) {
      swal('Please select a Site or Organization', { icon: 'error' });
      redirect('/organization');
    }
  }, []);

  // const [currentfiles, setCurrentfiles] = useState<any>('');
  const [currentTrue, setCurrentTrue] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await refreshToken();
        setLoading(true);
        if (site_id && org_id && org_type_id) {
          const data: any = await allCurrentfiles(site_id, org_id, org_type_id);

          if (data.data.length >= 0) {
            setFolder(data.data);
          }
          // if (data.data.length >= 0) {
          //   setCurrentfiles(data && data.data.filter((i: { folder: string; }) => i.folder == "Litmus_Edge"))
          // }
          setLoading(false);
        }
        // else{
        //   setLoading(false)
        // }
      } catch (error: any) {
        setLoading(false);
      }
    };
    fetchData();
  }, [org_id, org_type_id, site_id]);

  function handlefolderclick(folder: any) {
    setInnerFolder(folder.data);
    setSelectedFolder(folder);
  }
  useEffect(() => {
    if (folder) {
      handlefolderclick(folder[0]);
      setCurrentTrue(true);
    }
  }, [folder]);

  useEffect(() => {
    if (innerFolder) {
      setFilteredFiles(
        innerFolder?.filter((file: any) =>
          currentTrue ? file.status === 'current' : file.status === 'archive',
        ),
      );
    }
  }, [currentTrue, innerFolder]);
  return (
    <>
      {loading && <Loader />}
      {tokenVerify && (
        <>
          <div className='my-5'>
            <div className='grid grid-cols-12 gap-6'>
              <div className='xl:col-span-3 col-span-12'>
                <div className='box custom-box overflow-hidden'>
                  <div className='box-header !border-b-0'>
                    <div className='box-title'>Folders</div>
                  </div>
                  <div className='box-body !p-0'>
                    <ul className='list-group nft-list'>
                      {folder && folder.length > 0 ? (
                        folder.map((folder: any) => (
                          <>
                            <li
                              style={{ cursor: 'pointer' }}
                              key={folder.folder}
                              className={`list-group-item ${
                                selectedFolder === folder
                                  ? 'checkforactive'
                                  : ''
                              }`}
                              onClick={() => handlefolderclick(folder)}
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
                                  {folder?.folder}
                                </div>
                              </div>
                            </li>
                          </>
                        ))
                      ) : (
                        <>
                          <div className='col-md-12 w-100 mt-4'>
                            <p className='text-center'>No Products Found</p>{' '}
                          </div>
                          <></>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
              <div className='xl:col-span-9 col-span-12'>
                <div className='box custom-box'>
                  <div className='box-header justify-between'>
                    <div className='box-title'>
                      {currentTrue ? 'Current' : 'Archive'}
                    </div>
                    <div>
                      <button
                        type='button'
                        className={
                          currentTrue
                            ? 'ti-btn ti-btn-primary-full btn-wave !me-3'
                            : 'ti-btn ti-btn-secondary-full btn-wave !me-3'
                        }
                        onClick={() => {
                          setCurrentTrue(true);
                        }}
                      >
                        Current{' '}
                      </button>
                      <button
                        type='button'
                        className={
                          currentTrue
                            ? 'ti-btn ti-btn-secondary-full btn-wave'
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
                  <div className='box-body'>
                    <ul className='list-none crm-top-deals mb-0'>
                      {filteredFiles && filteredFiles.length > 0 ? (
                        filteredFiles?.map((files: any) => (
                          <>
                            <li className='mb-[0.9rem] p-4 hover:bg-light border dark:border-defaultborder/10 rounded-md relative"'>
                              <div className='flex items-center flex-wrap'>
                                <div className='me-2'>
                                  <span className='avatar avatar-rounded avatar-sm bg-primary p-1'>
                                    <i className='ri-file-line text-[1rem]  text-white'></i>
                                  </span>
                                </div>
                                <div className='flex-grow'>
                                  <p className='font-semibold mb-[1.4px]  text-[0.813rem]'>
                                    {files.FileName}
                                  </p>
                                  {/* <p className='text-[#8c9097] dark:text-white/50 text-[0.75rem]'>
                                    Size 16MB
                                  </p> */}
                                </div>
                                <div className='font-semibold text-[0.9375rem] '>
                                  {/* <a
                                      href={files.downloadLink}
                                      className='text-[1rem]  !w-[1.9rem] rounded-sm !h-[1.9rem] !leading-[1.9rem]  inline-flex items-center justify-center bg-primary'
                                    >
                                      <i className='ri-download-line  text-[.8rem]  text-white'></i>
                                    </a>
                                  </div>                                   */}
                                  {files.disabled === 'Y' ? (
                                    <a
                                      href={files.downloadLink}
                                      className='text-[1rem] !w-[1.9rem] rounded-sm !h-[1.9rem] !leading-[1.9rem] inline-flex items-center justify-center bg-primary'
                                    >
                                      <i className='ri-download-line text-[.8rem] text-white'></i>
                                    </a>
                                  ) : (
                                    <button
                                      disabled
                                      className='text-[1rem] !w-[1.9rem] rounded-sm !h-[1.9rem] !leading-[1.9rem] inline-flex items-center justify-center bg-gray-300'
                                    >
                                      <i className='ri-download-line text-[.8rem] text-white'></i>
                                    </button>
                                  )}
                                </div>
                              </div>
                            </li>
                          </>
                        ))
                      ) : (
                        <>
                          <div className='col-md-12 w-100 mt-4'>
                            <p className='text-center'>No Products Found</p>{' '}
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
