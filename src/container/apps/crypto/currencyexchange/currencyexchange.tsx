import  { FC, Fragment } from 'react';
import Pageheader from '../../../../components/common/pageheader/pageheader';
import bitcoin from "../../../../assets/images/crypto-currencies/regular/Bitcoin.svg";
import litecoin from "../../../../assets/images/crypto-currencies/square-color/Litecoin.svg";
import ethereum from "../../../../assets/images/crypto-currencies/square-color/Ethereum.svg";
import dash from "../../../../assets/images/crypto-currencies/square-color/Dash.svg";
import ripple from "../../../../assets/images/crypto-currencies/square-color/Ripple.svg";
import golem from "../../../../assets/images/crypto-currencies/square-color/Golem.svg";
import monero from "../../../../assets/images/crypto-currencies/square-color/Monero.svg";
import eos from "../../../../assets/images/crypto-currencies/square-color/EOS.svg";
import Select from 'react-select';
import { CurrencyBTC, CurrencyDASH, CurrencyETH, CurrencyLTC, CurrencyOptions1, CurrencyOptions2, EOS, GLM, Monero, XRS } from './exchangedata';

interface CurrencyexchangeProps {}

const Currencyexchange: FC<CurrencyexchangeProps> = () =>{ 
  return(
  <Fragment>
     <Pageheader currentpage="Currency Exchange" activepage="Crypto" mainpage="Currency Exchange" />
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box custom-box currency-exchange-box">
                        <div className="box-body !p-[3rem] flex items-center justify-center">
                            <div className="container">
                                <h3 className="text-white text-center">Buy and Sell Coins without additional fees</h3>
                                <span className="block text-[1rem] text-white text-center opacity-[0.8] !mb-4 ">
                                    Buy now and get +50% extra bonus Minimum pre-sale amount 100 Crypto Coin. We accept BTC crypto-currency..
                                </span>
                                <div className="p-4 mb-4 rounded currency-exchange-area">
                                    <div className="grid grid-cols-12 sm:gap-4 gap-2">
                                        <div className="xxl:col-span-3 col-span-12">
                                            <input type="text" className="form-control" defaultValue="0.0453" placeholder="Enter Amount" />
                                        </div>
                                        <div className="xxl:col-span-2 col-span-12">
                                            <div>
                                                <Select name="colors" options={CurrencyOptions1}
                                                    placeholder="Bitcoin" classNamePrefix='Select2' className=""
                                                    defaultValue={[CurrencyOptions1[0]]} menuPlacement='auto' />
                                            </div>
                                        </div>
                                        <div className="xxl:col-span-2 col-span-12 flex items-center justify-center">
                                            <div className="!text-[0.9rem] text-white text-center op-8 leading-none">
                                                =
                                            </div>
                                        </div>
                                        <div className="xxl:col-span-3 col-span-12">
                                            <input type="text" className="form-control" defaultValue="1350.93" placeholder="Exchange Amount" />
                                        </div>
                                        <div className="xxl:col-span-2 col-span-12">
                                            <Select name="colors" options={CurrencyOptions2} className=""
                                                defaultValue={[CurrencyOptions2[0]]} menuPlacement='auto' classNamePrefix="Select2" />
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <button type="button" className="ti-btn ti-btn-success-full btn-wave">Exchange Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-x-6 justify-center">
                    <div className="xl:col-span-3 col-span-12">
                        <div className="box custom-box overflow-hidden">
                            <div className="box-body mb-4">
                                <div className="flex items-start justify-between mb-4 flex-wrap">
                                    <div>
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="leading-none">
                                                <span className="avatar avatar-rounded avatar-xs">
                                                    <img src={bitcoin} alt=""/>
                                                </span>
                                            </div>
                                            <h6 className="font-semibold mb-0">Bitcoin - BTC</h6>
                                        </div>
                                        <span className="text-[1.5625rem] flex items-center">24.3% <span className="text-[0.75rem] text-warning opacity-[0.7] ms-2">+0.59<i className="ti ti-arrow-big-up-line ms-1 inline-flex"></i></span><span className="badge bg-success-transparent text-[.625rem] ms-2">24H</span></span>
                                    </div>
                                    <div className="text-end">
                                        <span className="block text-[.875rem] mb-1 text-primary">0.00434</span>
                                        <span className="block text-success font-semibold">$30.29</span>
                                    </div>
                                </div>
                            </div>
                            <div id="btc-currency-chart" className="mt-1 w-full">
                                <CurrencyBTC/>
                            </div>
                        </div>
                    </div>
                    <div className="xl:col-span-3 col-span-12">
                        <div className="box custom-box overflow-hidden">
                            <div className="box-body mb-4">
                                <div className="flex items-start justify-between mb-4 flex-wrap">
                                    <div>
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="leading-none">
                                                <span className="avatar avatar-rounded avatar-xs">
                                                    <img src={ethereum} alt=""/>
                                                </span>
                                            </div>
                                            <h6 className="font-semibold mb-0">Etherium - ETH</h6>
                                        </div>
                                        <span className="text-[1.5625rem] flex items-center">17.67% <span className="text-[0.75rem] text-warning opacity-[0.7] ms-2">+1.30<i className="ti ti-arrow-big-up-line ms-1 inline-flex"></i></span></span>
                                    </div>
                                    <div className="text-end">
                                        <span className="block text-[.875rem] mb-1 text-secondary">1.2923</span>
                                        <span className="block text-success font-semibold">$2,283.73</span>
                                    </div>
                                </div>
                            </div>
                            <div id="eth-currency-chart" className="mt-1 w-full">
                                <CurrencyETH/>
                            </div>
                        </div>
                    </div>
                    <div className="xl:col-span-3 col-span-12">
                        <div className="box custom-box overflow-hidden">
                            <div className="box-body mb-4">
                                <div className="flex items-start justify-between mb-4 flex-wrap">
                                    <div>
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="leading-none">
                                                <span className="avatar avatar-rounded avatar-xs">
                                                    <img src={dash} alt=""/>
                                                </span>
                                            </div>
                                            <h6 className="font-semibold mb-0">Dash - DASH</h6>
                                        </div>
                                        <span className="text-[1.5625rem] flex items-center">17.67% <span className="text-[0.75rem] text-warning opacity-[0.7] ms-2">+1.30<i className="ti ti-arrow-big-up-line ms-1 inline-flex"></i></span></span>
                                    </div>
                                    <div className="text-end">
                                        <span className="block text-[.875rem] mb-1 text-success">1.2923</span>
                                        <span className="block text-success font-semibold">$2,283.73</span>
                                    </div>
                                </div>
                            </div>
                            <div id="dash-currency-chart" className="mt-1 w-full">
                                <CurrencyDASH/>
                            </div>
                        </div>
                    </div>
                    <div className="xl:col-span-3 col-span-12">
                        <div className="box custom-box overflow-hidden">
                            <div className="box-body mb-4">
                                <div className="flex items-start justify-between mb-4 flex-wrap">
                                    <div>
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="leading-none">
                                                <span className="avatar avatar-rounded avatar-xs">
                                                    <img src={litecoin} alt=""/>
                                                </span>
                                            </div>
                                            <h6 className="font-semibold mb-0">Litecoin - LTC</h6>
                                        </div>
                                        <span className="text-[1.5625rem] flex items-center">17.67% <span className="text-[0.75rem] text-warning opacity-[0.7] ms-2">+1.30<i className="ti ti-arrow-big-up-line ms-1 inline-flex"></i></span></span>
                                    </div>
                                    <div className="text-end">
                                        <span className="block text-[.875rem] mb-1 text-warning">1.2923</span>
                                        <span className="block text-success font-semibold">$2,283.73</span>
                                    </div>
                                </div>
                            </div>
                            <div id="ltc-currency-chart" className="mt-1 w-full">
                                <CurrencyLTC/>
                            </div>
                        </div>
                    </div>
                    <div className="xl:col-span-3 col-span-12">
                        <div className="box custom-box overflow-hidden">
                            <div className="box-body mb-4">
                                <div className="flex items-start justify-between mb-4 flex-wrap">
                                    <div>
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="leading-none">
                                                <span className="avatar avatar-rounded avatar-xs">
                                                    <img src={ripple} alt=""/>
                                                </span>
                                            </div>
                                            <h6 className="font-semibold mb-0">Ripple - XRS</h6>
                                        </div>
                                        <span className="text-[1.5625rem] flex items-center">17.67% <span className="text-[0.75rem] text-warning opacity-[0.7] ms-2">+1.30<i className="ti ti-arrow-big-up-line ms-1 inline-flex"></i></span></span>
                                    </div>
                                    <div className="text-end">
                                        <span className="block text-[.875rem] mb-1 text-pink">1.2923</span>
                                        <span className="block text-success font-semibold">$2,283.73</span>
                                    </div>
                                </div>
                            </div>
                            <div id="xrs-currency-chart" className="mt-1 w-full">
                                <XRS/>
                            </div>
                        </div>
                    </div>
                    <div className="xl:col-span-3 col-span-12">
                        <div className="box custom-box overflow-hidden">
                            <div className="box-body mb-4">
                                <div className="flex items-start justify-between mb-4 flex-wrap">
                                    <div>
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="leading-none">
                                                <span className="avatar avatar-rounded avatar-xs">
                                                    <img src={golem} alt=""/>
                                                </span>
                                            </div>
                                            <h6 className="font-semibold mb-0">Golem - GLM</h6>
                                        </div>
                                        <span className="text-[1.5625rem] flex items-center">17.67% <span className="text-[0.75rem] text-warning opacity-[0.7] ms-2">+1.30<i className="ti ti-arrow-big-up-line ms-1 inline-flex"></i></span></span>
                                    </div>
                                    <div className="text-end">
                                        <span className="block text-[.875rem] mb-1 text-purple">1.2923</span>
                                        <span className="block text-success font-semibold">$2,283.73</span>
                                    </div>
                                </div>
                            </div>
                            <div id="glm-currency-chart" className="mt-1 w-full">
                                <GLM/>
                            </div>
                        </div>
                    </div>
                    <div className="xl:col-span-3 col-span-12">
                        <div className="box custom-box overflow-hidden">
                            <div className="box-body mb-4">
                                <div className="flex items-start justify-between mb-4 flex-wrap">
                                    <div>
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="leading-none">
                                                <span className="avatar avatar-rounded avatar-xs">
                                                    <img src={monero} alt=""/>
                                                </span>
                                            </div>
                                            <h6 className="font-semibold mb-0">Monero</h6>
                                        </div>
                                        <span className="text-[1.5625rem] flex items-center">17.67% <span className="text-[0.75rem] text-warning opacity-[0.7] ms-2">+1.30<i className="ti ti-arrow-big-up-line ms-1 inline-flex"></i></span></span>
                                    </div>
                                    <div className="text-end">
                                        <span className="block text-[.875rem] mb-1 text-danger">1.2923</span>
                                        <span className="block text-success font-semibold">$2,283.73</span>
                                    </div>
                                </div>
                            </div>
                            <div id="monero-currency-chart" className="mt-1 w-full">
                                <Monero/>
                            </div>
                        </div>
                    </div>
                    <div className="xl:col-span-3 col-span-12">
                        <div className="box custom-box overflow-hidden">
                            <div className="box-body mb-4">
                                <div className="flex items-start justify-between mb-4 flex-wrap">
                                    <div>
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="leading-none">
                                                <span className="avatar avatar-rounded avatar-xs">
                                                    <img src={eos} alt=""/>
                                                </span>
                                            </div>
                                            <h6 className="font-semibold mb-0">EOS</h6>
                                        </div>
                                        <span className="text-[1.5625rem] flex items-center">17.67% <span className="text-[0.75rem] text-warning opacity-[0.7] ms-2">+1.30<i className="ti ti-arrow-big-up-line ms-1 inline-flex"></i></span></span>
                                    </div>
                                    <div className="text-end">
                                        <span className="block text-[.875rem] mb-1 text-info">1.2923</span>
                                        <span className="block text-success font-semibold">$2,283.73</span>
                                    </div>
                                </div>
                            </div>
                            <div id="eos-currency-chart" className="mt-1 w-full">
                                <EOS/>
                            </div>
                        </div>
                    </div>
                    <div className="xl:col-span-12 col-span-12">
                         <div className="text-center my-6">
                            <button className="ti-btn ti-btn-primary !border !border-primary" type="button" disabled>
                                <span className="ti-spinner  !w-[1rem] !h-[1rem] align-middle" role="status"
                                    aria-hidden="true"></span>
                                Loading...
                            </button>
                        </div>
                    </div>
                </div>
  </Fragment>
);}

export default Currencyexchange;
