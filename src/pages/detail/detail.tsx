import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTokenContext } from "../../context";
import { DefaultInfo } from "../../interface";
import { getOneTask } from "../../utils/task/taskApiService";

import Spinner from 'react-bootstrap/Spinner';

export interface ParamsType {
    id: string;
}

const Detail: React.FC = () => {
    const {token} = useTokenContext();
    let {id} = useParams<ParamsType>();
    const [data, setData] = useState(DefaultInfo);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const tempToken = JSON.parse(token);
        getOneTask(tempToken, id)
        .then(res => {
            if(res.status){
                setData(res.data)
                setLoading(false);
            }
        })
    }, [token, id])

    return(
    <React.Fragment>
        {loading? (
            <Spinner animation="grow" style={{marginTop: '5rem'}}/>
        ):( 
            <div style={{textAlign: 'left', padding: '5% 10%'}}>
                <p><strong>Description: </strong> {data.description}</p>
                <p><strong>Category: </strong> {data.category}</p>
                <p><strong>content: </strong> {data.content}</p>
                <p><strong>deadline: </strong> {data.deadline.toLocaleDateString()}</p>
            </div>
        )}
    </React.Fragment>

    )
}

export default Detail;
