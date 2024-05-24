import  { FC, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Pageheader from '../../../../components/common/pageheader/pageheader';
import image34 from "../../../../assets/images/nft-images/34.png";
import image35 from "../../../../assets/images/nft-images/35.png";
import image36 from "../../../../assets/images/nft-images/36.png";
import image37 from "../../../../assets/images/nft-images/37.png";
import image39 from "../../../../assets/images/nft-images/39.png";
import image38 from "../../../../assets/images/nft-images/38.png";
import image40 from "../../../../assets/images/nft-images/40.png";
import image41 from "../../../../assets/images/nft-images/41.png";
import image42 from "../../../../assets/images/nft-images/42.png";
import image43 from "../../../../assets/images/nft-images/43.png";
import image44 from "../../../../assets/images/nft-images/44.png";
import image45 from "../../../../assets/images/nft-images/45.png";

interface WalletintegrationProps {}

const Walletintegration: FC<WalletintegrationProps> = () => {
  return(
  <Fragment>
      <Pageheader currentpage="Wallet Integration" activepage="NFT" mainpage="Wallet Integration" />
            <div className="container">
                <div className="grid grid-cols-12 gap-6">
                    <div className="xl:col-span-3 col-span-12">
                        <div className="box custom-box overflow-hidden">
                            <div className="box-header !border-b-0">
                                <div className="box-title">
                                    Choose Network
                                </div>
                            </div>
                            <div className="box-body !p-0">
                                <ul className="list-group nft-list">
                                    <li className="list-group-item">
                                        <Link aria-label="anchor" to="#" className="stretched-link"></Link>
                                        <div className="flex items-center gap-2">
                                            <div>
                                                <span className="avatar avatar-rounded avatar-sm bg-light p-1">
                                                    <img src={image34} alt="" />
                                                </span>
                                            </div>
                                            <div className="text-[.875rem] font-semibold my-auto">Etherium</div>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <Link aria-label="anchor" to="#" className="stretched-link"></Link>
                                        <div className="flex items-center gap-2">
                                            <div>
                                                <span className="avatar avatar-rounded avatar-sm bg-light p-1">
                                                    <img src={image35} alt="" />
                                                </span>
                                            </div>
                                            <div className="text-[.875rem] font-semibold my-auto">Binance</div>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <Link aria-label="anchor" to="#" className="stretched-link"></Link>
                                        <div className="flex items-center gap-2">
                                            <div>
                                                <span className="avatar avatar-rounded avatar-sm bg-light p-1">
                                                    <img src={image36} alt="" />
                                                </span>
                                            </div>
                                            <div className="text-[.875rem] font-semibold my-auto">Solana</div>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <Link aria-label="anchor" to="#" className="stretched-link"></Link>
                                        <div className="flex items-center gap-2">
                                            <div>
                                                <span className="avatar avatar-rounded avatar-sm bg-light p-1">
                                                    <img src={image39} alt="" />
                                                </span>
                                            </div>
                                            <div className="text-[.875rem] font-semibold my-auto">Tezos</div>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <Link aria-label="anchor" to="#" className="stretched-link"></Link>
                                        <div className="flex items-center gap-2">
                                            <div>
                                                <span className="avatar avatar-rounded avatar-sm bg-light p-1">
                                                    <img src={image37} alt="" />
                                                </span>
                                            </div>
                                            <div className="text-[.875rem] font-semibold my-auto">Avalanche</div>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <Link aria-label="anchor" to="#" className="stretched-link"></Link>
                                        <div className="flex items-center gap-2">
                                            <div>
                                                <span className="avatar avatar-rounded avatar-sm bg-light p-1">
                                                    <img src={image38} alt="" />
                                                </span>
                                            </div>
                                            <div className="text-[.875rem] font-semibold my-auto">boxano</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="xl:col-span-9 col-span-12">
                        <div className="box custom-box">
                            <div className="box-header justify-between">
                                <div className="box-title">
                                    Choose Wallet
                                </div>
                                <div>
                                    <button type="button" className="ti-btn ti-btn-secondary-full btn-wave">Add New Wallet</button>
                                </div>
                            </div>
                            <div className="box-body !p-6">
                                <div className="grid grid-cols-12 !mx-auto sm:gap-6 gap-2">
                                    <div className="xxl:col-span-3 xl:col-span-4 md:col-span-6 col-span-12">
                                        <div className="p-4 nft-wallet active">
                                            <Link aria-label="anchor" to="#" className="stretched-link"></Link>
                                            <div className="flex items-center justify-center gap-4">
                                                <div className="leadining-none">
                                                    <span className="avatar avatar-rounded p-2 bg-light">
                                                        <img src={image42} alt="" />
                                                    </span>
                                                </div>
                                                <div>
                                                    <h6 className="font-semibold mb-0">MetaMask</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="xxl:col-span-3 xl:col-span-4 md:col-span-6 col-span-12">
                                        <div className="p-4 text-center hover:bg-light border dark:border-defaultborder/10 rounded-md relative">
                                            <Link aria-label="anchor" to="#" className="stretched-link"></Link>
                                            <div className="flex items-center justify-center gap-4">
                                                <div className="lh-1">
                                                    <span className="avatar avatar-rounded p-2 bg-light">
                                                        <img src={image41} alt="" />
                                                    </span>
                                                </div>
                                                <div>
                                                    <h6 className="font-semibold mb-0">Enjin Wallet</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="xxl:col-span-3 xl:col-span-4 md:col-span-6 col-span-12">
                                        <div className="p-4 text-center hover:bg-light border dark:border-defaultborder/10 rounded-md relative">
                                            <Link aria-label="anchor" to="#" className="stretched-link"></Link>
                                            <div className="flex items-center justify-center gap-4">
                                                <div className="lh-1">
                                                    <span className="avatar avatar-rounded bg-light">
                                                        <img src={image43} alt="" />
                                                    </span>
                                                </div>
                                                <div>
                                                    <h6 className="font-semibold mb-0">Trust Wallet</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="xxl:col-span-3 xl:col-span-4 md:col-span-6 col-span-12">
                                        <div className="p-3 !text-center hover:bg-light border dark:border-defaultborder/10 rounded-md relative">
                                            <Link aria-label="anchor" to="#" className="stretched-link"></Link>
                                            <div className="flex items-center justify-center gap-4">
                                                <div className="lh-1">
                                                    <span className="avatar avatar-rounded bg-light p-2">
                                                        <img src={image40} alt="" />
                                                    </span>
                                                </div>
                                                <div>
                                                    <h6 className="font-semibold mb-0">Coinbase Wallet</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="xxl:col-span-3 xl:col-span-4 md:col-span-6 col-span-12">
                                        <div className="p-4 !text-center hover:bg-light border dark:border-defaultborder/10 rounded-md relative">
                                            <Link aria-label="anchor" to="#" className="stretched-link"></Link>
                                            <div className="flex items-center justify-center gap-4">
                                                <div className="lh-1">
                                                    <span className="avatar avatar-rounded bg-light p-2">
                                                        <img src={image44} alt="" />
                                                    </span>
                                                </div>
                                                <div>
                                                    <h6 className="font-semibold mb-0">Lido</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="xxl:col-span-3 xl:col-span-4 md:col-span-6 col-span-12">
                                        <div className="p-4 text-center hover:bg-light border dark:border-defaultborder/10 rounded-md relative">
                                            <Link aria-label="anchor" to="#" className="stretched-link"></Link>
                                            <div className="flex items-center justify-center gap-4">
                                                <div className="lh-1">
                                                    <span className="avatar avatar-rounded bg-light">
                                                        <img src={image45} alt="" />
                                                    </span>
                                                </div>
                                                <div>
                                                    <h6 className="font-semibold mb-0">Huobi Wallet</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="box-footer">
                                <div>
                                    <button type="button" className="ti-btn ti-btn-success-full ltr:float-right rtl:float-left btn-wave">Connect</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  </Fragment>
);}

export default Walletintegration;
