
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getInitialStateAsync, newsSelector } from '../../redux/reducers/newsReducer'
import { useNavigate } from 'react-router-dom';
import './style.scss';
import Button from 'react-bootstrap/Button';
import { FaHeart } from "react-icons/fa";
import { Online, Offline } from 'react-detect-offline';
import { BsFillGridFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";


const Favourite = () => {
    // console.log(Offline);
    const [list, setList] = useState(false);
    const news = useSelector(newsSelector);
    const navigate = useNavigate()
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getInitialStateAsync());
    }, [])
    return (
        <>
            <div >
                <div className='list-icon' >
                    {list ? <FaThList onClick={() => setList(!list)} /> :
                        <BsFillGridFill onClick={() => setList(!list)} />}
                </div>
            </div>
            <Online>
                {list ? (
                    <div className='news-container-list'>
                        <Offline>Only shown offline (surprise!)</Offline>
                        {
                            news.map((n, index) => (
                                <div className='news-content-list' key={index}>
                                    <div className="image">
                                        <img src={n.urlToImage ? n.urlToImage : 'https://cdn.pixabay.com/photo/2015/02/15/09/33/news-636978_1280.jpg'} alt='' />
                                    </div>
                                    <div className='title-description'>
                                        <div className='title'>{n.title.slice(0, 35)}...</div>
                                        <div className='description'>
                                            {n.content}
                                        </div>
                                        <div className="see-more-favourite">
                                            <FaHeart className='heart' />
                                            <Button className='see-more' variant="primary" onClick={() => navigate(`/news/${index}`)}>See More</Button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                ) : (
                    <div className='news-container-grid'>
                        {
                            news.map((n, index) => (
                                <div className='news-content-grid' key={index}>
                                    <div className="image">
                                        <img src={n.urlToImage ? n.urlToImage : 'https://cdn.pixabay.com/photo/2015/02/15/09/33/news-636978_1280.jpg'} alt='' />
                                    </div>
                                    <div className='title-description'>
                                        <div className='title'>{n.title.slice(0, 35)}...</div>
                                        <div className='description'>
                                            {n.content}
                                        </div>
                                        <div className="see-more-favourite">
                                            <FaHeart className='heart' />
                                            <Button className='see-more' variant="primary" onClick={() => navigate(`/news/${index}`)}>See More</Button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div >
                )}
            </Online>
            <Offline>
                <h2> You are OFFline</h2>
                <h3>Go to offine support</h3>
            </Offline>
        </>


    )

}

export default Favourite;