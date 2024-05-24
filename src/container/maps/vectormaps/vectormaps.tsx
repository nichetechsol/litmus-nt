import  { FC, Fragment, useState } from 'react';
import Pageheader from '../../../components/common/pageheader/pageheader';
import { MapAnnotation, Shapeworldmap, USState, WorldMap } from './vectordata';


interface VectormapsProps {}

const Vectormaps: FC<VectormapsProps> = () => {
  const [content, setContent] = useState("");
  return(
  <Fragment>
      <>
            <Pageheader currentpage="Vector Maps" activepage="Maps" mainpage="Vector Maps" />
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">Basic Vector Map</div>
                        </div>
                        <div className="box-body">
                            <div id="vector-map">  <WorldMap setTooltipContent={setContent} />
                                {content}</div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">Graticule Map</div>
                        </div>
                        <div className="box-body">
                            <div id="marker-map">  <Shapeworldmap/></div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">Annotation Map</div>
                        </div>
                        <div className="box-body">
                            <div id="marker-image-map">  <MapAnnotation/></div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">USA Map</div>
                        </div>
                        <div className="box-body">
                            <div id="lines-map"> <USState/></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
  </Fragment>
);}

export default Vectormaps;
