import React, { useState } from 'react'
import News from '../news/News'

import { BsFillGridFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import './style.scss';


const Home = () => {
    const [list, setList] = useState(false);
    return (
        <div >
            <div className='list-icon' >
                {list ? <FaThList onClick={() => setList(!list)} /> :
                    <BsFillGridFill onClick={() => setList(!list)} />}
            </div>
            <News list={list} />
        </div>
    )
}

export default Home