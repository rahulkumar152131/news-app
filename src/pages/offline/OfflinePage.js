
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getInitialStateAsync, newsSelector } from '../../redux/reducers/newsReducer'
import { useNavigate } from 'react-router-dom';
import './style.scss';
import Button from 'react-bootstrap/Button';
import { BsFillGridFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import { collection, deleteDoc, doc, onSnapshot, query } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { IoIosHeartDislike } from "react-icons/io";



const OfflinePage = () => {
    const [favs, setFavs] = useState([]);
    const [list, setList] = useState(false);
    const news = useSelector(newsSelector);
    const navigate = useNavigate()
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const unsubscribe = onSnapshot(query(collection(db, "users", user?.uid, "favs")), async (snapshot) => {
                    const favs = await snapshot.docs.map((fav) => {
                        return fav.data();
                    });
                    console.log(favs);
                    setFavs(favs);
                });
                return () => {
                    unsubscribe();
                };
            }
        })
    }, []);
    const unfavourite = (id) => {
        console.log(id);
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                console.log("user");
                await deleteDoc(doc(db, "users", user.uid, "favs", id));
            }
        });

    }
    // console.log(favs);
    return (
        <>
            {favs.length === 0 ? (
                <>
                    <h2 style={{ textAlign: 'center', marginTop: '5%' }}>No news Available</h2>
                </>
            ) : (
                <>
                    <div >
                        <div className='list-icon' >
                            {list ? <FaThList onClick={() => setList(!list)} /> :
                                <BsFillGridFill onClick={() => setList(!list)} />}
                        </div>
                    </div>
                    {list ? (
                        <div className='news-container-list'>
                            {
                                favs?.map((n, index) => (
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
                                                {/* <IoIosHeartDislike /> */}
                                                <IoIosHeartDislike className='heart' style={{ color: 'rgb(223, 95, 95)' }} onClick={() => unfavourite(n.customId)} />
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
                                favs?.map((n, index) => (
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
                                                <IoIosHeartDislike className='heart' style={{ color: 'rgb(223, 95, 95)' }} onClick={() => unfavourite(n.customId)} />
                                                <Button className='see-more' variant="primary" onClick={() => navigate(`/news/${index}`)}>See More</Button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div >
                    )}
                </>
            )}
        </>
    )
}

export default OfflinePage;