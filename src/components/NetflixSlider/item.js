import React from 'react';
import cx from 'classnames';
import SliderContext from './context'
import './item.css'

const Item = ({ video }) => (
    <SliderContext.Consumer>
        {({ onSelectSlide, currentSlide, elementRef }) => {
            const isActive = currentSlide && currentSlide.id === video._id;

            return (
                <div
                    ref={elementRef}
                    className={cx('item', {
                        'item--open': isActive,
                    })}
                >
                    <a href={`${video._id}/video`} >
                        <video width="400" height="240" src={video.video_url} />
                    </a>
                </div>
            );
        }}
    </SliderContext.Consumer>
);

export default Item;
