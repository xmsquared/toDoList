import { useParams } from "react-router-dom";

function Detail(props){
    let {id} = useParams();
    const data = JSON.parse(localStorage.getItem(id));

    return(
        <div style={{textAlign: 'left', padding: '5% 10%'}}>
            <p><strong>Description: </strong> {data.description}</p>
            <p><strong>Category: </strong> {data.Category}</p>
            <p><strong>content: </strong> {data.content}</p>
        </div>
    )
}

export default Detail;