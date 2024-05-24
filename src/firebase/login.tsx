import { FC, Fragment, useEffect, useState } from 'react';
import { connect } from "react-redux";
import { ThemeChanger } from "../redux/action";
import { Link, useNavigate } from 'react-router-dom';
import desktoplogo from "../assets/images/brand-logos/desktop-logo.png";
import desktopdarklogo from "../assets/images/brand-logos/desktop-dark.png";
// import react from "../assets/images/brand-logos/2.png";
// import firebase from "../assets/images/brand-logos/1.png";
import { Login } from '../supabase/auth';
import { LocalStorageBackup } from '../components/common/switcher/switcherdata/switcherdata';
// import { auth } from './firebaseapi';
import swal from "sweetalert";
import { emailSchema, passwordSchema } from '../redux/ValidationHelper';
import * as Yup from "yup";


const validationSchema = Yup.object().shape({
    email: emailSchema,
    password: passwordSchema
});

interface LoginProps { }

const LoginScreen: FC<LoginProps> = ({ ThemeChanger }: any) => {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordErr, setPasswordErr] = useState("");
    // const [hide, setHide] = useState("password");
    const [error, setError] = useState<string | null>(null);
    // const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    useEffect(() => {
        const storedEmail = localStorage.getItem('rememberedEmail');
        const storedPassword = localStorage.getItem('rememberedPassword');
        if (storedEmail && storedPassword) {
            setEmail(storedEmail);
            setPassword(storedPassword);
            setRememberMe(true);
        }
    }, []);
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value.trim().replace(/\s+/g, '');
        setEmail(newEmail);

        emailSchema.validate(newEmail)
            .then(() => {
                setEmailError('');
            })
            .catch((err: Yup.ValidationError) => {
                setEmailError(err.message);
            });
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value.trim();
        setPassword(newPassword);

        passwordSchema.validate(newPassword)
            .then(() => {
                setPasswordErr('');
            })
            .catch((err: Yup.ValidationError) => {
                setPasswordErr(err.message);
            });
    };

    //   const togglePasswordVisibility = () => {
    //     setHide(hide === "password" ? "text" : "password");
    //   };

    const handleRememberMeChange = (e: any) => {
        setRememberMe(e.target.checked);
    };

    const validateForm = async () => {
        try {
            await validationSchema.validate({ email, password }, { abortEarly: false });
            setEmailError("");
            setPasswordErr("");
            return true;
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const emailErrorMsg = err.inner.find(error => error.path === 'email')?.message || "";
                const passwordErrorMsg = err.inner.find(error => error.path === 'password')?.message || "";
                setEmailError(emailErrorMsg);
                setPasswordErr(passwordErrorMsg);
            }
            return false;
        }
    };

    const handleSubmit = async () => {
        debugger
        if (rememberMe) {
            localStorage.setItem('rememberedEmail', email);
            localStorage.setItem('rememberedPassword', password);
        } else {
            localStorage.removeItem('rememberedEmail');
            localStorage.removeItem('rememberedPassword');
        }
        const isValid = await validateForm();
        if (isValid) {
            // setLoading(true);
            if (rememberMe) {
                localStorage.setItem('rememberMe', 'true');
            } else {
                localStorage.removeItem('rememberMe');
            }
            const result: any = await Login(email, password);
            if (result.errorCode === 0) {
                // setLoading(false);
                console.log('Data signed in successfully:', result.user[0].id);
                const user_id: any = result.user[0]?.id;
                const user_role: any = result.user[0]?.user_role;
                const user_firstname: any = result.user[0]?.firstname;
                const user_lastname: any = result.user[0]?.lastname;
                localStorage.setItem('authToken', result.auth.session)
                localStorage.setItem('user_id', user_id);
                localStorage.setItem('user_fname', user_firstname);
                localStorage.setItem('user_lname', user_lastname);
                localStorage.setItem('user_role', user_role);
                setError("");
            //           auth.signInWithEmailAndPassword(email, password).then(
            // user => { console.log(user); routeChange(); }).catch(err => { console.log(err); setError(err.message); });
                routeChange();
                // navigate('/organization-list');
            } else {
                // setLoading(false);
                swal({
                    icon: 'error',
                    text: result.message,
                });
                setError(result.message);
            }
            console.log(result);
        }
    };
    const handleKeyPress = (e: any) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };
    const [passwordshow1, setpasswordshow1] = useState(false);
    // const [err, setError] = useState("");
    // const [data, setData] = useState({
    //     "email": "adminreact@gmail.com",
    //     "password": "1234567890",
    // });
    // const { email, password } = data;
    // const changeHandler = (e: any) => {
    //     setData({ ...data, [e.target.name]: e.target.value });
    //     setError("");
    // };
    // const navigate = useNavigate();
    const routeChange = () => {
        const path = `${import.meta.env.BASE_URL}dashboards/crm`;
        navigate(path);
    };
    // const Login1 = () => {

    //     if (data.email == "adminreact@gmail.com" && data.password == "1234567890") {
    //         routeChange();
    //     }
    //     else {
    //         setError("The Auction details did not Match");
    //         setData({
    //             "email": "adminreact@gmail.com",
    //             "password": "1234567890",
    //         });
    //     }
    // };
    // const Login = (e: any) => {
    //     e.preventDefault();
    //     auth.signInWithEmailAndPassword(email, password).then(
    //         user => { console.log(user); routeChange(); }).catch(err => { console.log(err); setError(err.message); });
    // };
//   const Login = (e: any) => {
//         e.preventDefault();
//         auth.signInWithEmailAndPassword(email, password).then(
//             user => { console.log(user); routeChange(); }).catch(err => { console.log(err); setError(err.message); });
//     };

    useEffect(() => {
        LocalStorageBackup(ThemeChanger);
    }, []);
    return (
        <Fragment>
            <div className='bg-theme'>
                <div className="container">
                    <div className="authentication authentication-basic items-center h-full text-defaultsize text-defaulttextcolor">
                        <div className="grid grid-cols-12">
                            <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-3 sm:col-span-2"></div>
                            <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-8 col-span-12">
                                <div className="my-[2.5rem] flex justify-center">
                                    <Link to={`${import.meta.env.BASE_URL}dashboards/crm/`}>
                                        <img src={desktoplogo} alt="logo" className="desktop-dark" />
                                        <img src={desktopdarklogo} alt="logo" className="desktop-logo" />
                                    </Link>
                                </div>

                                <div className="box">

                                    <div className="box-body !p-[3rem]" role="tabpanel" id="pills-with-brand-color-01" aria-labelledby="pills-with-brand-color-item-1">
                                        <p className="h5 font-semibold mb-2 text-center">Sign In</p>
                                        {/* {err && <div className="alert-danger px-4 py-3 shadow-md mb-2" role="alert">
                                        <div className="flex">
                                            <div className="py-1">
                                            </div>
                                            <div>{err}</div>
                                        </div>
                                    </div>} */}
                                    {error&&null}
                                        <div className="grid grid-cols-12 gap-y-4">
                                            <div className="xl:col-span-12 col-span-12">
                                                <label htmlFor="signin-username" className="form-label text-default">Email</label>
                                                <input type="email" name="email" className="form-control form-control-lg w-full !rounded-md" onChange={handleEmailChange} value={email}
                                                    onKeyDown={handleKeyPress}
                                                    maxLength={320}
                                                    id="signin-username" placeholder="user name" />
                                                {emailError && <div className="text-danger">{emailError}</div>}
                                            </div>
                                            <div className="xl:col-span-12 col-span-12 mb-2">
                                                <label htmlFor="signin-password" className="form-label text-default block">Password
                                                    {/* <Link to={`${import.meta.env.BASE_URL}authentication/resetpassword/resetbasic`} className="float-end text-danger">
                                                    Forget password ?</Link> */}
                                                </label>
                                                <div className="input-group">
                                                    <input type={(passwordshow1) ? 'text' : "password"} className="form-control form-control-lg !rounded-s-md"
                                                        name="password"
                                                        placeholder="password" onKeyDown={handleKeyPress}
                                                        onChange={handlePasswordChange}
                                                        value={password}
                                                        maxLength={16} />
                                                    <button
                                                        onClick={() => setpasswordshow1(!passwordshow1)}
                                                        aria-label="button" className="ti-btn ti-btn-light !rounded-s-none !mb-0" type="button" id="button-addon2"><i className={`${passwordshow1 ? 'ri-eye-line' : 'ri-eye-off-line'} align-middle`}></i></button>
                                                    {passwordErr && <div className="text-danger">{passwordErr}</div>}
                                                </div>
                                                <div className="mt-2">
                                                    <div className="form-check !ps-0">
                                                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" checked={rememberMe}
                                                            onKeyDown={handleKeyPress}
                                                            onChange={handleRememberMeChange} />
                                                        <label className="form-check-label text-[#8c9097] dark:text-white/50 font-normal" htmlFor="defaultCheck1">
                                                            Remember password ?
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="xl:col-span-12 col-span-12 grid mt-2">
                                                <button className="ti-btn ti-btn-primary !bg-primary !text-white !font-medium"
                                                    onClick={handleSubmit}>Sign In</button>
                                            </div>
                                        </div>


                                    </div>
                                    {/* <div className="box-body !p-[3rem] hidden" role="tabpanel" id="pills-with-brand-color-02" aria-labelledby="pills-with-brand-color-item-2">
                                    <p className="h5 font-semibold mb-2 text-center">Sign In</p>


                                    <p className="mb-4 text-[#8c9097] dark:text-white/50 opacity-[0.7] font-normal text-center">Welcome back Jhon !</p>

                                    {err && <div className="alert-danger px-4 py-3 shadow-md mb-2" role="alert">
                                        <div className="flex">
                                            <div className="py-1">
                                            </div>
                                            <div>{err}</div>
                                        </div>
                                    </div>}
                                    <div className="grid grid-cols-12 gap-y-4">
                                        <div className="xl:col-span-12 col-span-12">
                                            <label htmlFor="signin-username" className="form-label text-default">Email</label>
                                            <input type="email" name="email" className="form-control form-control-lg w-full !rounded-md"

                                                placeholder="user name" value={email}
                                                onChange={changeHandler} />
                                        </div>
                                        <div className="xl:col-span-12 col-span-12 mb-2">
                                            <label htmlFor="signin-password" className="form-label text-default block">Password<Link to={`${import.meta.env.BASE_URL}authentication/resetpassword/resetbasic`} className="float-end text-danger">Forget password ?</Link></label>
                                            <div className="input-group">
                                                <input name="password" type='password' className="form-control form-control-lg !rounded-s-md"

                                                    placeholder="password" value={password}
                                                    onChange={changeHandler} />
                                                <button onClick={() => setpasswordshow1(!passwordshow1)} aria-label="button" className="ti-btn ti-btn-light !rounded-s-none !mb-0" type="button" id="button-addon2"><i className={`${passwordshow1 ? 'ri-eye-line' : 'ri-eye-off-line'} align-middle`}></i></button>
                                            </div>
                                            <div className="mt-2">
                                                <div className="form-check !ps-0">
                                                    <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                    <label className="form-check-label text-[#8c9097] dark:text-white/50 font-normal" htmlFor="defaultCheck1">
                                                        Remember password ?
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="xl:col-span-12 col-span-12 grid mt-2">
                                            <Link to="#" className="ti-btn ti-btn-primary !bg-primary !text-white !font-medium" onClick={Login}>Sign In</Link>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-[0.75rem] text-[#8c9097] dark:text-white/50 mt-4">Dont have an account? <Link to={`${import.meta.env.BASE_URL}authentication/signup/signupbasic`} className="text-primary">Sign Up</Link></p>
                                    </div>
                                    <div className="text-center my-4 authentication-barrier">
                                        <span>OR</span>
                                    </div>
                                    <div className="btn-list text-center">
                                        <button aria-label="button" type="button" className="ti-btn ti-btn-icon ti-btn-light me-[0.365rem]">
                                            <i className="ri-facebook-line font-bold text-dark opacity-[0.7]"></i>
                                        </button>
                                        <button aria-label="button" type="button" className="ti-btn ti-btn-icon ti-btn-light me-[0.365rem]">
                                            <i className="ri-google-line font-bold text-dark opacity-[0.7]"></i>
                                        </button>
                                        <button aria-label="button" type="button" className="ti-btn ti-btn-icon ti-btn-light">
                                            <i className="ri-twitter-line font-bold text-dark opacity-[0.7]"></i>
                                        </button>
                                    </div>
                                </div> */}
                                </div>
                            </div>
                            <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-3 sm:col-span-2"></div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>

    )
};

const mapStateToProps = (state: any) => ({
    local_varaiable: state
});

export default connect(mapStateToProps, { ThemeChanger })(LoginScreen);


