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
  const [Siteactivity_log, setSiteActivity_log] = useState<
    activitylogs[] | null
  >(null);

  const [totalCount, setTotalCount] = useState(0);

  const [org_id, setorg_id] = useState<any>('');
  const [Site_id, setSite_id] = useState<any>('');
  const [site_name, setSite_name] = useState<any>('');
  const [name, setName] = useState<string>('');
  const [orgName, setorgName] = useState<any>('');
  const [hasMore, setHasMore] = useState(true); // Flag to indicate more data available
  const [start, setStart] = useState(0);

  useEffect(() => {
    const decryptedOrgId = decryptData(localStorage.getItem('org_id'));
    const decryptedSiteId = decryptData(localStorage.getItem('site_id'));
    const decryptedOrgName = decryptData(localStorage.getItem('org_name'));
    const sitename = decryptData(localStorage.getItem('site_name'));
    const decryptedActivityLogComeFrom = decryptData(
      localStorage.getItem('ActivityLogs'),
    );
    setorg_id(decryptedOrgId);
    setSite_id(decryptedSiteId);
    setCamePage(decryptedActivityLogComeFrom);
    setorgName(decryptedOrgName);
    setSite_name(sitename);
  }, [CamePage]);
  const activitylogs = async () => {
    try {
      setLoading(true);
      let data: any;
      let sitedata: any;

      if (CamePage === '/orgdashboard') {
        setName(orgName);
        data = await getActivitiesByOrgId({
          orgId: org_id,
          start: start,
          end: start + 20, // Fetch next 20 records
          limit: 20,
        });
      } else if (CamePage === '/sitedashboard') {
        setName(site_name);

        sitedata = await getActivitiesBySiteID({
          siteID: Site_id,
          start: start,
          end: start + 20, // Fetch next 20 records
          limit: 20,
        });
      }
      setLoading(false);

      if (sitedata) {
        setSiteActivity_log((prevLogs) => [
          ...(prevLogs || []),
          ...sitedata.activities,
        ]);

        setTotalCount(sitedata.total_count); // Update total count from API response
        setStart(start + 20); // Update start offset for next batch
        if (start + 20 >= data.total_count) {
          setHasMore(false); // No more data to load
        }
      }

      if (data) {
        setActivity_log((prevLogs) => [
          ...(prevLogs || []),
          ...data.activities,
        ]);
        setTotalCount(data.total_count); // Update total count from API response
        setStart(start + 20); // Update start offset for next batch
        if (start + 20 >= data.total_count) {
          setHasMore(false); // No more data to load
        }
      }
    } catch (error) {
      setLoading(false);
      // Handle error
    }
  };

  useEffect(() => {
    activitylogs();
  }, [org_id, Site_id, CamePage]); // Initial load

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

  // lazy loading

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight && hasMore) {
        if (activity_log && activity_log.length < totalCount) {
          activitylogs();
        }
        if (Siteactivity_log && Siteactivity_log.length < totalCount) {
          activitylogs();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [Siteactivity_log, hasMore, CamePage, activity_log]); // Add `CamePage` to dependencies if needed

  const orgActivitylog = () => {
    return (
      <div className='box-body !p-0'>
        <div className='table-responsive'>
          <table className='table table-hover whitespace-nowrap min-w-full'>
            <tbody>
              {activity_log && activity_log.length > 0
                ? activity_log.map(
                    (activity, index) =>
                      (activity?.activity_type === 'create_org' ||
                        activity?.activity_type === 'add_user' ||
                        activity?.activity_type === 'remove_user' ||
                        activity?.activity_type === 'create_site' ||
                        activity?.activity_type === 'download_file') && (
                        <tr
                          className='border  hover:bg-gray-100 dark:hover:bg-light dark:border-defaultborder/10 border-defaultborder !border-x-0'
                          key={index}
                        >
                          <th scope='col'>
                            <div className='flex items-center '>
                              {/* <img src={idx.src} alt="" className="avatar avatar-md p-1 bg-light avatar-rounded me-2 !mb-0" /> */}
                              <div>
                                <p className='font-semibold mb-0 	 text-wrap'>
                                  {activity?.activity_type === 'create_org'
                                    ? `${
                                        activity?.user_id?.firstname &&
                                        activity?.user_id?.lastname
                                          ? activity?.user_id?.firstname +
                                            ' ' +
                                            activity?.user_id?.lastname
                                          : activity?.user_id?.email
                                      } created a new org. named '${activity
                                        ?.org_id?.name}'`
                                    : activity?.activity_type === 'add_user'
                                    ? `${
                                        activity?.user_id?.firstname &&
                                        activity?.user_id?.lastname
                                          ? activity?.user_id?.firstname +
                                            ' ' +
                                            activity?.user_id?.lastname
                                          : activity?.user_id?.email
                                      } added a new user named '${
                                        activity?.target_user_id?.firstname &&
                                        activity?.target_user_id?.lastname
                                          ? activity?.target_user_id
                                              ?.firstname +
                                            ' ' +
                                            activity?.target_user_id?.lastname
                                          : activity?.target_user_id?.email
                                      }' within the organization ${activity
                                        ?.org_id.name}`
                                    : activity?.activity_type === 'remove_user'
                                    ? `${
                                        activity?.user_id?.firstname &&
                                        activity?.user_id?.lastname
                                          ? activity?.user_id?.firstname +
                                            ' ' +
                                            activity?.user_id?.lastname
                                          : activity?.user_id?.email
                                      } removed a user named '${
                                        activity?.target_user_id?.firstname &&
                                        activity?.target_user_id.lastname
                                          ? activity?.target_user_id.firstname +
                                            ' ' +
                                            activity?.target_user_id?.lastname
                                          : activity?.target_user_id?.email
                                      }' within the organization ${activity
                                        ?.org_id?.name}`
                                    : activity?.activity_type === 'create_site'
                                    ? `${
                                        activity?.user_id?.firstname &&
                                        activity?.user_id?.lastname
                                          ? activity?.user_id?.firstname +
                                            ' ' +
                                            activity?.user_id?.lastname
                                          : activity?.user_id?.email
                                      } created a new site named ${activity
                                        ?.site_id
                                        ?.name} within the organization '${activity
                                        ?.org_id?.name}'`
                                    : // : activity?.activity_type ===
                                    //   'add_licence'
                                    // ? `${
                                    //     activity.user_id
                                    //       .firstname &&
                                    //     activity.user_id
                                    //       .lastname
                                    //       ? activity.user_id
                                    //           .firstname +
                                    //         ' ' +
                                    //         activity.user_id
                                    //           .lastname
                                    //       : activity.user_id
                                    //           .email
                                    //   } added a new license within the organization ${
                                    //     activity.org_id.name
                                    //   }`
                                    activity?.activity_type === 'download_file'
                                    ? `${
                                        activity?.user_id?.firstname &&
                                        activity?.user_id?.lastname
                                          ? activity?.user_id?.firstname +
                                            ' ' +
                                            activity?.user_id?.lastname
                                          : activity?.user_id?.email
                                      }  downloaded a file named '${activity
                                        ?.details
                                        ?.filename}' within the site '${activity
                                        ?.org_id.name}'`
                                    : ''}
                                </p>
                              </div>
                            </div>
                          </th>

                          <td className='f-end'>
                            {/* {activity.activity_date.split('T')[0]} */}
                            {activity
                              ? moment(activity.activity_date).format(
                                  'MM/DD/YYYY HH:mm',
                                )
                              : ''}
                          </td>
                        </tr>
                      ),
                  )
                : null}
              {/* {activity_log && activity_log.length == 0 && (
                            <>
                              <tr>
                                <div className='col-md-12 w-100 mt-4'>
                                  <p className='text-center'>No Log Found</p>{' '}
                                </div>
                              </tr>
                            </>
                          )} */}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  const SiteAcitvitylog = () => {
    return (
      <div className='box-body !p-0'>
        <div className='table-responsive'>
          <table className='table table-hover whitespace-nowrap min-w-full'>
            <tbody>
              {Siteactivity_log && Siteactivity_log.length > 0 ? (
                Siteactivity_log.map(
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
                                {activity?.activity_type === 'create_site'
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
                                  : activity?.activity_type === 'add_user'
                                  ? `${
                                      activity.user_id.firstname &&
                                      activity.user_id.lastname
                                        ? activity.user_id.firstname +
                                          ' ' +
                                          activity.user_id.lastname
                                        : activity.user_id.email
                                    } added a new user named '${
                                      activity?.target_user_id?.firstname &&
                                      activity?.target_user_id?.lastname
                                        ? activity?.target_user_id?.firstname +
                                          ' ' +
                                          activity?.target_user_id?.lastname
                                        : activity?.target_user_id?.email
                                    }' within the site '${
                                      activity.site_id.name
                                    }'`
                                  : activity?.activity_type === 'remove_user'
                                  ? `${
                                      activity.user_id.firstname &&
                                      activity.user_id.lastname
                                        ? activity.user_id.firstname +
                                          ' ' +
                                          activity.user_id.lastname
                                        : activity.user_id.email
                                    } removed a user named '${
                                      activity?.target_user_id?.firstname &&
                                      activity?.target_user_id?.lastname
                                        ? activity.target_user_id.firstname +
                                          ' ' +
                                          activity?.target_user_id?.lastname
                                        : activity?.target_user_id?.email
                                    }' within the site '${
                                      activity.site_id.name
                                    }'`
                                  : activity?.activity_type === 'add_licence'
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
                                  : activity?.activity_type === 'download_file'
                                  ? `${
                                      activity.user_id.firstname &&
                                      activity.user_id.lastname
                                        ? activity.user_id?.firstname +
                                          ' ' +
                                          activity.user_id?.lastname
                                        : activity.user_id.email
                                    }  downloaded a file named '${activity
                                      .details?.filename}' within the site '${
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
                          {/* {activity.activity_date.split('T')[0]} */}
                        </td>
                      </tr>
                    ),
                )
              ) : (
                <>
                  <div className='col-md-12 w-100 mt-4'>
                    <p className='text-center'>No Log Found</p>{' '}
                  </div>
                  <></>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

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
                  <div className='box-title'>Activity Logs of {name}</div>
                </div>
                {CamePage == '/orgdashboard' ? orgActivitylog() : ''}
              </div>
            </div>
          )}
          {Siteactivity_log && Siteactivity_log.length > 0 && (
            <div className='xxl:col-span-12 xl:col-span-12 col-span-12  my-[1.5rem] '>
              <div className='box overflow-hidden'>
                <div className='box-header justify-between'>
                  <div className='box-title'>Activity Logs of {name}</div>
                </div>
                {CamePage == '/sitedashboard' ? SiteAcitvitylog() : ''}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
