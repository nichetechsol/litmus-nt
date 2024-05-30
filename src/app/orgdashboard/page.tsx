"use client"
import { Customers, Deals, Dealsstatistics, Earned, Ratio, Revenue, Revenueanalytics, Sourcedata, Target } from '@/shared/data/dashboards/crmdata';
import { modal1, modal10, modal11, modal12, modal13, modal2, modal3, modal4, modal5, modal6, modal7, modal8, modal9 } from '@/shared/data/prism/advance-uiprism'
import Pageheader from '@/shared/layout-components/page-header/pageheader'
import Seo from '@/shared/layout-components/seo/seo'
import Showcode from '@/shared/layout-components/showcode/showcode'
import Link from 'next/link'

// import imgMap from '../../../public/assets/images/map.png'
import { Candidatesdata, Recentemployers, Registersbycountry, Subscriptions, TopCompanies } from '@/shared/data/dashboards/jobsdata'


import { redirect , useRouter } from 'next/navigation'
import React, { Fragment, Key, useEffect, useLayoutEffect, useRef, useState } from "react";
import Loader from '@/utils/Loader/Loader';
import swal from "sweetalert";
import Pagination from "react-paginate";
import * as Yup from "yup";
import { emailSchema, nameSchema, roleSchema } from '@/helper/ValidationHelper';
import { orgDashboardCounts, orgEntitlementList, orgUserList } from '@/supabase/dashboard';
import { getUserRole } from '@/supabase/org_details';
import { addUserToOrganization, modifyUserOfOrganization, removeUserFromOrganization } from '@/supabase/org_user';
interface OrgUser {
  id: Key | null | undefined;
  firstname: any;
  lastname: any;
  email: React.ReactNode;
  role: React.ReactNode;
}
interface Entitlement {
  id: number;
  entitlementName: string;
  entitlementValue: number;
  created_at: string;
  entitlement_name_id: number;
  entitlement_value_id: number;
  licence_tier_id: number;
  org_id: number;
  site_id: number;
  support_level_id: number;
}
interface roles {
  id: string;
  name: string;
  created_at: any;
}
const validationSchema = Yup.object().shape({
  email: emailSchema,
  firstName: nameSchema,
  lastName: nameSchema,
  role: roleSchema,
});
const orgDashboard = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [tokenVerify, setTokenVerify] = useState(false);

  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('sb-emsjiuztcinhapaurcrl-auth-token')
      if (!token) {
        setTokenVerify(false)
        redirect("/")
      } else {
        setTokenVerify(true)
      }
    }

  }, [])
  const [user_id, setuser_id] = useState("")
  const [user_fname, setUser_fname] = useState("")
  const [user_lname, setUserlname] = useState("")
  const [user_role, setUserrole] = useState("");
  const [org_id, setorg_id] = useState("");
  const [orgName, setorgName] = useState("");
  useEffect(() => {
    const userid: any = localStorage.getItem("user_id");
    const userfname: any = localStorage.getItem("user_fname");
    const userlname: any = localStorage.getItem("user_lname");
    const userrole: any = localStorage.getItem("user_role");
    const org_id:any = localStorage.getItem("org_id");
  const orgName:any = localStorage.getItem("org_name");
    setuser_id(userid)
    setUser_fname(userfname);
    setUserlname(userlname);
    setUserrole(userrole);
    setorg_id(org_id);
    setorgName(orgName);
  }, [])

  // const user_id = localStorage.getItem('user_id');
  const [activePage, setActivePage] = useState(1);
  const [perPage] = useState(10); // Number of items per page
  const [totalItemsCount, setTotalItemsCount] = useState(0);

  
  const closeModalButtonRef = useRef<HTMLButtonElement>(null);


  const [orgData, setOrgData] = useState<{ entitlementCount: number, errorCode: number, sitesDetailCount: number, userCount: number } | null>(null);
  const [orgUserData, setOrgUserData] = useState<OrgUser[]>([]);
  const [entitlementListData, setEntitlementListData] = useState<Entitlement[] | null>(null);

  const [activePage2, setActivePage2] = useState(1);
  const [perPage2] = useState(10); // Number of items per page
  const [totalItemsCount2, setTotalItemsCount2] = useState(0);
  useEffect(()=>
    {
      if(orgUserData)
      {
        console.log("orguserdataaaprerna",orgUserData)
      }
    },[orgUserData])
    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true)
          if(org_id){
            const data:any = await orgDashboardCounts(org_id);
            setLoading(false)
            if (data) {
              setOrgData(data.data);
              console.log('orgDashboardCounts',data);
    
            } else {
              console.log("No organization details found.");
            }
          
          }
          
          
        } catch (error: any) {
          console.error("Error fetching organization details:", error.message);
        }
      };
  
      fetchData();
    }, [org_id])
    const fetchData2 = async () => {
      try {
        setLoading(true)
        // const data :any = await orgUserList(org_id);
        setLoading(false)
        // if (data) {
          // setOrgUserData(data.data);
          // console.log('orgUserList', data.data);
        // setLoading(true)
        const start : any= (activePage - 1) * perPage; // Calculate start index
        const end : any= start + perPage - 1; // Calculate end index
       if(org_id){
        const data : any= await orgUserList(org_id, start, end,""); 
      console.log("ssssss",data)
        setLoading(false);
        
        if (data) {          
          setOrgUserData(data.data.userList);
          setTotalItemsCount(data.data?.totalCount); // Set total items count for pagination
          console.log("orgUserList", data);
        } else {
          console.log("No organization details found.");
        }
        
        
       }
      } catch (error: any) {
        console.error("Error fetching organization details:", error.message);
      }
    };
    useEffect(() => {  
      fetchData2();
    }, [org_id,activePage]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true)
          const start : any= (activePage2 - 1) * perPage2; // Calculate start index
        const end : any= start + perPage2 - 1; // Calculate end index
        if(org_id){
          const data :any = await orgEntitlementList(org_id,start,end);
          console.log("..EntitlementList..",data);
          
          setLoading(false)
          if (data ) {
           debugger
           
            setEntitlementListData(data?.data?.entitlements);
          setTotalItemsCount2(data.data?.totalCount); // Set total items count for pagination
  
            console.log('orgEntitlementList', data.data);
  
          } else {
            console.log("No organization details found.");
          }
        }
        } catch (error: any) {
          console.error("Error fetching organization details:", error.message);
        }
      };
  
      fetchData();
    }, [org_id,activePage2]);
    const [changeFlage, setChangeFlage] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [role, setRole] = useState("");
  const [userNameId , setUserNameId] = useState("")
  const [roleError, setRoleError] = useState("");
  // const [loading, setLoading] = useState<boolean>(false);
  const [roles, setRoles] = useState<roles[] | null>(null);
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        setLoading(true)

        const result1:any = await getUserRole(); // Replace with your actual API call
        console.log("getUserRole", result1.data);
        if (result1 && result1.data) {
        setLoading(false)

          setRoles(result1.data);
        }
      } catch (error: any) {
        console.error("Error fetching roles:", error.message);
      }
    };
    console.log('roles', roles)
    fetchRoles();
  }, []);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value.trim();
    setEmail(newEmail);

    emailSchema.validate(newEmail)
      .then(() => setEmailError(''))
      .catch((err: Yup.ValidationError) => setEmailError(err.message));
  };
  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFirstName = e.target.value.trim().replace(/[^a-zA-Z]/g, '');
    setFirstName(newFirstName);

    nameSchema.validate(newFirstName)
      .then(() => setFirstNameError(''))
      .catch((err: Yup.ValidationError) => setFirstNameError(err.message));
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLastName = e.target.value.trim().replace(/[^a-zA-Z]/g, '');
    setLastName(newLastName);

    nameSchema.validate(newLastName)
      .then(() => setLastNameError(''))
      .catch((err: Yup.ValidationError) => setLastNameError(err.message));
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value;
    setRole(newRole);

    roleSchema.validate(newRole)
      .then(() => setRoleError(''))
      .catch((err: Yup.ValidationError) => setRoleError(err.message));
  };
  const handleEdit = ( user :any) => {
    setChangeFlage(false);
    setUserNameId(user.id);
    setEmail(user.email);
    setFirstName(user.firstname);
    setLastName(user.lastname);
    setRole(user.role_id);
  } 
  const handleFiledClear = () => {
  
    setEmailError("");
    setFirstNameError("");
    setLastNameError("");
    setRoleError("");
  } 

  const handleAddUser = () => {

    setEmail("");
    setFirstName("");
    setLastName("");
    setRole("");
    setChangeFlage(true)
  }
  const handleDelete = (id: any) => {
    swal({
      title: "Confirm Delete",
      text: "Are you sure you want to delete?",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    }).then(async (willDelete: any) => {
      if (willDelete) {
        try {
          const response = await removeUserFromOrganization(id);
          if (response.errorCode === 0) {
            swal("Record deleted!", { icon: "success" });
            fetchData2();
            // Optionally, update your state or refetch data here
          } else {
            swal("Error deleting record!", { icon: "error" });
          }
        } catch (error) {
          swal("Unexpected error occurred!", { icon: "error" });
        }
      }
    });
  };
  const validateForm = async () => {
    try {
      await validationSchema.validate({ email, firstName, lastName, role, }, { abortEarly: false });
      setEmailError("");
      setFirstNameError("");
      setLastNameError("");
      setRoleError("");
      return true;
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const emailErrorMsg = err.inner.find(error => error.path === 'email')?.message || "";
        const firstNameErrorMsg = err.inner.find(error => error.path === 'firstName')?.message || "";
        const lastNameErrorMsg = err.inner.find(error => error.path === 'lastName')?.message || "";
        const roleErrorMsg = err.inner.find(error => error.path === 'role')?.message || "";

        setEmailError(emailErrorMsg);
        setFirstNameError(firstNameErrorMsg);
        setLastNameError(lastNameErrorMsg);
        setRoleError(roleErrorMsg);
      }
      return false;
    }
  };
  
  // const handleSubmit = async () => {
  //   const isValid = await validateForm();
  //   if (isValid) {
  //     setLoading(true);
  //     console.log(email, firstName, lastName, role , userNameId);

  //     setLoading(false);
  
      
 
  
  //     try {
  //       // setLoading(true);
  //       let result;   
  //       if (changeFlage) {
  //         const userData = {
  //           email: email,
  //           firstname: firstName,
  //           lastname: lastName,
  //           role_id : role,
  //           org_id : org_id,
  //         };
  //         result = await addUserToOrganization(userData);
  //       } else {
          
  //         const userData = { role_id: role, user_id: userNameId};
  //         result = await modifyUserOfOrganization(userData);
  //       }
  //       console.log("result", result);  
  //       if (result && result.data != null) {
  //         // setLoading(false);
          
  //       }
  //       if (closeModalButtonRef.current) {
  //         closeModalButtonRef.current.click();
  //       }
  //       fetchData2();
  //     } catch (error) {
  //       console.error("API call failed:", error);
  //       // setLoading(false); 
  //     }
  //   } else {
  //     console.log('isValid', isValid);
  //   }
  // };
  // const handleKeyPress = (e: React.KeyboardEvent) => {
  //   if (e.key === 'Enter') {
  //     handleSubmit();
  //   }
  // };
return(
  <>
  {loading && <Loader />}
  {tokenVerify && (
      <>
     <div className="md:flex block items-center justify-between my-[1.5rem] page-header-breadcrumb">
        <div>
          <p className="font-semibold text-[1.125rem] text-defaulttextcolor dark:text-defaulttextcolor/70 !mb-0 ">Dashboard ({orgName})</p>
          {/* <p className="font-normal text-[#8c9097] dark:text-white/50 text-[0.813rem]">Track your sales activity, leads and deals here.</p> */}
        </div>
       
      </div>
      <div className="grid grid-cols-12 gap-x-6">
        <div className="xxl:col-span-12 xl:col-span-12  col-span-12">
          <div className="grid grid-cols-12 gap-x-6">
            
            <div className="xxl:col-span-12  xl:col-span-12  col-span-12">
              <div className="grid grid-cols-12 gap-x-6">
                <div className="xxl:col-span-4 xl:col-span-6 col-span-12">
                  <div className="box overflow-hidden">
                    <div className="box-body">
                      <div className="flex items-top justify-between">
                        <div>
                          <span
                            className="!text-[0.8rem]  !w-[2.5rem] !h-[2.5rem] !leading-[2.5rem] !rounded-full inline-flex items-center justify-center bg-primary">
                            <i className="ti ti-users text-[1rem] text-white"></i>
                          </span>
                        </div>
                        <div className="flex-grow ms-4">
                          <div className="flex items-center justify-between flex-wrap">
                            <div>
                              <p className="text-[#8c9097] dark:text-white/50 text-[0.813rem] mb-0">Number of Sites</p>
                              <h4 className="font-semibold  text-[1.5rem] !mb-2 ">{orgData ? orgData.sitesDetailCount : 0}</h4>
                            </div>
                            
                          </div>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="xxl:col-span-4 xl:col-span-6 col-span-12">
                  <div className="box overflow-hidden">
                    <div className="box-body">
                      <div className="flex items-top justify-between">
                        <div>
                          <span
                            className="!text-[0.8rem]  !w-[2.5rem] !h-[2.5rem] !leading-[2.5rem] !rounded-full inline-flex items-center justify-center bg-secondary">
                            <i className="ti ti-wallet text-[1rem] text-white"></i>
                          </span>
                        </div>
                        <div className="flex-grow ms-4">
                          <div className="flex items-center justify-between flex-wrap">
                            <div>
                              <p className="text-[#8c9097] dark:text-white/50 text-[0.813rem] mb-0">Number of Users</p>
                              <h4 className="font-semibold text-[1.5rem] !mb-2 ">{orgData ? orgData.userCount : 0}</h4>
                            </div>
                          
                          </div>
                        
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="xxl:col-span-4 xl:col-span-6 col-span-12">
                  <div className="box overflow-hidden">
                    <div className="box-body">
                      <div className="flex items-top justify-between">
                        <div>
                          <span
                            className="!text-[0.8rem]  !w-[2.5rem] !h-[2.5rem] !leading-[2.5rem] !rounded-full inline-flex items-center justify-center bg-success">
                            <i className="ti ti-wave-square text-[1rem] text-white"></i>
                          </span>
                        </div>
                        <div className="flex-grow ms-4">
                          <div className="flex items-center justify-between flex-wrap">
                            <div>
                              <p className="text-[#8c9097] dark:text-white/50 text-[0.813rem] mb-0">No. of Entitlements</p>
                              <h4 className="font-semibold text-[1.5rem] !mb-2 ">{orgData ? orgData.entitlementCount : 0}</h4>
                            </div>
                            
                          </div>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                
              </div>
            </div>

         
              
              <div className="xxl:col-span-6 xl:col-span-6 col-span-6">
                <div className="box">
                  <div className="box-header flex justify-between">
                    <div className="box-title">
                    List Of Entitlement
                    </div>
                    {/* <div className="hs-dropdown ti-dropdown">
                      <Link aria-label="anchor" href="#!"
                        className="flex items-center justify-center w-[1.75rem] h-[1.75rem]  !text-[0.8rem] !py-1 !px-2 rounded-sm bg-light border-light shadow-none !font-medium"
                        aria-expanded="false">
                        <i className="fe fe-more-vertical text-[0.8rem]"></i>
                      </Link>
                      <ul className="hs-dropdown-menu ti-dropdown-menu hidden">
                        <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                          href="#!">Week</Link></li>
                        <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                          href="#!">Month</Link></li>
                        <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                          href="#!">Year</Link></li>
                      </ul>
                    </div> */}
                  </div>
                  <div className="box-body">
                    <ul className="list-none crm-top-deals mb-0">
                    {entitlementListData && entitlementListData.length>0? entitlementListData.map((entitlement) => (  
                    <li className="mb-[0.9rem]">
                        <div className="flex items-start flex-wrap">
                          
                          <div className="flex-grow">
                            <p className="font-semibold mb-[1.4px]  text-[0.813rem]">{entitlement.entitlementName}
                            </p>
  
                          </div>
                          <div className="font-semibold text-[0.9375rem] ">{entitlement.entitlementValue}</div>
                        </div>
                      </li>
                             )):<div className='col-md-12 w-100 mt-4'><p className='text-center'>No Data Found</p> </div>}
                      {/* <li className="mb-[0.9rem]">
                        <div className="flex items-start flex-wrap">
                         
                          <div className="flex-grow">
                            <p className="font-semibold mb-[1.4px]  text-[0.813rem]">Emigo Kiaren</p>
           
                          </div>
                          <div className="font-semibold text-[0.9375rem] ">$4,289</div>
                        </div>
                      </li>
                      <li className="mb-[0.9rem]">
                        <div className="flex items-top flex-wrap">
                        
                          <div className="flex-grow">
                            <p className="font-semibold mb-[1.4px]  text-[0.813rem]">Randy Origoan
                            </p>
                            
                          </div>
                          <div className="font-semibold text-[0.9375rem] ">$6,347</div>
                        </div>
                      </li>
                      <li className="mb-[0.9rem]">
                        <div className="flex items-top flex-wrap">
                        
                          <div className="flex-grow">
                            <p className="font-semibold mb-[1.4px]  text-[0.813rem]">George Pieterson
                            </p>
                    
                          </div>
                          <div className="font-semibold text-[0.9375rem] ">$3,894</div>
                        </div>
                      </li>
                      <li>
                        <div className="flex items-top flex-wrap">
                         
                          <div className="flex-grow">
                            <p className="font-semibold mb-[1.4px]  text-[0.813rem]">Kiara Advain</p>
                            
                          </div>
                          <div className="font-semibold text-[0.9375rem] ">$2,679</div>
                        </div>
                      </li> */}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="xxl:col-span-6 xl:col-span-6  col-span-12">
              <div className="box">
                <div className="box-header justify-between">
                  <div className="box-title">
                  Location Of Sites And Users
                  </div>
                  <div className="hs-dropdown ti-dropdown">
                    {/* <Link aria-label="anchor" href="#!"
                      className="flex items-center justify-center w-[1.75rem] h-[1.75rem] ! !text-[0.8rem] !py-1 !px-2 rounded-sm bg-light border-light shadow-none !font-medium"
                      aria-expanded="false">
                      <i className="fe fe-more-vertical text-[0.8rem]"></i>
                    </Link>
                    <ul className="hs-dropdown-menu ti-dropdown-menu hidden">
                      <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                        href="#!">Week</Link></li>
                      <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                        href="#!">Month</Link></li>
                      <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                        href="#!">Year</Link></li>
                    </ul> */}
                  </div>
                </div>
                <div className="box-body overflow-hidden">
                  <div className="leads-source-chart flex items-center justify-center">
                  {/* <img src={imgMap} /> */}
                    
                  </div>
                </div>
                {/* <div className="grid grid-cols-4 border-t border-dashed dark:border-defaultborder/10">
                  <div className="col !p-0">
                    <div className="!ps-4 p-[0.95rem] text-center border-e border-dashed dark:border-defaultborder/10">
                      <span className="text-[#8c9097] dark:text-white/50 text-[0.75rem] mb-1 crm-lead-legend mobile inline-block">Mobile
                      </span>
                      <div><span className="text-[1rem]  font-semibold">1,624</span>
                      </div>
                    </div>
                  </div>
                  <div className="col !p-0">
                    <div className="p-[0.95rem] text-center border-e border-dashed dark:border-defaultborder/10">
                      <span className="text-[#8c9097] dark:text-white/50 text-[0.75rem] mb-1 crm-lead-legend desktop inline-block">Desktop
                      </span>
                      <div><span className="text-[1rem]  font-semibold">1,267</span></div>
                    </div>
                  </div>
                  <div className="col !p-0">
                    <div className="p-[0.95rem] text-center border-e border-dashed dark:border-defaultborder/10">
                      <span className="text-[#8c9097] dark:text-white/50 text-[0.75rem] mb-1 crm-lead-legend laptop inline-block">Laptop
                      </span>
                      <div><span className="text-[1rem]  font-semibold">1,153</span>
                      </div>
                    </div>
                  </div>
                  <div className="col !p-0">
                    <div className="!pe-4 p-[0.95rem] text-center">
                      <span className="text-[#8c9097] dark:text-white/50 text-[0.75rem] mb-1 crm-lead-legend tablet inline-block">Tablet
                      </span>
                      <div><span className="text-[1rem]  font-semibold">679</span></div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
           
            <div className="xxl:col-span-12 xl:col-span-12 col-span-12">
              <div className="box custom-card">
                <div className="box-header justify-between">
                  <div className="box-title">
                   User Management
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <div>
                      {/* <input className="ti-form-control form-control-sm" type="text" placeholder="Search Here"
                        aria-label=".form-control-sm example" /> */}
                    </div>
                    <div className="hs-dropdown ti-dropdown">
                    {/* <Link href="#!" className="hs-dropdown-toggle py-2  px-3 ti-btn bg-primary text-white !font-medium w-full !mb-0" data-hs-overlay="#todo-compose"><i className="ri-add-circle-line !text-[1rem]"></i>Add Organization
                                </Link> */}
                                <div id="todo-compose" className="hs-overlay hidden ti-modal">
                                    <div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out">
                                        <div className="ti-modal-content">
                                            <div className="ti-modal-header">
                                                <h6 className="modal-title text-[1rem] font-semibold" id="mail-ComposeLabel">Add User</h6>
                                                <button type="button" className="hs-dropdown-toggle !text-[1rem] !font-semibold !text-defaulttextcolor" data-hs-overlay="#todo-compose">
                                                    <span className="sr-only">Close</span>
                                                    <i className="ri-close-line"></i>
                                                </button>
                                            </div>
                                            <div className="ti-modal-body !overflow-visible px-4">
                                                <div className="grid grid-cols-12 gap-2">
                                                    <div className="xl:col-span-12 col-span-12">
                                                        <label htmlFor="task-name" className="ti-form-label">Email</label>
                                                        <input type="text" className="form-control w-full" id="task-name" placeholder="Task Name" />
                                                    </div>

                                                    <div className="xl:col-span-12 col-span-12">
                                                        <label htmlFor="task-name" className="ti-form-label">First Name</label>
                                                        <input type="text" className="form-control w-full" id="task-name" placeholder="Task Name" />
                                                    </div>
                                                    <div className="xl:col-span-12 col-span-12">
                                                        <label htmlFor="task-name" className="ti-form-label">Last Name</label>
                                                        <input type="text" className="form-control w-full" id="task-name" placeholder="Task Name" />
                                                    </div>

                                                    <div className="xl:col-span-12 col-span-12">
                                                        <label htmlFor="task-name" className="ti-form-label">Role</label>
                                                        <select className='form-select'>
                                                            <option>No options</option>
                                                        </select>
                                                    
                                                        
                                                    </div>

                                               
                                                    
                                                   
                                                   
                                                </div>
                                            </div>
                                            <div className="ti-modal-footer">
                                                <button type="button"
                                                    className="hs-dropdown-toggle ti-btn  ti-btn-light align-middle"
                                                    data-hs-overlay="#todo-compose">
                                                    Cancel
                                                </button>
                                                <button type="button" className="ti-btn bg-primary text-white !font-medium">Add User</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                    </div>
                  </div>
                </div>
                <div className="box-body">
                  <div className="overflow-x-auto">
                    <table className="table min-w-full whitespace-nowrap table-hover border table-bordered">
                      <thead>
                        <tr className="border border-inherit border-solid dark:border-defaultborder/10">
                        
                          <th scope="col" className="!text-start !text-[0.85rem] min-w-[200px]">Name</th>
                          
                          <th scope="col" className="!text-start !text-[0.85rem]">Mail</th>
                          <th scope="col" className="!text-start !text-[0.85rem]">	Organization</th>
                          
                          <th scope="col" className="!text-start !text-[0.85rem]">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                      {orgUserData && orgUserData.length > 0 ? orgUserData.map((user) => (
                          <tr className="border border-inherit border-solid hover:bg-gray-100 dark:border-defaultborder/10 dark:hover:bg-light" key={Math.random()}>
                           
                            <td>
                              <div className="flex items-center font-semibold">
                                <span className="!me-2 inline-flex justify-center items-center">
                                  {/* <img src={idx.src} alt="img"
                                    className="w-[1.75rem] h-[1.75rem] leading-[1.75rem] text-[0.65rem]  rounded-full" /> */}
                                </span>   {`${user.firstname} ${user.lastname}`}{' '}
                              </div>
                            </td>
                            
                            <td>{user.email}</td>
                            <td>
                              <span className="!me-2 inline-flex justify-center items-center">{user.role}</span>
                            </td>
                            
                            <td>
                              <div className="flex flex-row items-center !gap-2 text-[0.9375rem]">
                                {/* <Link aria-label="anchor" href=""
                                  className="ti-btn ti-btn-icon ti-btn-wave !gap-0 !m-0 !h-[1.75rem] !w-[1.75rem] text-[0.8rem] bg-success/10 text-success hover:bg-success hover:text-white hover:border-success"><i
                                    className="ri-download-2-line"></i></Link> */}
                                <Link aria-label="anchor" href=""
                                  className="ti-btn ti-btn-icon ti-btn-wave !gap-0 !m-0 !h-[1.75rem] !w-[1.75rem] text-[0.8rem] bg-primary/10 text-primary hover:bg-primary hover:text-white hover:border-primary"><i
                                    className="ri-edit-line"></i></Link>
                              </div>
                            </td>
                          </tr>
                        )):<tr className='bg-white border-0'> <td colSpan={5} className='border-0'> <div className='col-md-12 w-100 mt-4'><p className='text-center'>No Data Found</p> </div></td></tr>}
                      </tbody>
                    </table>
                  </div>
                </div>
                {/* <div className="box-footer">
                  <div className="sm:flex items-center">
                    <div className="text-defaulttextcolor dark:text-defaulttextcolor/70">
                      Showing 5 Entries <i className="bi bi-arrow-right ms-2 font-semibold"></i>
                    </div>
                    <div className="ms-auto">
                      <nav aria-label="Page navigation" className="pagination-style-4">
                        <ul className="ti-pagination mb-0">
                          <li className="page-item disabled">
                            <Link className="page-link" href="#!">
                              Prev
                            </Link>
                          </li>
                          <li className="page-item"><Link className="page-link active" href="#!">1</Link></li>
                          <li className="page-item"><Link className="page-link" href="#!">2</Link></li>
                          <li className="page-item">
                            <Link className="page-link !text-primary" href="#!">
                              next
                            </Link>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>

            <div className="xxl:col-span-12 xl:col-span-12 col-span-12">
                    <div className="box overflow-hidden">
                        <div className="box-header justify-between">
                            <div className="box-title">
                            Activity Logs
                            </div>
                            {/* <div className="hs-dropdown ti-dropdown">
                                <Link href="#!" className="text-[0.75rem] px-2 font-normal text-[#8c9097] dark:text-white/50"
                                    aria-expanded="false">
                                    View All<i className="ri-arrow-down-s-line align-middle ms-1 inline-block"></i>
                                </Link>
                                <ul className="hs-dropdown-menu ti-dropdown-menu hidden" role="menu">
                                    <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                                        href="#!">Today</Link></li>
                                    <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                                        href="#!">This Week</Link></li>
                                    <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                                        href="#!">Last Week</Link></li>
                                </ul>
                            </div> */}
                        </div>
                        {/* <div className="box-body !p-0">
                            <div className="table-responsive">
                                <table className="table table-hover whitespace-nowrap min-w-full">
                                    
                                    <tbody>
                                        {TopCompanies.map((idx) => (
                                            <tr className="border hover:bg-gray-100 dark:hover:bg-light dark:border-defaultborder/10 border-defaultborder !border-x-0" key={Math.random()}>
                                                <th scope="col">
                                                    <div className="flex items-center">
                                                        <img src={idx.src} alt="" className="avatar avatar-md p-1 bg-light avatar-rounded me-2 !mb-0" />
                                                        <div>
                                                            <p className="font-semibold mb-0">Sarah Thompson updated the support entitlements for 'ABC Corporation,' increasing the number of hosted sandboxes allowed to be deployed from 5 to 10.

</p>
                                                            
                                                        </div>
                                                    </div>
                                                </th>
                                                
                                                <td className='f-end'>{idx.date}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div> */}
                    </div>
                </div>
          </div>
        </div>
    
      </div>
      </>
    )}
            </>
  )
}

export default orgDashboard