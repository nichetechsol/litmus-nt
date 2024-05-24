import  { FC, Fragment } from 'react';
import Pageheader from '../../../components/common/pageheader/pageheader';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Autoplay, Pagination, Navigation, Scrollbar, Mousewheel, Keyboard,
  EffectCube, EffectFade, EffectFlip, EffectCoverflow
} from 'swiper/modules';
import media25 from "../../../assets/images/media/media-25.jpg";


import media26 from "../../../assets/images/media/media-26.jpg";
import media27 from "../../../assets/images/media/media-27.jpg";
import media28 from "../../../assets/images/media/media-28.jpg";
import media29 from "../../../assets/images/media/media-29.jpg";
import media30 from "../../../assets/images/media/media-30.jpg";
import media31 from "../../../assets/images/media/media-31.jpg";
import media32 from "../../../assets/images/media/media-32.jpg";
import media33 from "../../../assets/images/media/media-33.jpg";
import media21 from "../../../assets/images/media/media-21.jpg";
import media17 from "../../../assets/images/media/media-17.jpg";
import media16 from "../../../assets/images/media/media-16.jpg";
import media12 from "../../../assets/images/media/media-12.jpg";
import media5 from "../../../assets/images/media/media-5.jpg";
import media8 from "../../../assets/images/media/media-8.jpg";
import media62 from "../../../assets/images/media/media-62.jpg";
import media63 from "../../../assets/images/media/media-63.jpg";
import media64 from "../../../assets/images/media/media-64.jpg";
import media18 from "../../../assets/images/media/media-18.jpg";
import media19 from "../../../assets/images/media/media-19.jpg";
import media20 from "../../../assets/images/media/media-20.jpg";
import media40 from "../../../assets/images/media/media-40.jpg";
import media41 from "../../../assets/images/media/media-41.jpg";
import media42 from "../../../assets/images/media/media-42.jpg";
import media43 from "../../../assets/images/media/media-43.jpg";
import media44 from "../../../assets/images/media/media-44.jpg";
import media59 from "../../../assets/images/media/media-59.jpg";
import media46 from "../../../assets/images/media/media-46.jpg";
import media61 from "../../../assets/images/media/media-61.jpg";
interface SwiperjsProps {}

const Swiperjs: FC<SwiperjsProps> = () => {
    const pagination = {
        clickable: true,
        renderBullet: function (index: any, className: any) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    };
  return(
  <Fragment>
                <Pageheader currentpage="swiper" activepage=" Advanced Ui" mainpage="swiper" />

<div className="grid grid-cols-12 gap-x-6">
    <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
        <div className="box custom-box">
            <div className="box-header">
                <div className="box-title">
                    Basic Swiper
                </div>
            </div>
            <div className="box-body">
                <div className="swiper swiper-basic">
                <Swiper spaceBetween={30} centeredSlides={true} autoplay={{ delay: 2500, disableOnInteraction: false, }}
                    modules={[Autoplay]} className="mySwiper swiper swiper-basic">
                        <SwiperSlide><img src={media27} className="!rounded-md" alt="" /></SwiperSlide>
                        <SwiperSlide><img src={media26} className="!rounded-md" alt="" /></SwiperSlide>
                        <SwiperSlide><img src={media25} className="!rounded-md" alt="" /></SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </div>
    </div>
    <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
        <div className="box custom-box">
            <div className="box-header">
                <div className="box-title">
                    Swiper With Navigation
                </div>
            </div>
            <div className="box-body">
                <div className="swiper swiper-navigation">
                <Swiper spaceBetween={30} centeredSlides={true} navigation={true} modules={[Navigation]} className="mySwiper">
                        <SwiperSlide><img src={media29} className="!rounded-md" alt="" /></SwiperSlide>
                        <SwiperSlide><img src={media28} className="!rounded-md" alt="" /></SwiperSlide>
                        <SwiperSlide><img src={media30} className="!rounded-md" alt="" /></SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </div>
    </div>
    <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
        <div className="box custom-box">
            <div className="box-header">
                <div className="box-title">
                    Swiper with Pagination
                </div>
            </div>
            <div className="box-body">
            <Swiper spaceBetween={30} centeredSlides={true} autoplay={{ delay: 2500, disableOnInteraction: false, }} pagination={{ clickable: true, }} modules={[Pagination, Autoplay]} className="mySwiper">
                        <SwiperSlide><img src={media32} className="!rounded-md" alt="" /></SwiperSlide>
                        <SwiperSlide><img src={media31} className="!rounded-md" alt="" /></SwiperSlide>
                        <SwiperSlide><img src={media33} className="!rounded-md" alt="" /></SwiperSlide>
                   </Swiper>
            </div>
        </div>
    </div>
    <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
        <div className="box custom-box">
            <div className="box-header">
                <div className="box-title">
                    Dynamic Pagination
                </div>
            </div>
            <div className="box-body">
            <Swiper autoplay={{ delay: 2500, disableOnInteraction: false, }} pagination={{ dynamicBullets: true, clickable: true, }} modules={[Pagination, Autoplay]} className="mySwiper">
                        <SwiperSlide><img src={media21} className="!rounded-md" alt="" /></SwiperSlide>
                        <SwiperSlide><img src={media17} className="!rounded-md" alt="" /></SwiperSlide>
                        <SwiperSlide><img src={media16} className="!rounded-md" alt="" /></SwiperSlide>
                    </Swiper>
            </div>
        </div>
    </div>
    <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
        <div className="box custom-box">
            <div className="box-header">
                <div className="box-title">
                    Pagination With Progress
                </div>
            </div>
            <div className="box-body">
            <Swiper pagination={{ type: 'progressbar', }} autoplay={{ delay: 2500, disableOnInteraction: false, }} navigation={true} modules={[Pagination, Navigation, Autoplay]} className="mySwiper">
                        <SwiperSlide><img src={media12} className="!rounded-md" alt="" /></SwiperSlide>
                        <SwiperSlide><img src={media8} className="!rounded-md" alt="" /></SwiperSlide>
                        <SwiperSlide><img src={media5} className="!rounded-md" alt="" /></SwiperSlide>
                    </Swiper>
            </div>
        </div>
    </div>
    <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
        <div className="box custom-box">
            <div className="box-header">
                <div className="box-title">
                    Pagination Fraction
                </div>
            </div>
            <div className="box-body">
            <Swiper pagination={{ type: 'fraction', }} navigation={true} autoplay={{ delay: 2500, disableOnInteraction: false, }}
                    modules={[Pagination, Navigation, Autoplay]} className="mySwiper swiper pagination-fraction ">
                        <SwiperSlide><img src={media16} className="!rounded-md" alt="" /></SwiperSlide>
                        <SwiperSlide><img src={media30} className="!rounded-md" alt="" /></SwiperSlide>
                        <SwiperSlide><img src={media31} className="!rounded-md" alt="" /></SwiperSlide>
                    </Swiper>
            </div>
        </div>
    </div>
    <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
        <div className="box custom-box">
            <div className="box-header">
                <div className="box-title">
                    Custom Pagination
                </div>
            </div>
            <div className="box-body">
            <Swiper   
          pagination={pagination}
             modules={[Pagination, Autoplay]} autoplay={{ delay: 2500, disableOnInteraction: false, }} className="mySwiper swiper custom-pagination">
                        <SwiperSlide><img src={media25} className="!rounded-md" alt="" /></SwiperSlide>
                        <SwiperSlide><img src={media5} className="!rounded-md" alt="" /></SwiperSlide>
                        <SwiperSlide><img src={media33} className="!rounded-md" alt="" /></SwiperSlide>
                    </Swiper>
            </div>
        </div>
    </div>
    <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
        <div className="box custom-box">
            <div className="box-header">
                <div className="box-title">
                    Scrollbar Swiper
                </div>
            </div>
            <div className="box-body">
            <Swiper scrollbar={{ hide: true, }} autoplay={{ delay: 2500, disableOnInteraction: false, }} modules={[Scrollbar, Autoplay]} className="mySwiper swiper scrollbar-swiper">
                        <SwiperSlide><img src={media30} className="!rounded-md" alt="" /></SwiperSlide>
                        <SwiperSlide><img src={media28} className="!rounded-md" alt="" /></SwiperSlide>
                        <SwiperSlide><img src={media29} className="!rounded-md" alt="" /></SwiperSlide>
                </Swiper>
            </div>
        </div>
    </div>
    <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
        <div className="box custom-box">
            <div className="box-header">
                <div className="box-title">
                    Vertical Swiper
                </div>
            </div>
            <div className="box-body">
                    <Swiper direction={'vertical'} pagination={{ clickable: true, }} autoplay={{ delay: 2500, disableOnInteraction: false, }} modules={[Pagination, Autoplay]} className="swiper mySwiper5 swiper-vertical !h-[352px]">
                        <SwiperSlide><img src={media8}className="!rounded-md" alt="" /></SwiperSlide>
                        <SwiperSlide><img src={media32} className="!rounded-md" alt="" /></SwiperSlide>
                        <SwiperSlide><img src={media17} className="!rounded-md" alt="" /></SwiperSlide>
                    </Swiper>
            </div>
        </div>
    </div>
    <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
        <div className="box custom-box">
            <div className="box-header">
                <div className="box-title">
                    Mouse Wheel Control
                </div>
            </div>
            <div className="box-body">
                    <Swiper direction={'vertical'} slidesPerView={1} spaceBetween={30} mousewheel={true} pagination={{ clickable: true, }} autoplay={{ delay: 2500, disableOnInteraction: false, }}
                    modules={[Mousewheel, Pagination, Autoplay]} className="mySwiper swiper vertical vertical-mouse-control !h-[352px]">
                        <SwiperSlide><img src={media28} className="!rounded-md" alt="" /></SwiperSlide>
                        <SwiperSlide><img src={media30} className="!rounded-md" alt="" /></SwiperSlide>
                        <SwiperSlide><img src={media32} className="!rounded-md" alt="" /></SwiperSlide>
                  </Swiper>
            </div>
        </div>
    </div>
    <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
        <div className="box custom-box">
            <div className="box-header">
                <div className="box-title">
                    Keyboard Control
                </div>
            </div>
            <div className="box-body">
            <Swiper slidesPerView={1} spaceBetween={30} keyboard={{ enabled: true, }} pagination={{ clickable: true, }} autoplay={{ delay: 2500, disableOnInteraction: false, }}
                    navigation={true} modules={[Keyboard, Pagination, Navigation, Autoplay]} className="mySwiper">
                        <SwiperSlide><img src={media31} className="!rounded-md" alt="" /></SwiperSlide>
                        <SwiperSlide><img src={media12} className="!rounded-md" alt="" /></SwiperSlide>
                        <SwiperSlide><img src={media8} className="!rounded-md" alt="" /></SwiperSlide>
                   </Swiper>
            </div>
        </div>
    </div>
    <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
        <div className="box custom-box">
            <div className="box-header">
                <div className="box-title">
                    Effect Cube
                </div>
            </div>
            <div className="box-body">
                    <Swiper effect={'cube'} grabCursor={true} cubeEffect={{ shadow: true, slideShadows: true, shadowOffset: 20, shadowScale: 0.94, }} autoplay={{ delay: 2500, disableOnInteraction: false, }}
                    pagination={{
                        clickable: true,
                      }} modules={[EffectCube, Pagination, Autoplay]} className="mySwiper swiper swiper-effect-cube !h-[352px]">
                        <SwiperSlide>
                            <img src={media62} alt="img" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={media63} alt="img" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={media64} alt="img" />
                        </SwiperSlide>
                    </Swiper>
            </div>
        </div>
    </div>
    <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
        <div className="box custom-box">
            <div className="box-header">
                <div className="box-title">
                    Effect Fade
                </div>
            </div>
            <div className="box-body">
                    <Swiper spaceBetween={30} effect={'fade'} navigation={true} pagination={{ clickable: true, }} autoplay={{ delay: 2500, disableOnInteraction: false, }}
                    modules={[EffectFade, Navigation, Pagination, Autoplay]} className="mySwiper swiper swiper-fade !h-[352px]">
                        <SwiperSlide>
                            <img src={media18} alt="img" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={media19} alt="img" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={media20} alt="img" />
                        </SwiperSlide>
                   </Swiper>
            </div>
        </div>
    </div>
    <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
        <div className="box custom-box">
            <div className="box-header">
                <div className="box-title">
                    Effect Flip
                </div>
            </div>
            <div className="box-body">
                    <Swiper effect={'flip'} grabCursor={true} pagination={{
                        clickable: true,
                      }}navigation={true} autoplay={{ delay: 2500, disableOnInteraction: false, }}
                    modules={[EffectFlip, Pagination, Navigation, Autoplay]} className="mySwiper swiper-flip !h-[352px]">
                        <SwiperSlide>
                            <img src={media20} alt="img" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={media62} alt="img" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={media63} alt="img" />
                        </SwiperSlide>
                    </Swiper>
            </div>
        </div>
    </div>
  
</div>
<div className="grid grid-cols-12">
        <div className="xl:col-span-12 col-span-12">
            <div className="box custom-box">
                <div className="box-header">
                    <div className="box-title">
                        Effect Coverflow
                    </div>
                </div>
                <div className="box-body">
                <Swiper effect={'coverflow'}
                    grabCursor={true}
                    slidesPerView={4}
                    loop= {true}
                    centeredSlides= {true}
                    autoplay={{ delay: 2500, disableOnInteraction: false, }}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    pagination={{
                        clickable: true,
                      }}
                    modules={[EffectCoverflow, Pagination, Autoplay]}
                    className="mySwiper swiper swiper-overflow">
                    <SwiperSlide><img className="img-fluid" src={media40} alt="img" /></SwiperSlide>
                    <SwiperSlide><img className="img-fluid" src={media41} alt="img" /></SwiperSlide>
                    <SwiperSlide><img className="img-fluid" src={media42} alt="img" /></SwiperSlide>
                    <SwiperSlide><img className="img-fluid" src={media43} alt="img" /></SwiperSlide>
                    <SwiperSlide><img className="img-fluid" src={media44} alt="img" /></SwiperSlide>
                    <SwiperSlide><img className="img-fluid" src={media59} alt="img" /></SwiperSlide>
                    <SwiperSlide><img className="img-fluid" src={media46} alt="img" /></SwiperSlide>
                    <SwiperSlide><img className="img-fluid" src={media61} alt="img" /></SwiperSlide>
                </Swiper>
                </div>
            </div>
        </div>
    </div>
  </Fragment>
);}

export default Swiperjs;
