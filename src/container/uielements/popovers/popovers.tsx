import  { FC, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Pageheader from '../../../components/common/pageheader/pageheader';
import Showcode from '../../../components/ui/showcode/showcode';
import { popover1, popover2, popover3, popover4, popover5, popover6 } from '../../../components/ui/data/uielementsdata';


interface PopoversProps {}

const Popovers: FC<PopoversProps> = () => {
  return(
  <Fragment>
                <Pageheader currentpage="Popovers" activepage="Ui Elements" mainpage="Popovers" />
            <div className="grid grid-cols-12 gap-6">
                    <div className="xl:col-span-5 col-span-12">
                        <Showcode title=" Default Popovers" customCardClass="custom-box" code={popover1}>
                                <div className="ti-btn-list">
                                    <div className="hs-tooltip ti-main-tooltip [--trigger:click] me-2">
                                        <Link className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-outline-primary" to="#">Popover Top
                                            <div className="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !p-0 !max-w-[276px]" role="tooltip">
                                                <div  className="!border-b !border-solid dark:border-defaultborder/10 !rounded-t-md !py-2  !px-4 text-defaulttextcolor border-defaultborder text-start w-full text-[1rem]">
                                                <h6>Popover Top</h6>
                                                </div>
                                                <p className="!text-defaulttextcolor !text-[0.8rem] !py-4 !px-4 text-start">And here's some amazing content. It's very engaging. Right?</p>
                                            </div>
                                          </Link>
                                      </div>
                                    <div className="hs-tooltip ti-main-tooltip me-2 [--trigger:click] [--placement:right]">
                                        <Link className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-outline-primary" to="#">Popover Right
                                            <div className="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !p-0 !max-w-[276px]" role="tooltip">
                                                <div  className="!border-b !border-solid dark:border-defaultborder/10 !rounded-t-md !py-2  !px-4 text-defaulttextcolor border-defaultborder text-start w-full text-[1rem]">
                                                <h6>Popover Right</h6>
                                                </div>
                                                <p className="!text-defaulttextcolor !text-[0.8rem] !py-4 !px-4 text-start">And here's some amazing content. It's very engaging. Right?</p>
                                            </div>
                                          </Link>
                                      </div>
                                      <div className="hs-tooltip ti-main-tooltip me-2 [--trigger:click] [--placement:bottom]">
                                        <Link className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-outline-primary" to="#">Popover Bottom
                                            <div className="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !p-0 !max-w-[276px]" role="tooltip">
                                                <div  className="!border-b !border-solid dark:border-defaultborder/10 !rounded-t-md !py-2  !px-4 text-defaulttextcolor border-defaultborder text-start w-full text-[1rem]">
                                                <h6>Popover Bottom</h6>
                                                </div>
                                                <p className="!text-defaulttextcolor !text-[0.8rem] !py-4 !px-4 text-start">And here's some amazing content. It's very engaging. Right?</p>
                                            </div>
                                          </Link>
                                      </div>
                                      <div className="hs-tooltip ti-main-tooltip me-2 [--trigger:click] [--placement:left]">
                                        <Link className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-outline-primary" to="#">Popover Left
                                            <div className="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !p-0 !max-w-[276px]" role="tooltip">
                                                <div  className="!border-b !border-solid dark:border-defaultborder/10 !rounded-t-md !py-2  !px-4 text-defaulttextcolor border-defaultborder text-start w-full text-[1rem]">
                                                <h6>Popover Left</h6>
                                                </div>
                                                <p className="!text-defaulttextcolor !text-[0.8rem] !py-4 !px-4 text-start">And here's some amazing content. It's very engaging. Right?</p>
                                            </div>
                                          </Link>
                                      </div>
                                </div>
                            </Showcode>
                    </div>
                    <div className="xl:col-span-7 col-span-12">
                        <Showcode title="Colored Header" customCardClass="custom-box" code={popover2}>
                                <div className="ti-btn-list">
                                    <div className="hs-tooltip ti-main-tooltip me-2 [--trigger:click] [--placement:top]">
                                        <Link className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-outline-primary" to="#">Header Primary
                                            <div className="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !p-0 !max-w-[276px]" role="tooltip">
                                                <div  className="!border-b !border-solid dark:border-defaultborder/10 bg-primary !rounded-t-md !py-2  !px-4 text-white border-defaultborder text-start w-full text-[1rem]">
                                                <h6>Color Header</h6>
                                                </div>
                                                <p className="!text-defaulttextcolor  !text-[0.8rem] !py-4 !px-4 text-start">Popover With Primary Header</p>
                                            </div>
                                          </Link>
                                    </div>
                                    <div className="hs-tooltip ti-main-tooltip me-2 [--trigger:click] [--placement:right]">
                                        <Link className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-outline-secondary" to="#">Header Secondary
                                            <div className="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !p-0 !max-w-[276px]" role="tooltip">
                                                <div  className="!border-b !border-solid dark:border-defaultborder/10 bg-secondary !py-2 !rounded-t-md !px-4 text-white border-defaultborder text-start w-full text-[1rem]">
                                                <h6>Color Header</h6>
                                                </div>
                                                <p className="!text-defaulttextcolor !text-[0.8rem] !py-4 !px-4 text-start">Popover With Secondary Header</p>
                                            </div>
                                          </Link>
                                    </div>
                                    <div className="hs-tooltip ti-main-tooltip me-2 [--trigger:click] [--placement:bottom]">
                                        <Link className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-outline-info" to="#">Header Info
                                            <div className="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !p-0 !max-w-[276px]" role="tooltip">
                                                <div  className="!border-b !border-solid dark:border-defaultborder/10 bg-info !py-2 !px-4 !rounded-t-md text-white border-defaultborder text-start w-full text-[1rem]">
                                                <h6>Color Header</h6>
                                                </div>
                                                <p className="!text-defaulttextcolor !text-[0.8rem] !py-4 !px-4 text-start">Popover With Info Header</p>
                                            </div>
                                          </Link>
                                    </div>
                                    <div className="hs-tooltip ti-main-tooltip me-2 [--trigger:click] [--placement:left]">
                                        <Link className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-outline-warning" to="#">Header warning
                                            <div className="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !p-0 !max-w-[276px]" role="tooltip">
                                                <div  className="!border-b !border-solid dark:border-defaultborder/10 bg-warning !py-2 !px-4 !rounded-t-md text-white border-defaultborder text-start w-full text-[1rem]">
                                                <h6>Color Header</h6>
                                                </div>
                                                <p className="!text-defaulttextcolor !text-[0.8rem] !py-4 !px-4 text-start">Popover With warning Header</p>
                                            </div>
                                          </Link>
                                    </div>
                                    <div className="hs-tooltip ti-main-tooltip me-2 [--trigger:click] [--placement:top]">
                                        <Link className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-outline-success" to="#">Header success
                                            <div className="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !p-0 !max-w-[276px]" role="tooltip">
                                                <div  className="!border-b !border-solid dark:border-defaultborder/10 bg-success !py-2 !px-4 text-white !rounded-t-md border-defaultborder text-start w-full text-[1rem]">
                                                <h6>Color Header</h6>
                                                </div>
                                                <p className="!text-defaulttextcolor !text-[0.8rem] !py-4 !px-4 text-start">Popover With succuss Header</p>
                                            </div>
                                          </Link>
                                    </div>
                                    <div className="hs-tooltip ti-main-tooltip me-2 [--trigger:click] [--placement:top]">
                                        <Link className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-outline-danger" to="#">Header danger
                                            <div className="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !p-0 !max-w-[276px]" role="tooltip">
                                                <div  className="!border-b !border-solid dark:border-defaultborder/10 bg-danger !py-2 !px-4 text-white border-defaultborder !rounded-t-md text-start w-full text-[1rem]">
                                                <h6>Color Header</h6>
                                                </div>
                                                <p className="!text-defaulttextcolor !text-[0.8rem] !py-4 !px-4 text-start">Popover With danger Header</p>
                                            </div>
                                          </Link>
                                    </div>
                                </div>
                            </Showcode>
                    </div>
                </div>
                 <div className="grid grid-cols-12 gap-6">
                    <div className="xl:col-span-12 col-span-12">
                        <Showcode title="Colored Popovers" customCardClass="custom-box" code={popover3}>
                                <div className="ti-btn-list">
                                    <div className="hs-tooltip ti-main-tooltip me-2  [--trigger:click] [--placement:top]">
                                        <Link className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-primary-full" to="#">Primary
                                            <div className="hs-tooltip-content ti-main-tooltip-content !bg-primary !z-[1000] !p-0 !max-w-[276px] !border-white/10" role="tooltip">
                                                <div  className="!border-b !border-solid dark:border-white/10 !py-2 !px-4 text-white border-white/10 !rounded-t-md text-start w-full text-[1rem]">
                                                <h6>Primary Color background</h6>
                                                </div>
                                                <p className="!text-white !text-[0.8rem] !py-4 !px-4 text-start">Popover With primary background</p>
                                            </div>
                                          </Link>
                                    </div>
                                    <div className="hs-tooltip ti-main-tooltip me-2 [--trigger:click] [--placement:right]">
                                        <Link className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-secondary-full" to="#">Secondary
                                            <div className="hs-tooltip-content ti-main-tooltip-content !bg-secondary !p-0 !max-w-[276px] !border-white/10" role="tooltip">
                                                <div  className="!border-b !border-solid dark:border-white/10 !py-2 !px-4 text-white border-white/10 !rounded-t-md text-start w-full text-[1rem]">
                                                <h6>Secondary Color background</h6>
                                                </div>
                                                <p className="!text-white !text-[0.8rem] !py-4 !px-4 text-start">Popover With secondary background</p>
                                            </div>
                                          </Link>
                                    </div>
                                    <div className="hs-tooltip ti-main-tooltip me-2 [--trigger:click] [--placement:top]">
                                        <Link className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-info-full" to="#">Info
                                            <div className="hs-tooltip-content ti-main-tooltip-content !bg-secondary  !p-0 !max-w-[276px]  !border-white/10" role="tooltip">
                                                <div  className="!border-b dark:border-white/10 !border-solid !py-2 !px-4 text-white border-white/10 !rounded-t-md text-start w-full text-[1rem]">
                                                <h6>Info Color background</h6>
                                                </div>
                                                <p className="!text-white !text-[0.8rem] !py-4 !px-4 text-start">Popover With info background</p>
                                            </div>
                                          </Link>
                                    </div>
                                    <div className="hs-tooltip ti-main-tooltip me-2 [--trigger:click] [--placement:right]">
                                        <Link className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-warning-full" to="#">Warning
                                            <div className="hs-tooltip-content ti-main-tooltip-content !bg-warning  !p-0 !max-w-[276px] !border-white/10" role="tooltip">
                                                <div  className="!border-b dark:border-white/10 !border-solid !py-2 !px-4 text-white border-white/10 !rounded-t-md text-start w-full text-[1rem]">
                                                <h6>Warning Color background</h6>
                                                </div>
                                                <p className="!text-white !text-[0.8rem] !py-4 !px-4 text-start">Popover With warning background</p>
                                            </div>
                                          </Link>
                                    </div>
                                    <div className="hs-tooltip ti-main-tooltip me-2 [--trigger:click] [--placement:top]">
                                        <Link className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-success-full" to="#">Success
                                            <div className="hs-tooltip-content ti-main-tooltip-content !bg-success  !p-0 !max-w-[276px] !border-white/10" role="tooltip">
                                                <div  className="!border-b dark:border-white/10 !border-solid !py-2 !px-4 text-white border-white/10 !rounded-t-md text-start w-full text-[1rem]">
                                                <h6>Success Color background</h6>
                                                </div>
                                                <p className="!text-white !text-[0.8rem] !py-4 !px-4 text-start">Popover With success background</p>
                                            </div>
                                          </Link>
                                    </div>
                                    <div className="hs-tooltip ti-main-tooltip me-2 [--trigger:click] [--placement:right]">
                                        <Link className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-danger-full" to="#">Danger
                                            <div className="hs-tooltip-content ti-main-tooltip-content !bg-danger  !p-0 !max-w-[276px] !border-white/10" role="tooltip">
                                                <div  className="!border-b dark:border-white/10 !border-solid !py-2 !px-4 text-white border-white/10 !rounded-t-md text-start w-full text-[1rem]">
                                                <h6>Danger Color background</h6>
                                                </div>
                                                <p className="!text-white !text-[0.8rem] !py-4 !px-4 text-start">Popover With danger background</p>
                                            </div>
                                          </Link>
                                    </div>
                                </div>
                            </Showcode>
                    </div>
                </div>
                 <div className="grid grid-cols-12 gap-6">
                    <div className="xl:col-span-12 col-span-12">
                        <Showcode title="Light Popovers" customCardClass="custom-box" code={popover4}>
                                <div className="ti-btn-list">
                                    <div className="hs-tooltip ti-main-tooltip me-2 [--trigger:click] [--placement:top] ">
                                        <Link className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-primary" to="#">Primary
                                            <div className="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !z-[1000] !p-0 !max-w-[276px] overflow-hidden" role="tooltip">
                                                <div className="!bg-primary/10">
                                                    <div  className="!border-b !border-solid !py-2 !px-4  text-primary !border-primary/20 !rounded-t-md text-start w-full text-[1rem]">
                                                    <h6>Color background</h6>
                                                    </div>
                                                    <p className="!text-primary !text-[0.8rem] !py-4 !px-4 text-start">Popover With primary background</p>

                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="hs-tooltip ti-main-tooltip me-2 [--trigger:click] [--placement:right]">
                                        <Link className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-secondary" to="#">Secondary
                                            <div className="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !z-[1000] !p-0 !max-w-[276px] overflow-hidden" role="tooltip">
                                                <div className="!bg-secondary/10">
                                                    <div  className="!border-b !border-solid !py-2 !px-4  text-secondary !border-secondary/20 !rounded-t-md text-start w-full text-[1rem]">
                                                    <h6>Color background</h6>
                                                    </div>
                                                    <p className="!text-secondary !text-[0.8rem] !py-4 !px-4 text-start">Popover With secondary background</p>

                                                </div>
                                            </div>
                                          </Link>
                                    </div>
                                    <div className="hs-tooltip ti-main-tooltip me-2 [--trigger:click] [--placement:top]">
                                        <Link className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-info" to="#">Info
                                            <div className="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !z-[1000] !p-0 !max-w-[276px] overflow-hidden" role="tooltip">
                                                <div className="!bg-info/10">
                                                    <div  className="!border-b !border-solid !py-2 !px-4  text-info !border-info/20 !rounded-t-md text-start w-full text-[1rem]">
                                                    <h6>Color background</h6>
                                                    </div>
                                                    <p className="!text-info !text-[0.8rem] !py-4 !px-4 text-start">Popover With info background</p>

                                                </div>
                                            </div>
                                          </Link>
                                    </div>
                                    <div className="hs-tooltip ti-main-tooltip me-2 [--trigger:click] [--placement:right]">
                                        <Link className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-warning" to="#">Warning
                                            <div className="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !z-[1000] !p-0 !max-w-[276px] overflow-hidden" role="tooltip">
                                                <div className="!bg-warning/10">
                                                    <div  className="!border-b !border-solid !py-2 !px-4  text-warning !border-warning/20 !rounded-t-md text-start w-full text-[1rem]">
                                                    <h6>Color background</h6>
                                                    </div>
                                                    <p className="!text-warning !text-[0.8rem] !py-4 !px-4 text-start">Popover With warning background</p>
                                                </div>
                                            </div>
                                          </Link>
                                    </div>
                                    <div className="hs-tooltip ti-main-tooltip me-2 [--trigger:click] [--placement:top]">
                                        <Link className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-success" to="#">Success
                                            <div className="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !z-[1000] !p-0 !max-w-[276px] overflow-hidden" role="tooltip">
                                                <div className="!bg-success/10">
                                                    <div  className="!border-b !border-solid !py-2 !px-4  text-success !border-success/20 !rounded-t-md text-start w-full text-[1rem]">
                                                    <h6>Color background</h6>
                                                    </div>
                                                    <p className="!text-success !text-[0.8rem] !py-4 !px-4 text-start">Popover With success background</p>

                                                </div>
                                            </div>
                                          </Link>
                                    </div>
                                    <div className="hs-tooltip ti-main-tooltip me-2 [--trigger:click] [--placement:right]">
                                        <Link className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-danger" to="#">danger
                                            <div className="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !z-[1000] !p-0 !max-w-[276px] overflow-hidden" role="tooltip">
                                                <div className="!bg-danger/10">
                                                    <div  className="!border-b !border-solid !py-2 !px-4  text-danger !border-danger/20 !rounded-t-md text-start w-full text-[1rem]">
                                                    <h6>Color background</h6>
                                                    </div>
                                                    <p className="!text-danger !text-[0.8rem] !py-4 !px-4 text-start">Popover With danger background</p>

                                                </div>
                                            </div>
                                          </Link>
                                    </div>
                                </div>
                            </Showcode>
                    </div>
                </div>
                 <div className="grid grid-cols-12 gap-6">
                    <div className="xl:col-span-6 col-span-12">
                        <Showcode title="Disabled Popover" customCardClass="custom-box" code={popover5}>
                                <div className="hs-tooltip ti-main-tooltip [--trigger:click] [--placement:top]">
                                    <Link className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-primary-full opacity-60" to="#">
                                        Disabled button
                                      <div className="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg " role="tooltip">
                                       Disabled Popover
                                      </div>
                                    </Link>
                                  </div>
                               </Showcode>
                    </div>
                    <div className="xl:col-span-6 col-span-12">
                        <Showcode title="Icon Popovers" customCardBodyClass="flex" customCardClass="custom-box" code={popover6}>
                                <div className="hs-tooltip ti-main-tooltip me-6 !max-w-[276px] [--trigger:click] [--placement:top]">
                                    <Link className="hs-tooltip-toggle ti-main-tooltip-toggle" to="#">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="svg-primary" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/></svg>
                                      <div className="hs-tooltip-content ti-main-tooltip-content !py-4 !px-4 !bg-primary !text-white" role="tooltip">
                                       <p>The Icon Popover</p>
                                      </div>
                                    </Link>
                               </div>
                               <div className="hs-tooltip ti-main-tooltip !max-w-[276px] [--trigger:click] [--placement:left]">
                                <Link className="hs-tooltip-toggle ti-main-tooltip-toggle" to="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="fill-secondary" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
                                    <div className="hs-tooltip-content ti-main-tooltip-content !bg-secondary !text-white !py-4 !px-4" role="tooltip">
                                        <p>The Icon Popover</p>
                                  </div>
                                </Link>
                              </div>
                           </Showcode>
                    </div>
                </div>
  </Fragment>
);}

export default Popovers;
