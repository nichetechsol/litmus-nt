import  { FC, Fragment } from 'react';
import Pageheader from '../../../components/common/pageheader/pageheader';
import Showcode from '../../../components/ui/showcode/showcode';
import { object1, object10, object11, object12, object13, object14, object15, object2, object3, object4, object5, object6, object7, object8, object9 } from '../../../components/ui/data/uielementsdata';
import media28 from "../../../assets/images/media/media-28.jpg";
import  video1 from "../../../assets/video/1.mp4"

interface ObjectfitProps {}

const Objectfit: FC<ObjectfitProps> = () => {
  return(
  <Fragment>
              <Pageheader currentpage="Object Fit" activepage="Ui Elements" mainpage="Object Fit" />
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xxl:col-span-3 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                    <Showcode title="Object Fit Contain" code={object1} customCardBodyClass="object-fit-container">
                            <img src={media28}
                                className="object-contain border dark:border-defaultborder/10 !rounded-md"
                                alt="..." />
                        </Showcode>
                </div>
                <div className="xxl:col-span-3 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                        <Showcode title="Object Fit Cover" code={object2} customCardBodyClass="object-fit-container">
                            <img src={media28}
                                className="object-cover border dark:border-defaultborder/10 !rounded-md"
                                alt="..." />
                        </Showcode>
                </div>
                <div className="xxl:col-span-3 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                        <Showcode title="Object Fit Fill" code={object3} customCardBodyClass="object-fit-container">
                            <img src={media28}
                                className="object-fill border dark:border-defaultborder/10 !rounded-md"
                                alt="..." />
                        </Showcode>
                </div>
                <div className="xxl:col-span-3 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                        <Showcode title="Object Fit Scale Down" code={object4} customCardBodyClass="object-fit-container">
                            <img src={media28}
                                className="object-scale-down border dark:border-defaultborder/10 !rounded-md"
                                alt="..." />
                        </Showcode>
                </div>
                <div className="xxl:col-span-3 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                <Showcode title="Object Fit None" code={object5} customCardBodyClass="object-fit-container">
                            <img src={media28}
                                className="object-none border dark:border-defaultborder/10 !rounded-md"
                                alt="..." />
                        </Showcode>
                </div>
                <div className="xxl:col-span-3 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                <Showcode title="Object Fit Contain (SM -responsive)" code={object6} customCardBodyClass="object-fit-container">
                            <img src={media28}
                                className="sm:object-contain border dark:border-defaultborder/10 !rounded-md"
                                alt="..." />
                        </Showcode>
                </div>
                <div className="xxl:col-span-3 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                <Showcode title="Object Fit Contain (MD -responsive)" code={object7} customCardBodyClass="object-fit-container">
                            <img src={media28}
                                className="md:object-contain border dark:border-defaultborder/10 !rounded-md"
                                alt="..." />
                        </Showcode>
                </div>
                <div className="xxl:col-span-3 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                <Showcode title="Object Fit Contain (LG -responsive)" code={object8} customCardBodyClass="object-fit-container">
                            <img src={media28}
                                className="lg:object-contain border dark:border-defaultborder/10 !rounded-md"
                                alt="..." />
                        </Showcode>
                </div>
                <div className="xxl:col-span-3 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                <Showcode title="Object Fit Contain (XL -responsive)" code={object9} customCardBodyClass="object-fit-container">
                            <img src={media28}
                                className="xl:object-contain border dark:border-defaultborder/10 !rounded-md"
                                alt="..." />
                        </Showcode>
                </div>
                <div className="xxl:col-span-3 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                <Showcode title="Object Fit Contain (XXL -responsive)" code={object10} customCardBodyClass="object-fit-container">
                            <img src={media28}
                                className="xxl:object-contain border dark:border-defaultborder/10 !rounded-md"
                                alt="..." />
                        </Showcode>
                </div>
                <div className="xxl:col-span-3 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                    <Showcode title="Object Fit Contain Video" customCardBodyClass="object-fit-container" code={object11}>
                            <video src={video1}
                                className="object-contain !rounded-md border dark:border-defaultborder/10"
                                autoPlay loop muted></video>
                        </Showcode>
                </div>
                <div className="xxl:col-span-3 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                <Showcode title="Object Fit Cover Video" customCardBodyClass="object-fit-container" code={object12}>
                            <video src={video1}
                                className="object-cover !rounded-md border dark:border-defaultborder/10"
                                autoPlay loop muted></video>
                        </Showcode>
                </div>
                <div className="xxl:col-span-3 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                <Showcode title="Object Fit Fill Video" customCardBodyClass="object-fit-container" code={object13}>
                            <video src={video1}
                                className="object-fill !rounded-md border dark:border-defaultborder/10"
                                autoPlay loop muted></video>
                        </Showcode>
                </div>
                <div className="xxl:col-span-3 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                <Showcode title="Object Fit Scale Video" customCardBodyClass="object-fit-container" code={object14}>
                            <video src={video1}
                                className="object-scale-down !rounded-md border dark:border-defaultborder/10"
                                autoPlay loop muted></video>
                        </Showcode>
                </div>
                <div className="xxl:col-span-3 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                <Showcode title="Object Fit None Video" customCardBodyClass="object-fit-container" code={object15}>
                            <video src={video1}
                                className="object-none !rounded-md border dark:border-defaultborder/10"
                                autoPlay loop muted></video>
                        </Showcode>
                </div>
            </div>
  </Fragment>
);}

export default Objectfit;
