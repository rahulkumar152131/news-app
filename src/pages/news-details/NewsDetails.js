import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getInitialStateAsync, newsSelector } from '../../redux/reducers/newsReducer';
import './style.scss';
const NewsDetails = () => {
    const { id } = useParams();
    const news = useSelector(newsSelector);
    // const navigate = useNavigate()
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getInitialStateAsync());
    }, [])
    const oneNews = news.find((n) => n.id.toString() === id);
    // console.log(oneNews);
    return (
        <div className='news-details-container'>
            <div className="news-details-title">
                {oneNews?.title}
            </div>
            <div className="image-about">
                <div className="image">
                    <img src={oneNews?.urlToImage} alt="" />
                </div>
                <div className="about">
                    <div className="author">
                        AUTHOR :{" "}
                        {oneNews?.author}
                    </div>

                    <div className="description">
                        {oneNews?.description}
                    </div>

                </div>
            </div>
            <div className="content">
                {oneNews?.content}
            </div>
            <Link to={oneNews?.url} className="more" target='_blank'>
                See More on Site
            </Link>
        </div>
    )
}

export default NewsDetails