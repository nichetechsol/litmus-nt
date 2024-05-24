import  { FC, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Pageheader from '../../../../components/common/pageheader/pageheader';
import face1 from "../../../../assets/images/faces/1.jpg";
import face3 from "../../../../assets/images/faces/3.jpg";
import face4 from "../../../../assets/images/faces/4.jpg";
import face8 from "../../../../assets/images/faces/8.jpg";
import face9 from "../../../../assets/images/faces/9.jpg";
import image21 from '../../../../assets/images/nft-images/21.png';
import image25 from '../../../../assets/images/nft-images/25.png';
import image26 from '../../../../assets/images/nft-images/26.png';
import crypto from "../../../../assets/images/crypto-currencies/square-color/Ethereum.svg";
import { Tabpane1data } from './marketplacedata';
import image18 from '../../../../assets/images/nft-images/18.png';
import image20 from '../../../../assets/images/nft-images/20.png';

interface MarketplaceProps {}

const Marketplace: FC<MarketplaceProps> = () => {
  return(
  <Fragment>
                <Pageheader currentpage="Market Place" activepage="NFT" mainpage="Market Place" />
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box custom-box">
                        <div className="box-body">
                            <div className="flex items-center justify-between flex-wrap gap-2">
                                <nav className="flex flex-wrap" aria-label="Tabs">
                                    <Link to="#" className="hs-tab-active:bg-primary/10 hs-tab-active:text-primary  py-[0.4rem] px-2  text-sm font-medium text-center rounded-sm hover:text-primary active" id="nft-all-item" data-hs-tab="#nft-all" aria-controls="nft-all">
                                        All
                                    </Link>
                                    <Link to="#" className="hs-tab-active:bg-primary/10 hs-tab-active:text-primary  py-[0.4rem] px-2 text-sm font-medium text-center  rounded-sm hover:text-primary " id="nft-art-item" data-hs-tab="#nft-art" aria-controls="nft-art">
                                        Art
                                    </Link>
                                    <Link to="#" className="hs-tab-active:bg-primary/10 hs-tab-active:text-primary  py-[0.4rem] px-2 text-sm font-medium text-center  rounded-sm hover:text-primary " id="nft-gaming-item" data-hs-tab="#nft-gaming" aria-controls="nft-gaming">
                                        Gaming
                                    </Link>
                                    <Link to="#" className="hs-tab-active:bg-primary/10 hs-tab-active:text-primary  py-[0.4rem] px-2 text-sm font-medium text-center  rounded-sm hover:text-primary " id="nft-domain-item" data-hs-tab="#nft-domain" aria-controls="nft-domain">
                                        Domain
                                    </Link>
                                    <Link to="#" className="hs-tab-active:bg-primary/10 hs-tab-active:text-primary  py-[0.4rem] px-2 text-sm font-medium text-center  rounded-sm hover:text-primary " id="nft-music-item" data-hs-tab="#nft-music" aria-controls="nft-music">
                                        Music
                                    </Link>
                                    <Link to="#" className="hs-tab-active:bg-primary/10 hs-tab-active:text-primary  py-[0.4rem] px-2 text-sm font-medium text-center  rounded-sm hover:text-primary " id="nft-reaestate-item" data-hs-tab="#nft-realestate" aria-controls="nft-realetste">
                                        Real Estate
                                    </Link>
                                    <Link to="#" className="hs-tab-active:bg-primary/10 hs-tab-active:text-primary  py-[0.4rem] px-2 text-sm font-medium text-center  rounded-sm hover:text-primary " id="nft-sports-item" data-hs-tab="#nft-sports" aria-controls="nft-sports">
                                        Sports
                                    </Link>
                                    <Link to="#" className="hs-tab-active:bg-primary/10 hs-tab-active:text-primary  py-[0.4rem] px-2 text-sm font-medium text-center  rounded-sm hover:text-primary " id="nft-fashion-item" data-hs-tab="#nft-fashion" aria-controls="nft-fashion">
                                        Fashion
                                    </Link>
                                    <Link to="#" className="hs-tab-active:bg-primary/10 hs-tab-active:text-primary  py-[0.4rem] px-2 text-sm font-medium text-center  rounded-sm hover:text-primary " id="nft-avatars-item" data-hs-tab="#nft-avatars" aria-controls="nft-avatars">
                                        Avatars
                                    </Link>
                                    <Link to="#" className="hs-tab-active:bg-primary/10 hs-tab-active:text-primary  py-[0.4rem] px-2 text-sm font-medium text-center  rounded-sm hover:text-primary " id="nft-memes-item" data-hs-tab="#nft-memes" aria-controls="nft-memes">
                                        Memes
                                    </Link>
                                </nav>
                                <div className="btn-list">
                                    <button type="button" aria-label="button" className="ti-btn !py-1 !px-2 !text-[0.75rem] ti-btn-secondary-full btn-wave me-2">Filters</button>
                                    <div className="hs-dropdown ti-dropdown">
                                        <Link to="#" className="ti-btn !py-1 !px-2 !text-[0.75rem] ti-btn-primary-full" aria-expanded="false">
                                            Sort By<i className="ri-arrow-down-s-line align-middle ms-1 inline-block"></i>
                                        </Link>
                                        <ul className="hs-dropdown-menu ti-dropdown-menu hidden" role="menu">
                                            <li><Link className="ti-dropdown-item" to="#">New Collection</Link></li>
                                            <li><Link className="ti-dropdown-item" to="#">High - Low</Link></li>
                                            <li><Link className="ti-dropdown-item" to="#">Low - High</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-6">
                    <div className="xl:col-span-12 col-span-12">
                        <div className="tab-content">
                            <div className="tab-pane show active !p-0   !border-0" id="nft-all" aria-controls="nft-all-item" role="tabpanel">
                                <div className="grid grid-cols-12 gap-x-6">
                                    {Tabpane1data.map((idx)=>(
                                    <div className="xxl:col-span-2 xl:col-span-3 lg:col-span-4 md:col-span-4 sm:col-span-6 col-span-12" key={Math.random()}>
                                        <div className="box custom-box">
                                            <img src={idx.src1} className="!rounded-t-md" alt="..."/>
                                            <div className="flex items-center justify-between nft-like-section w-full px-4">
                                                <div className="flex-grow">
                                                    <button type="button" aria-label="button" className="ti-btn ti-btn-sm ti-btn-success-full !rounded-full btn-wave waves-effect waves-light">
                                                        <i className="ri-heart-fill"></i>
                                                    </button>
                                                </div>
                                                <div>
                                                    <span className="badge nft-like-badge text-white"><i className="ri-heart-fill me-1 text-danger align-middle inline-block"></i>{idx.badge}</span>
                                                </div>
                                            </div>
                                            <div className="box-body">
                                                <div className="flex items-center mb-4">
                                                    <div className="me-2 leading-none">
                                                        <span className="avatar avatar-rounded avatar-md">
                                                            <img src={idx.src2} alt=""/>
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <p className="mb-0 font-semibold">{idx.text1}</p>
                                                        <p className="text-[0.75rem] text-[#8c9097] dark:text-white/50 mb-0">{idx.text2}</p>
                                                    </div>
                                                </div>
                                                <p className="mb-0 text-white nft-auction-time">
                                                   {idx.time}
                                                </p>
                                                <p className="text-[.9375rem] font-semibold mb-2"><Link to="#">{idx.heading}</Link></p>
                                                <div className="flex flex-wrap align-itesm-center justify-between mb-4">
                                                    <div className="font-semibold">
                                                       {idx.text3}
                                                    </div>
                                                    <div className="flex flex-wrap items-center leading-none">
                                                        <span className="avatar avatar-xs me-1">
                                                            <img src={crypto} alt=""/>
                                                        </span>{idx.text4}
                                                    </div>
                                                </div>
                                                <div className="grid">
                                                    <button type="button" className="ti-btn ti-btn-primary">Place Bid</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    ))}
                                </div>
                                <nav aria-label="Page navigation">
                                    <ul className="ti-pagination  mb-4 justify-end">
                                        <li className="page-item disabled"><Link className="page-link px-3 py-[0.375rem]" to="#">Previous</Link></li>
                                        <li className="page-item"><Link className="page-link px-3 py-[0.375rem]" to="#">1</Link></li>
                                        <li className="page-item"><Link className="page-link px-3 py-[0.375rem]" to="#">2</Link></li>
                                        <li className="page-item"><Link className="page-link px-3 py-[0.375rem]" to="#">3</Link></li>
                                        <li className="page-item"><Link className="page-link px-3 py-[0.375rem]" to="#">Next</Link></li>
                                    </ul>
                                </nav>
                            </div>
                            <div className="tab-pane !p-0 hidden !border-0" id="nft-art" aria-controls="nft-all-item" role="tabpanel">
                                <div className="grid grid-cols-12 gap-6">
                                    <div className="xxl:col-span-2 xl:col-span-3 lg:col-span-4 md:col-span-4 sm:col-span-6 col-span-12">
                                        <div className="box custom-box">
                                            <img src={image21} className="!rounded-t-md" alt="..."/>
                                            <div className="flex items-center justify-between nft-like-section w-full px-4">
                                                <div className="flex-grow">
                                                    <button type="button" aria-label="button" className="ti-btn ti-btn-sm ti-btn-success-full !rounded-full btn-wave waves-effect waves-light">
                                                        <i className="ri-heart-fill"></i>
                                                    </button>
                                                </div>
                                                <div>
                                                    <span className="badge nft-like-badge text-white"><i className="ri-heart-fill me-1 text-danger align-middle inline-block"></i>0.19k</span>
                                                </div>
                                            </div>
                                            <div className="box-body">
                                                <div className="flex items-center mb-4">
                                                    <div className="me-2 leading-none">
                                                        <span className="avatar avatar-rounded avatar-md">
                                                            <img src={face4} alt=""/>
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <p className="mb-0 font-semibold">CyberCanvas</p>
                                                        <p className="text-[0.75rem] text-[#8c9097] dark:text-white/50 mb-0">@cybercanvas</p>
                                                    </div>
                                                </div>
                                                <p className="mb-0 text-white nft-auction-time">
                                                    04hrs : 24m : 38s
                                                </p>
                                                <p className="text-[.9375rem] font-semibold mb-2"><Link to="#">Surreal Synthesis</Link></p>
                                                <div className="flex flex-wrap align-itesm-center justify-between mb-4">
                                                    <div className="font-semibold">
                                                        Highest Bid -
                                                    </div>
                                                    <div className="flex flex-wrap items-center leading-none">
                                                        <span className="avatar avatar-xs me-1">
                                                            <img src={crypto} alt=""/>
                                                        </span>0.11ETH
                                                    </div>
                                                </div>
                                                <div className="grid">
                                                    <button type="button" className="ti-btn ti-btn-primary btn-wave waves-effect waves-light">Place Bid</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="xxl:col-span-2 xl:col-span-3 lg:col-span-4 md:col-span-4 sm:col-span-6 col-span-12">
                                        <div className="box custom-box">
                                            <img src={image25} className="!rounded-t-md" alt="..."/>
                                            <div className="flex items-center justify-between nft-like-section w-full px-4">
                                                <div className="flex-grow">
                                                    <button type="button" aria-label="button" className="ti-btn ti-btn-sm ti-btn-success-full !rounded-full btn-wave waves-effect waves-light">
                                                        <i className="ri-heart-fill"></i>
                                                    </button>
                                                </div>
                                                <div>
                                                    <span className="badge nft-like-badge text-white"><i className="ri-heart-fill me-1 text-danger align-middle inline-block"></i>1.75k</span>
                                                </div>
                                            </div>
                                            <div className="box-body">
                                                <div className="flex items-center mb-4">
                                                    <div className="me-2 leading-none">
                                                        <span className="avatar avatar-rounded avatar-md">
                                                            <img src={face8} alt=""/>
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <p className="mb-0 font-semibold">PixelMaestro</p>
                                                        <p className="text-[0.75rem] text-[#8c9097] dark:text-white/50 mb-0">@pixelmaestro</p>
                                                    </div>
                                                </div>
                                                <p className="mb-0 text-white nft-auction-time">
                                                    04hrs : 24m : 38s
                                                </p>
                                                <p className="text-[.9375rem] font-semibold mb-2"><Link to="#">Pixel Prism</Link></p>
                                                <div className="flex flex-wrap align-itesm-center justify-between mb-4">
                                                    <div className="font-semibold">
                                                        Highest Bid -
                                                    </div>
                                                    <div className="flex flex-wrap items-center leading-none">
                                                        <span className="avatar avatar-xs me-1">
                                                            <img src={crypto} alt=""/>
                                                        </span>0.23ETH
                                                    </div>
                                                </div>
                                                <div className="grid">
                                                    <button type="button" className="ti-btn ti-btn-primary btn-wave waves-effect waves-light">Place Bid</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="xxl:col-span-2 xl:col-span-3 lg:col-span-4 md:col-span-4 sm:col-span-6 col-span-12">
                                        <div className="box custom-box">
                                            <img src={image26} className="!rounded-t-md" alt="..."/>
                                            <div className="flex items-center justify-between nft-like-section w-full px-4">
                                                <div className="flex-grow">
                                                    <button type="button" aria-label="button" className="ti-btn ti-btn-sm ti-btn-success-full !rounded-full btn-wave waves-effect waves-light">
                                                        <i className="ri-heart-fill"></i>
                                                    </button>
                                                </div>
                                                <div>
                                                    <span className="badge nft-like-badge text-white"><i className="ri-heart-fill me-1 text-danger align-middle inline-block"></i>0.83k</span>
                                                </div>
                                            </div>
                                            <div className="box-body">
                                                <div className="flex items-center mb-4">
                                                    <div className="me-2 leading-none">
                                                        <span className="avatar avatar-rounded avatar-md">
                                                            <img src={face9} alt=""/>
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <p className="mb-0 font-semibold">BitBard</p>
                                                        <p className="text-[0.75rem] text-[#8c9097] dark:text-white/50 mb-0">@bitbard</p>
                                                    </div>
                                                </div>
                                                <p className="mb-0 text-white nft-auction-time">
                                                    04hrs : 24m : 38s
                                                </p>
                                                <p className="text-[.9375rem] font-semibold mb-2"><Link to="#">Meta-Morphosis</Link></p>
                                                <div className="flex flex-wrap align-itesm-center justify-between mb-4">
                                                    <div className="font-semibold">
                                                        Highest Bid -
                                                    </div>
                                                    <div className="flex flex-wrap items-center leading-none">
                                                        <span className="avatar avatar-xs me-1">
                                                            <img src={crypto} alt=""/>
                                                        </span>0.38ETH
                                                    </div>
                                                </div>
                                                <div className="grid">
                                                    <button type="button" className="ti-btn ti-btn-primary btn-wave waves-effect waves-light">Place Bid</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane !p-0 hidden !border-0" id="nft-gaming" aria-controls="nft-gaming-item" role="tabpanel">
                                <div className="grid grid-cols-12 gap-6">
                                    <div className="xxl:col-span-2 xl:col-span-3 lg:col-span-4 md:col-span-4 sm:col-span-6 col-span-12">
                                        <div className="box custom-box">
                                            <img src={image18} className="!rounded-t-md" alt="..."/>
                                            <div className="flex items-center justify-between nft-like-section w-full px-4">
                                                <div className="flex-grow">
                                                    <button type="button" aria-label="button" className="ti-btn ti-btn-sm ti-btn-success-full !rounded-full btn-wave waves-effect waves-light">
                                                        <i className="ri-heart-fill"></i>
                                                    </button>
                                                </div>
                                                <div>
                                                    <span className="badge nft-like-badge text-white"><i className="ri-heart-fill me-1 text-danger align-middle inline-block"></i>0.47k</span>
                                                </div>
                                            </div>
                                            <div className="box-body">
                                                <div className="flex items-center mb-4">
                                                    <div className="me-2 leading-none">
                                                        <span className="avatar avatar-rounded avatar-md">
                                                            <img src={face1} alt=""/>
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <p className="mb-0 font-semibold">NFTNinja</p>
                                                        <p className="text-[0.75rem] text-[#8c9097] dark:text-white/50 mb-0">@nftninja</p>
                                                    </div>
                                                </div>
                                                <p className="mb-0 text-white nft-auction-time">
                                                    04hrs : 24m : 38s
                                                </p>
                                                <p className="text-[.9375rem] font-semibold mb-2"><Link to="#">Digital Dreamscape</Link></p>
                                                <div className="flex flex-wrap align-itesm-center justify-between mb-4">
                                                    <div className="font-semibold">
                                                        Highest Bid -
                                                    </div>
                                                    <div className="flex flex-wrap items-center leading-none">
                                                        <span className="avatar avatar-xs me-1">
                                                            <img src={crypto} alt=""/>
                                                        </span>0.24ETH
                                                    </div>
                                                </div>
                                                <div className="grid">
                                                    <button type="button" className="ti-btn ti-btn-primary btn-wave waves-effect waves-light">Place Bid</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="xxl:col-span-2 xl:col-span-3 lg:col-span-4 md:col-span-4 sm:col-span-6 col-span-12">
                                        <div className="box custom-box">
                                            <img src={image20} className="!rounded-t-md" alt="..."/>
                                            <div className="flex items-center justify-between nft-like-section w-full px-4">
                                                <div className="flex-grow">
                                                    <button type="button" aria-label="button" className="ti-btn ti-btn-sm ti-btn-success-full !rounded-full btn-wave waves-effect waves-light">
                                                        <i className="ri-heart-fill"></i>
                                                    </button>
                                                </div>
                                                <div>
                                                    <span className="badge nft-like-badge text-white"><i className="ri-heart-fill me-1 text-danger align-middle inline-block"></i>2.05k</span>
                                                </div>
                                            </div>
                                            <div className="box-body">
                                                <div className="flex items-center mb-4">
                                                    <div className="me-2 leading-none">
                                                        <span className="avatar avatar-rounded avatar-md">
                                                            <img src={face3} alt=""/>
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <p className="mb-0 font-semibold">BitMaster</p>
                                                        <p className="text-[0.75rem] text-[#8c9097] dark:text-white/50 mb-0">@bit_master</p>
                                                    </div>
                                                </div>
                                                <p className="mb-0 text-white nft-auction-time">
                                                    04hrs : 24m : 38s
                                                </p>
                                                <p className="text-[.9375rem] font-semibold mb-2"><Link to="#">Chromatic Chaos</Link></p>
                                                <div className="flex flex-wrap align-itesm-center justify-between mb-4">
                                                    <div className="font-semibold">
                                                        Highest Bid -
                                                    </div>
                                                    <div className="flex flex-wrap items-center leading-none">
                                                        <span className="avatar avatar-xs me-1">
                                                            <img src={crypto} alt=""/>
                                                        </span>0.19ETH
                                                    </div>
                                                </div>
                                                <div className="grid">
                                                    <button type="button" className="ti-btn ti-btn-primary btn-wave waves-effect waves-light">Place Bid</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane !p-0 hidden !border-0" id="nft-domain" aria-controls="nft-domain-item" role="tabpanel">
                               
                            </div>
                            <div className="tab-pane !p-0 hidden !border-0" id="nft-music" aria-controls="nft-music-item" role="tabpanel">
                           
                            </div>
                            <div className="tab-pane !p-0 hidden !border-0" id="nft-realestate" aria-controls="nft-realestate-item" role="tabpanel">
                          
                            </div>
                            <div className="tab-pane !p-0 hidden !border-0" id="nft-sports" aria-controls="nft-sports-item" role="tabpanel">
                         
                            </div>
                            <div className="tab-pane !p-0 hidden !border-0" id="nft-fashion" aria-controls="nft-fashion-item" role="tabpanel">
                           
                            </div>
                            <div className="tab-pane !p-0 hidden !border-0" id="nft-avatars" aria-controls="nft-avatars-item" role="tabpanel">
                          
                            </div>
                            <div className="tab-pane !p-0 hidden !border-0" id="nft-memes" aria-controls="nft-memes-item" role="tabpanel">
                         
                            </div>
                        </div>
                    </div>
                </div>
  </Fragment>
);}

export default Marketplace;
