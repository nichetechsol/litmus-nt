/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client';

import { redirect } from 'next/navigation';
import React, { useEffect, useLayoutEffect, useState } from 'react';

import { decryptData } from '@/helper/Encryption_Decryption';
import { logActivity } from '@/supabase/activity';
import { refreshToken } from '@/supabase/session';
import { listOfAllSolutions } from '@/supabase/solutions';
import Loader from '@/utils/Loader/Loader';

const Page = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [tokenVerify, setTokenVerify] = useState(false);
  const [folder, setFolder] = useState<any>([]);
  const [subFolders, setSubFolders] = useState<any>([]);
  const [selectedFolder, setSelectedFolder] = useState<any>(null);
  const [selectedSubFolder, setSelectedSubFolder] = useState<any>(null);
  const [setFiles] = useState<any>([]);

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
    const fetchData = async () => {
      try {
        await refreshToken();
        setLoading(true);
        const data: any = await listOfAllSolutions();

        if (data.data.length >= 0) {
          setFolder(data.data);
        }
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const [user_id, setuser_id] = useState<any>('');
  const [org_id, setorg_id] = useState<any>('');
  const [site_id, setsite_id] = useState<any>('');
  useEffect(() => {
    const encryptedUserId = localStorage.getItem('user_id');
    const encryptedOrgId = localStorage.getItem('org_id');
    const encryptedSiteId = localStorage.getItem('site_id');

    const decryptedUserId = decryptData(encryptedUserId);
    const decryptedOrgId = decryptData(encryptedOrgId);
    const decryptedSiteId = decryptData(encryptedSiteId);
    if (decryptedOrgId) {
      setorg_id(decryptedOrgId);
    }

    if (decryptedSiteId) {
      setsite_id(decryptedSiteId);
    }

    if (decryptedUserId) {
      setuser_id(decryptedUserId);
    }
  }, []);

  function handleFolderClick(folder: any) {
    setSelectedFolder(folder);
    setSubFolders(folder.data);
    setSelectedSubFolder(null);
    setFiles([]);
  }

  function handleSubFolderClick(subFolder: any) {
    setSelectedSubFolder(subFolder);
    setFiles(subFolder.files);
    setfile3(subFolder.files);
  }
  useEffect(() => {
    if (subFolders.length < 1 && subFolders.length > 0) {
      setSelectedSubFolder(subFolders[0]);
      setFiles(subFolders[0].files);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subFolders]);

  const [file3, setfile3] = useState<any>([]);

  useEffect(() => {
    // if (subFolders.length < 1 && subFolders.length > 0) {
    //   setSelectedSubFolder(subFolders[0]);
    //   setFiles(subFolders[0].files);
    // }
    if (subFolders && subFolders[0]?.subFolder == '') {
      setfile3(subFolders[0]?.files);
    }
    // if(folder.length>0)
    //   {
    //     if(folder[0].data[0].subFolder=="")
    //       {
    //         setfile3()
    //       }
    //   }
  }, [subFolders, file3, folder]);

  const handleDownload = async (fileName: string) => {
    //
    const data = {
      org_id: org_id,
      site_id: site_id,
      user_id: user_id,
      activity_type: 'download_file',
      details: { filename: fileName },
    };
    const response = await logActivity(data);
    if (response) {
      // fetchData8()
    }
  };
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
                      {folder.length > 0 ? (
                        folder.map((folder: any) => (
                          <li
                            style={{ cursor: 'pointer' }}
                            key={folder.folder}
                            className={`list-group-item ${
                              selectedFolder === folder ? 'checkforactive' : ''
                            }`}
                            onClick={() => handleFolderClick(folder)}
                          >
                            <div className='flex items-center gap-2'>
                              <div>
                                <span className='avatar avatar-rounded avatar-sm bg-primary p-1'>
                                  <i className='ri-folder-line text-[1rem] text-white'></i>
                                </span>
                              </div>
                              <div className='text-[.875rem] font-semibold my-auto '>
                                {folder.folder}
                              </div>
                            </div>
                          </li>
                        ))
                      ) : (
                        <div className='col-md-12 w-100 mt-4'>
                          <p className='text-center'>No Solutions Found</p>
                        </div>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
              <div className='xl:col-span-9 col-span-12'>
                <div className='box custom-box'>
                  <div className='box-body'>
                    {subFolders && subFolders[0]?.subFolder != '' ? (
                      <>
                        <div className='box-header justify-between'>
                          <div className='box-title'>Subfolders</div>
                        </div>
                        <ul className='list-none crm-top-deals mb-0'>
                          {subFolders.map((subFolder: any) => (
                            <button
                              key={subFolder.subFolder}
                              className={`mb-[0.9rem] p-4 hover:bg-light border dark:border-defaultborder/10 rounded-md relative ${
                                selectedSubFolder === subFolder
                                  ? 'checkforactive'
                                  : ''
                              }`}
                              style={{ cursor: 'pointer' }}
                              onClick={() => handleSubFolderClick(subFolder)}
                            >
                              {subFolder.subFolder}
                              {/* {subFolder.subFolder} */}
                              {/* {subFolder.files.map((file: any, index: any) => (<p key={index}>{file.FileName}</p>))} */}
                            </button>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <>
                        <div className='box-header justify-between'>
                          <div className='box-title'>FilesName</div>
                        </div>
                        <ul className='list-none crm-top-deals mb-0'>
                          {file3?.length > 0
                            ? file3?.map((file: any, index: number) => (
                                <li
                                  key={index}
                                  className='mb-[0.9rem] p-4 hover:bg-light border dark:border-defaultborder/10 rounded-md relative'
                                >
                                  <div className='flex items-center flex-wrap'>
                                    <div className='me-2'>
                                      <span className='avatar avatar-rounded avatar-sm bg-primary p-1'>
                                        <i className='ri-file-line text-[1rem] text-white'></i>
                                      </span>
                                    </div>
                                    <div className='flex-grow'>
                                      <p className='font-semibold mb-[1.4px] text-[0.813rem]'>
                                        {file.FileName}
                                      </p>
                                    </div>
                                    <div className='font-semibold text-[0.9375rem]'>
                                      <a
                                        onClick={() => {
                                          handleDownload(file.FileName);
                                        }}
                                        href={file.downloadLink}
                                        className='text-[1rem] !w-[1.9rem] rounded-sm !h-[1.9rem] !leading-[1.9rem] inline-flex items-center justify-center bg-primary'
                                      >
                                        <i className='ri-download-line text-[.8rem] text-white'></i>
                                      </a>
                                    </div>
                                  </div>
                                </li>
                              ))
                            : null}
                          {file3?.length === 0 && (
                            <div className='col-md-12 w-100 mt-4'>
                              <p className='text-center'>No Files Found</p>
                            </div>
                          )}
                        </ul>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* <div className='xl:col-span-9 col-span-12'>
                <div className='box custom-box'>
                  {subFolders && subFolders.length > 1 && (
                    <div className='box-header justify-between'>
                      <div className='box-title'>Subfolders</div>
                    </div>
                  )}

                  <div className='box-body'>
                    <ul className='list-none crm-top-deals mb-0'>
                      {subFolders.length > 1 &&
                        subFolders.map((subFolder: any) => (
                          <button
                            key={subFolder.subFolder}
                            className={`mb-[0.9rem] p-4 hover:bg-light border dark:border-defaultborder/10 rounded-md relative ${selectedSubFolder === subFolder
                              ? 'checkforactive'
                              : ''
                              }`}
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleSubFolderClick(subFolder)}
                          >
                            {subFolder.subFolder}
                          </button>
                        ))}
                    </ul>
                    <ul className='list-none crm-top-deals mb-0'>
                      {
                        files.length > 0
                          ? files.map((file: any, index: number) => (
                            <li
                              key={index}
                              className='mb-[0.9rem] p-4 hover:bg-light border dark:border-defaultborder/10 rounded-md relative'
                            >
                              <div className='flex items-center flex-wrap'>
                                <div className='me-2'>
                                  <span className='avatar avatar-rounded avatar-sm bg-primary p-1'>
                                    <i className='ri-file-line text-[1rem] text-white'></i>
                                  </span>
                                </div>
                                <div className='flex-grow'>
                                  <p className='font-semibold mb-[1.4px] text-[0.813rem]'>
                                    {file.FileName}
                                  </p>
                                </div>
                                <div className='font-semibold text-[0.9375rem]'>
                                  {file.downloadLink ? (
                                    <a
                                      href={file.downloadLink}
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
                          ))
                          : null
                        // <div className='col-md-12 w-100 mt-4'>
                        //   <p className='text-center'>No Files Found</p>
                        // </div>
                      }
                    </ul>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Page;
