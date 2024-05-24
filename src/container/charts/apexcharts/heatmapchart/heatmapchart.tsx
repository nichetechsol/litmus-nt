import  { FC, Fragment } from 'react';
import Pageheader from '../../../../components/common/pageheader/pageheader';
import { Basiheatmap, Colorrange, Multiseriesheatmap, Shadesheatmap } from './heatmapdata';


interface HeatmapchartProps {}

const Heatmapchart: FC<HeatmapchartProps> = () => {
  return(
  <Fragment>
      <Pageheader currentpage="Apex Heatmap Charts" activepage="Apex Charts" mainpage="Apex Heatmap Charts" />
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">Basic Heatmap Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="heatmap-basic">
                                <Basiheatmap/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">Multi Series Heatmap Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="heatmap-multiseries">
                            <Multiseriesheatmap/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">Color Range Heatmap Chart</div>
                        </div>
                        <div className="box-body">
                            <div id="heatmap-colorrange">
                                <Colorrange/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">Heatmap Range Without Shades</div>
                        </div>
                        <div className="box-body">
                            <div id="heatmap-range">
                                <Shadesheatmap/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  </Fragment>
);}

export default Heatmapchart;
