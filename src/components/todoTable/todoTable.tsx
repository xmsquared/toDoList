import Table from 'react-bootstrap/Table';
import { InfoObj } from "../../interface/todoInterface";

declare function require(name:string);
var I18n = require('react-redux-i18n').I18n;

interface IProps{
    selectAll: (e: any)=>void,
    selectOne: (e: any, id: any)=>void,
    sortByDeadLine: ()=>void,
    data: InfoObj[],
    selectData: string[],
    deleteOne: (id: any)=>void
}

export const TodoTable: React.FC<IProps> = ({
    selectAll,
    selectOne,
    sortByDeadLine,
    data,
    selectData,
    deleteOne
}) => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>
                    <label>
                    <input
                        type="checkbox"
                        onChange={e=>selectAll(e)}
                    />
                    </label>
                </th>
                <th>{I18n.t('description')}</th>
                <th>{I18n.t('category')}</th>
                <th onClick={e=>sortByDeadLine()}>{I18n.t('deadline')}</th>
                <th>{I18n.t('operate')}</th>
                </tr>
            </thead>

            <tbody>
            {
                data.map((item)=> {
                    return(
                        <tr key={item.id}>
                            <th>
                                <label>
                                <input
                                    type="checkbox"
                                    checked = {selectData.includes(item.id)}
                                    onChange = {e => selectOne(e, item.id)}
                                />
                                </label>
                            </th>
                            <th onClick={e => window.location.href = "/todo/" + item.id}>{item.description}</th>
                            <th>{item.category}</th>
                            <th>{item.deadline.toLocaleDateString()}</th>
                            <th style={{color: 'red'}} onClick={e => deleteOne(item.id)}>{I18n.t('delete')}</th>
                        </tr>
                    )
                })
            }
            </tbody>                  
        </Table>
    )
}