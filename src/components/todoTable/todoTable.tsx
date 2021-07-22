import Table from 'react-bootstrap/Table';
import { info_obj } from "../../interface/todoInterface";

declare function require(name:string);
var I18n = require('react-redux-i18n').I18n;

interface IProps{
    selectAll: (e: any)=>void,
    selectOne: (e: any, id: any)=>void,
    sortByDeadLine: ()=>void,
    data: info_obj[],
    selectData: number[],
    handleDelete: (id: any)=>void
}

export const TodoTable: React.FC<IProps> = ({
    selectAll,
    selectOne,
    sortByDeadLine,
    data,
    selectData,
    handleDelete
}) => (
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
            data.map((item, index)=> {
                return(
                    <tr key={index}>
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
                        <th>{item.deadline}</th>
                        <th style={{color: 'red'}} onClick={e=>handleDelete(item.id)}>{I18n.t('delete')}</th>
                    </tr>
                )
            })
        }
        </tbody>                  
    </Table>
)