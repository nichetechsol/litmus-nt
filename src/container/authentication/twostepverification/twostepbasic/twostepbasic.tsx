import  { FC, Fragment, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import desktoplogo from "../../../../assets/images/brand-logos/desktop-logo.png";
import desktopdarklogo from "../../../../assets/images/brand-logos/desktop-dark.png";

interface TwostepbasicProps {}

const Twostepbasic: FC<TwostepbasicProps> = () => {
  const inputRefs :any= {
    one: useRef(null),
    two: useRef(null),
    three: useRef(null),
    four: useRef(null),
};

const handleInputChange = useCallback((currentId:any, nextId:any) => {
    const currentInput = inputRefs[currentId].current;

    if (currentInput && currentInput.value.length === 1) {
        const nextInput = inputRefs[nextId] ? inputRefs[nextId].current : null;

        if (nextInput) {
            nextInput.focus();
        }
    }
}, [inputRefs]);
  return(
  <Fragment>
     <div className="container">
    <div className="flex justify-center authentication authentication-basic items-center h-full text-defaultsize text-defaulttextcolor">
      <div className="grid grid-cols-12">
        <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-3 sm:col-span-2"></div>
        <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-8 col-span-12 flex flex-col">
          <div className="my-[3rem] flex justify-center">
            <Link to={`${import.meta.env.BASE_URL}dashboards/crm/`}>
              <img src={desktoplogo} alt="logo" className="desktop-logo"/>
              <img src={desktopdarklogo} alt="logo" className="desktop-dark"/>
            </Link>
          </div>
          <div className="box">
            <div className="box-body sm:!p-[3rem]">
              <p className="font-semibold mb-2 text-center text-xl">Verify Your Account</p>
              <p className="mb-4 text-[#8c9097] dark:text-white/50 opacity-[0.7] font-normal text-center">Enter the 4 digit code sent to the
                registered email Id.</p>
              <div className="grid grid-cols-12 gap-y-4">
                <div className="xl:col-span-12 col-span-12 mb-2">
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-3 px-1">
                        <input type="text" className="!px-0 form-control w-full !rounded-md form-control-lg text-center !text-[1rem]" required id="one" maxLength={1} 
											onChange={() => handleInputChange("one", "two")} ref={inputRefs.one}  />
                    </div>
                    <div className="col-span-3 px-1">
                    <input type="text" className="!px-0 form-control w-full !rounded-md form-control-lg text-center !text-[1rem]" required id="two" maxLength={1} 
											onChange={() => handleInputChange("two", "three")} ref={inputRefs.two} />
                    </div>
                    <div className="col-span-3 px-1">
                    <input type="text" className="!px-0 form-control w-full !rounded-md form-control-lg text-center !text-[1rem]" required id="three" maxLength={1} 
											onChange={() => handleInputChange("three", "four")} ref={inputRefs.three} />
                    </div>
                    <div className="col-span-3 px-1">
                    <input type="text" className="!px-0 form-control w-full !rounded-md form-control-lg text-center !text-[1rem]"
                     required id="four" maxLength={1}
											onChange={() => handleInputChange("four", "nextInputId")} ref={inputRefs.four} />
                    </div>
                  </div>
                  <div className="form-check mt-2 mb-0 !ps-0">
                      <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                      <label className="form-check-label" htmlFor="defaultCheck1">
                          Did not recieve a code ?<Link to={`${import.meta.env.BASE_URL}pages/email/mailapp/`} className="text-primary ms-2 inline-block">Resend</Link>
                      </label>
                  </div>
                </div>
                <div className="xl:col-span-12 col-span-12 grid mt-2">
                  <Link to={`${import.meta.env.BASE_URL}dashboards/crm/`}
                    className="ti-btn ti-btn-lg bg-primary text-white !font-medium dark:border-defaultborder/10">Verify</Link>
                </div>
              </div>
              <div className="text-center">
                <p className="text-[0.75rem] text-[#8c9097] dark:text-white/50 mt-4 text-danger"><sup><i className="ri-asterisk"></i></sup>Don't share
                  the verification code with anyone !</p>
              </div>
            </div>
          </div>
        </div>
        <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-3 sm:col-span-2"></div>
      </div>
    </div>
  </div>
  </Fragment>
);}

export default Twostepbasic;
