
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getInitialStateAsync, newsSelector } from '../../redux/reducers/newsReducer'
import { useNavigate } from 'react-router-dom';
import './style.scss';
import Button from 'react-bootstrap/Button';
import { FaHeart } from "react-icons/fa";
import { Online, Offline } from 'react-detect-offline';
import { collection, doc, onSnapshot, query, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';


const News = ({ list }) => {
    // console.log(Offline);
    // const user = auth.currentUser;
    const [user, setUser] = useState();
    const [favs, setFavs] = useState([]);
    const news = useSelector(newsSelector);
    const navigate = useNavigate()
    const dispatch = useDispatch();

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            setUser(user);
        })
        dispatch(getInitialStateAsync());
    }, [])
    // console.log(news);
    const setToFavourite = async (id) => {
        // console.log(user);
        onAuthStateChanged(auth, async (user) => {
            const unsubscribe = await onSnapshot(query(collection(db, "users", user.uid, "favs")), async (snapshot) => {
                const favs = await snapshot.docs.map((fav) => {
                    return fav.data();
                });
                // console.log(favs);
                setFavs(favs);
            });
            return () => {
                unsubscribe();
            };
        })
        // console.log(id);
        // console.log(favs, " fav");
        const oneNews = news.find((n) => n.id === id);
        // console.log(oneNews);
        const customId = (Number.MAX_SAFE_INTEGER - Date.now()).toString();
        try {
            const fav = favs?.some((fab) => fab.id === oneNews.id);
            // console.log(fav);
            const favRef = doc(db, "users", user?.uid, "favs", customId);
            if (!fav) {
                await setDoc(favRef, {
                    title: oneNews.title,
                    description: oneNews.description,
                    urlToImage: oneNews.urlToImage,
                    id: oneNews.id,
                    content: oneNews.content,
                    author: oneNews.author,
                    customId: customId,
                    url: oneNews.url,
                });
            } else {
                console.log('already in cart');
            }

        } catch (error) {
            console.error("Error in adding favourite:", error);
        }

    }
    // console.log(favs);
    return (
        <>
            {news.length === 0 ? (
                <>
                    <h2 style={{ textAlign: 'center', marginTop: '5%' }}>No news Available</h2>
                </>
            ) : (
                <>
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
                                                <div className='title'>{n.title.slice(0, 40)}...</div>
                                                <div className='description'>
                                                    {n.content}
                                                </div>
                                                <div className="see-more-favourite">
                                                    <FaHeart className='heart' onClick={user ? () => setToFavourite(n.id) : () => navigate('/user/sign-in')} />
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
                                                <div className='title'>{n.title}...</div>
                                                <div className='description'>
                                                    {n.content}
                                                </div>
                                                <div className="see-more-favourite">
                                                    <FaHeart className='heart' onClick={user ? () => setToFavourite(n.id) : () => navigate('/user/sign-in')} />
                                                    <Button className='see-more' variant="primary" onClick={() => navigate(`/news/${index}`)}>See More</Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div >
                        )}
                    </Online>
                </>
            )}

            <Offline>
                <div className="offline-container">
                    <h2> You are Offline</h2>
                    <button onClick={() => navigate('/offline')}>Go to offine support</button>
                </div>
            </Offline>
        </>


    )

}

export default News