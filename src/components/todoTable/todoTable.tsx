import React, { useEffect, useState, useMemo, MouseEvent, ChangeEvent } from 'react';
import { InfoObj } from "../../interface/todoInterface";
import { calculatorPageNum, cutDisplayData } from '../../utils';
 
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';


declare function require(name:string);
var I18n = require('react-redux-i18n').I18n;

interface TodoTableProps{
    selectAll: (e: ChangeEvent)=>void,
    selectOne: (e: ChangeEvent, id: any)=>void,
    sortByDeadLine: ()=>void,
    data: InfoObj[],
    selectData: string[],
    deleteOne: (id: MouseEvent)=>void
}

export const TodoTable: React.FC<TodoTableProps> = ({
    selectAll,
    selectOne,
    sortByDeadLine,
    data,
    selectData,
    deleteOne
}) => {
    const [pageNum, setPageNum] = useState(0);
    const [displayData, setDisplayData] = useState([]) as any;
    const [active, setActive] = useState(1);

    useEffect(() => {
        setPageNum(calculatorPageNum(data.length));
        
        setDisplayData(cutDisplayData(data, active));

    }, [data, active])
    
    const item = useMemo(() => {
        let items = [] as any;
        for (let number = 1; number <= pageNum; number++) {
            items.push(
              <Pagination.Item key={number} active={number === active} onClick={() => changePage(number)}>
                {number}
              </Pagination.Item>,
            );
        }
        return (items)
    }, [active, pageNum])

    const changePage = (num: number) => {

        setActive(num);
    }

    return (
        <React.Fragment>
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
                    displayData.map((item)=> {
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

            <Pagination>{item}</Pagination>

        </React.Fragment>
    )
}