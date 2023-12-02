import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import CarouselData from '../static/SwiperData'
import 'swiper/css/autoplay';
import 'swiper/css/effect-coverflow'; // Import CSS for EffectCube

import { A11y, Autoplay,Pagination,Scrollbar,Navigation } from 'swiper/modules';



const SwiperContainer = () => {
 
  return (
    <Swiper
      modules={[Pagination, A11y, Autoplay,Scrollbar,Navigation]}
      spaceBetween={50}
      slidesPerView={'auto'}
      grabCursor={true}
      navigation
      centeredSlides={true}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      loop={true}
      autoplay={{
        delay:2000
      }}
    > 
    {
    CarouselData?.map((element,i)=>{
        return <>
            <SwiperSlide className='slider' key={i}>
            <div className='row'>
                <div className="col-12">
                    <div className="image">
                        <img src={element?.img} alt="" className='homepageswiper'/>
                    </div>
                </div>
            </div>  
            </SwiperSlide>
        </>
    })
    }
    </Swiper>
  );
}

export default SwiperContainer;
