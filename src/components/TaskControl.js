import React, {useState} from 'react';

const TaskControl = ({quantity, handleSort}) => {

    const [sortBy, setSortBy] = useState('Sắp xếp theo');

    const handleClick = (type, value, name) => {
        handleSort(type,value);
        setSortBy(name);
    }
    return (
        <div className='row products__sort mb-5'>
            <div className="col-lg-8">
                <h2>{quantity} items</h2>
            </div>
            <div className="col-lg-4 products__sort-inner">
                <div className='dropdown'>
                    <button class="btn  dropdown-toggle" type="button" 
                            id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                        {sortBy}
                    </button>
                    <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
                        <li onClick={() => handleClick('name',1,'Tên A - Z')} className='active'>
                            <a class="dropdown-item" href="#">Tên A - Z</a>
                        </li>
                        <li onClick={() => handleClick('name',-1, 'Tên Z - A')}>
                            <a class="dropdown-item" href="#">Tên Z - A</a>
                        </li>
                        <li onClick={() => handleClick('price',1, 'Giá tăng dần')}>
                            <a class="dropdown-item" href="#">Giá tăng dần</a>
                        </li>
                        <li onClick={() => handleClick('price',-1, 'Giá giảm dần')}>
                            <a class="dropdown-item" href="#">Giá giảm dần</a>
                        </li>
                        <li onClick={() => handleClick('seller',-1, 'Top Seller')}>
                            <a class="dropdown-item" href="#">Top Seller</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default TaskControl;
