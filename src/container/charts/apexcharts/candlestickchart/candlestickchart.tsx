import  { FC, Fragment } from 'react';
import Pageheader from '../../../../components/common/pageheader/pageheader';
import { Basiccandlestick, Candlebrush, Candleline, Candlexaxis } from './candlestickdata';


interface CandlestickchartProps {}

const Candlestickchart: FC<CandlestickchartProps> = () =>{
  return (
  <Fragment>
    <Pageheader currentpage="Apex CandleStick Charts" activepage="Apec Charts" mainpage="Apex CandleStick Charts" />
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">Basic Candlestick Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="candlestick-basic">
                                <Basiccandlestick/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">Candlestick Synced With Brush Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="chart-candlestick">
                                <Candlebrush/>
                            </div>
                            <div id="chart-bar"></div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">Candlestick With Cateory X-axis</div>
                        </div>
                        <div className="box-body">
                            <div id="candlestick-categoryx">
                                <Candlexaxis/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">Candlestick With Line Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="candlestick-line">
                                <Candleline/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  </Fragment>
);}

export default Candlestickchart;
