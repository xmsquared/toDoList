import { useParams } from "react-router-dom";

export interface ParamsType {
    id: string;
}

const Detail: React.FC = () => {

    let {id} = useParams<ParamsType>();
    const data = JSON.parse(localStorage.getItem(id) ?? '');

    return(
        <div style={{textAlign: 'left', padding: '5% 10%'}}>
            <p><strong>Description: </strong> {data.description}</p>
            <p><strong>Category: </strong> {data.Category}</p>
            <p><strong>content: </strong> {data.content}</p>
            <p><strong>deadline: </strong> {data.deadline}</p>
        </div>
    )
}

export default Detail;