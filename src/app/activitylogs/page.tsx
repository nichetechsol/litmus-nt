/* eslint-disable react-hooks/exhaustive-deps */
'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from 'moment';
import { redirect } from 'next/navigation';
import React, {
  lazy,
  Suspense,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';

import { decryptData } from '@/helper/Encryption_Decryption';
import {
  getActivitiesByOrgId,
  getActivitiesBySiteID,
} from '@/supabase/activity';
import Loader from '@/utils/Loader/Loader';

// Lazy load ToastContainer
const LazyToastContainer = lazy(() =>
  import('react-toastify').then((module) => ({
    default: module.ToastContainer,
  })),
);

interface activitylogs {
  activity_type: string;
  activity_date: string;
  details: { filename: string };
  org_id: { name: string };
  site_id: { name: string };
  target_user_role: any;
  user_id: { email: string; firstname: string; lastname: string };
  target_user_id: { email: string; firstname: string; lastname: string } | null;
}

export default function Activitylogs() {
  const [tokenVerify, setTokenVerify] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [CamePage, setCamePage] = useState<any>();

  const [activity_log, setActivity_log] = useState<activitylogs[] | null>(null);
  const [org_id, setorg_id] = useState<any>('');
  const [Site_id, setSite_id] = useState<any>('');

  const activitylogs = async () => {
    if (CamePage === '/orgdashboard') {
      try {
        if (org_id) {
          setLoading(true);
          const data: any = await getActivitiesByOrgId({
            orgId: org_id,
            start: 0,
            end: 20,
            limit: 20,
          });
          setLoading(false);
          if (data) {
            setActivity_log(data.activities);
          } else {
            setLoading(false);
          }
        }
      } catch (error: any) {
        // console.error('Error fetching organization details:', error.message);
      }
    }
    if (CamePage === '/sitedashboard') {
      try {
        if (Site_id) {
          setLoading(true);
          const data: any = await getActivitiesBySiteID({
            siteID: Site_id,
            start: 0,
            end: 20,
            limit: 20,
          });
          setLoading(false);
          if (data) {
            setActivity_log(data.activities);
          } else {
            setLoading(false);
          }
        }
      } catch (error: any) {
        // console.error('Error fetching organization details:', error.message);
      }
    }
  };

  useEffect(() => {
    activitylogs();
  }, [org_id, Site_id, CamePage]);

  useEffect(() => {
    const decryptedOrgId = decryptData(localStorage.getItem('org_id'));
    const decryptedSiteId = decryptData(localStorage.getItem('site_id'));
    const decryptedActivityLogComeFrom = decryptData(
      localStorage.getItem('ActivityLogs'),
    );
    setorg_id(decryptedOrgId);
    setSite_id(decryptedSiteId);
    setCamePage(decryptedActivityLogComeFrom);
  }, [CamePage]);

  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('sb-emsjiuztcinhapaurcrl-auth-token');
      if (!token) {
        setTokenVerify(false);
        redirect('/');
      } else {
        setTokenVerify(true);
      }
    }
  }, []);

  return (
    <>
      {loading && <Loader />}
      {tokenVerify && (
        <>
          <Suspense fallback={<Loader />}>
            <LazyToastContainer />
          </Suspense>
          {activity_log && activity_log.length > 0 && (
            <div className='xxl:col-span-12 xl:col-span-12 col-span-12  my-[1.5rem] '>
              <div className='box overflow-hidden'>
                <div className='box-header justify-between'>
                  <div className='box-title'>Activity Logs</div>
                </div>
                <div className='box-body !p-0'>
                  <div className='table-responsive'>
                    <table className='table table-hover whitespace-nowrap min-w-full'>
                      <tbody>
                        {activity_log.map(
                          (activity, index) =>
                            (activity?.activity_type === 'create_site' ||
                              activity?.activity_type === 'add_user' ||
                              activity?.activity_type === 'remove_user' ||
                              activity?.activity_type === 'add_licence' ||
                              activity?.activity_type === 'download_file') && (
                              <tr
                                className='border hover:bg-gray-100 dark:hover:bg-light dark:border-defaultborder/10 border-defaultborder !border-x-0'
                                key={index}
                              >
                                <th scope='col'>
                                  <div className='flex items-center'>
                                    <div>
                                      <p className='font-semibold mb-0'>
                                        {activity?.activity_type ===
                                        'create_site'
                                          ? `${
                                              activity.user_id.firstname &&
                                              activity.user_id.lastname
                                                ? activity.user_id.firstname +
                                                  ' ' +
                                                  activity.user_id.lastname
                                                : activity.user_id.email
                                            } created a new site named ${
                                              activity.site_id.name
                                            } within the organization '${
                                              activity.org_id.name
                                            }'`
                                          : activity?.activity_type ===
                                            'add_user'
                                          ? `${
                                              activity.user_id.firstname &&
                                              activity.user_id.lastname
                                                ? activity.user_id.firstname +
                                                  ' ' +
                                                  activity.user_id.lastname
                                                : activity.user_id.email
                                            } added a new user named '${
                                              activity?.target_user_id
                                                ?.firstname &&
                                              activity.target_user_id.lastname
                                                ? activity.target_user_id
                                                    .firstname +
                                                  ' ' +
                                                  activity.target_user_id
                                                    .lastname
                                                : activity?.target_user_id
                                                    ?.email
                                            }' within the site '${
                                              activity.site_id.name
                                            }'`
                                          : activity?.activity_type ===
                                            'remove_user'
                                          ? `${
                                              activity.user_id.firstname &&
                                              activity.user_id.lastname
                                                ? activity.user_id.firstname +
                                                  ' ' +
                                                  activity.user_id.lastname
                                                : activity.user_id.email
                                            } removed a user named '${
                                              activity?.target_user_id
                                                ?.firstname &&
                                              activity.target_user_id.lastname
                                                ? activity.target_user_id
                                                    .firstname +
                                                  ' ' +
                                                  activity?.target_user_id
                                                    ?.lastname
                                                : activity?.target_user_id
                                                    ?.email
                                            }' within the site '${
                                              activity.site_id.name
                                            }'`
                                          : activity?.activity_type ===
                                            'add_licence'
                                          ? `${
                                              activity.user_id.firstname &&
                                              activity.user_id.lastname
                                                ? activity.user_id.firstname +
                                                  ' ' +
                                                  activity.user_id.lastname
                                                : activity.user_id.email
                                            } added a new license within the organization ${
                                              activity.org_id.name
                                            }`
                                          : activity?.activity_type ===
                                            'download_file'
                                          ? `${
                                              activity.user_id.firstname &&
                                              activity.user_id.lastname
                                                ? activity.user_id?.firstname +
                                                  ' ' +
                                                  activity.user_id?.lastname
                                                : activity.user_id.email
                                            }  downloaded a file named '${activity
                                              .details
                                              ?.filename}' within the site '${
                                              activity.site_id.name
                                            }'`
                                          : ''}
                                      </p>
                                    </div>
                                  </div>
                                </th>
                                <td className='f-end'>
                                  {activity
                                    ? moment(activity.activity_date).format(
                                        'MM/DD/YYYY HH:mm',
                                      )
                                    : ''}
                                </td>
                              </tr>
                            ),
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
