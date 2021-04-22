import React, {  useEffect } from 'react';
import * as actions from '../../action/index';
import { useDispatch, useSelector } from 'react-redux';

const Filter = () => {

    const filter = useSelector(state => state.filterProduct);
    const products = useSelector(state => state.products);
    const dispatch = useDispatch(); 
    useEffect(() => {
        dispatch(actions.getFilter());
       
    }, [dispatch]);

    let resetFilter =  {
        saleOff: false,
        onlineOnly: false,
        limitedEdition: false,
        newArrival: false,
        bestSeller: false,
        style: 'all',
        type: 'all',
        price: 990000,
        by: 'all',
        color: '',
        removeFilter: false,
        colorName: ''
    };
    
    let newFilter  = {...filter , removeFilter: false};
    if(JSON.stringify(resetFilter) === JSON.stringify(newFilter)) {
            filter.removeFilter = false;
    } else filter.removeFilter = true;
    
    const handleChange = (e) => {
        let target = e.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        dispatch(actions.filterProducts({ [name]: value }));
    }

    const handleRemoveFilter = () => {
        
        let radioChecks = document.getElementsByClassName('radioCheck');
        let radioLenght = radioChecks.length;
        for(let i = 0;i < radioLenght;i++) {
            radioChecks[i].checked = false;
        }
        dispatch(actions.resetFilter());
    }

    const handleChangeColor = (color) => {
        dispatch(actions.filterByColor(color));
    } 

    const getUnique = (items, value) => {
        return [...new Set(items.map(item => item[value]))];
    }

    let types = ['all', ...getUnique(products, 'by')];
    types = types.map((type, index) => (
        <option key={index}>{type}</option>
    ));

    let typeColors = [...getUnique(products, 'typeColor')];
    typeColors = typeColors.map((colorName, index) => (
        <button key={index} className='bg-color' style={{background: colorName}} 
                onClick={() => handleChangeColor(colorName)}></button>
    ));

    return (
        <div className='products__filter'>
            <h1>lọc theo</h1>
            {filter.removeFilter && <button type='button' className='products__filter-remove' onClick={handleRemoveFilter}><p>Remove Filter</p> <i class="far fa-window-close"></i></button>} 
            <div className="filter__item">
                <p className='mb-3'>
                    <button class="btn shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="false" aria-controls="collapse1">
                        <h2>Trạng thái <i class="fas fa-chevron-down"></i></h2>
                    </button>
                </p>
                <div class="collapse show" id="collapse1">
                    <div className="form-group">
                        <input type="checkbox" id='limitedEdition' name='limitedEdition' 
                                checked={filter.limitedEdition} onChange={handleChange} />
                        <label htmlFor="limitedEdition">limited edition</label>
                    </div>
                    <div className="form-group">
                        <input type="checkbox" id='onlineOnly' name='onlineOnly'  
                            checked={filter.onlineOnly} onChange={handleChange} />
                        <label htmlFor="onlineOnly">online only</label>
                    </div>
                    <div className="form-group">
                        <input type="checkbox" id='saleOff' name='saleOff'
                                checked={filter.saleOff}  onChange={handleChange} />
                        <label htmlFor="saleOff">sale off</label>
                    </div>
                    <div className="form-group">
                        <input type="checkbox" id='bestSeller'  name='bestSeller'
                                checked={filter.bestSeller}  onChange={handleChange} />
                        <label htmlFor="bestSeller">best seller</label>
                    </div>
                    <div className="form-group">
                        <input type="checkbox" id='newArrival' name='newArrival' 
                                checked={filter.newArrival} onChange={handleChange} />
                        <label htmlFor="newArrival">new arrival</label>
                    </div>
                </div>
            </div>  
            <div className="divider"></div> 
            <div className="filter__item">
                <p className='mb-3'>
                    <button class="btn shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapse2" aria-expanded="false" aria-controls="collapse2">
                        <h2>Kiểu dáng <i class="fas fa-chevron-down"></i></h2>
                    </button>
                </p>
                <div class="collapse show" id="collapse2">
                    <div className="form-group">
                            <input type="radio" name='style' className='radioCheck' id='allStyle' value='all' onChange={handleChange} />
                            <label htmlFor="allStype">All</label>
                    </div>
                    <div className="form-group">
                        <input type="radio"  name='style' id='lowtop' className='radioCheck' value='low top' onChange={handleChange} />
                        <label htmlFor="lowtop">low top</label>
                    </div>
                    <div className="form-group">
                        <input type="radio"  name='style' id='hightop' className='radioCheck' value='high top' onChange={handleChange} />
                        <label htmlFor="hightop">high top</label>
                    </div>
                    <div className="form-group">
                        <input type="radio" name='style' id='slipon' className='radioCheck' value='slip-on' onChange={handleChange} />
                        <label htmlFor="slipon">slip-on</label>
                    </div>
                </div>
            </div>   
            <div className="divider"></div>
            <div className="filter__item">
                <p className='mb-3'>
                    <button class="btn shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapse3" aria-expanded="false" aria-controls="collapse3">
                        <h2>dòng sản phẩm <i class="fas fa-chevron-down"></i></h2>
                    </button>
                </p>
                <div class="collapse show" id="collapse3">
                    <div className="form-group">
                        <input type="radio"  name='type' id='allType' className='radioCheck' value='all'  onChange={handleChange} />
                        <label htmlFor="allType">all</label>
                    </div>
                    <div className="form-group">
                        <input type="radio"  name='type' id='vintas' className='radioCheck' value='vintas' onChange={handleChange} />
                        <label htmlFor="vintas">vintas</label>
                    </div>
                    <div className="form-group">
                        <input type="radio"  name='type' id='urbas' className='radioCheck' value='urbas' onChange={handleChange} />
                        <label htmlFor="urbas">urbas</label>
                    </div>
                    <div className="form-group">
                        <input type="radio"  name='type' id='pattas' className='radioCheck' value='pattas' onChange={handleChange} />
                        <label htmlFor="pattas">pattas</label>
                    </div>
                </div>
            </div>   
            <div className="divider"></div>
            <div className="filter__item">
                <p className='mb-3'>
                    <h2>giá</h2>
                </p>
                <div>
                    <p>Price: 0 to {filter.price} VND</p>
                    <input type="range" name='price'  
                            id='price' min={0} max={990000} value={filter.price} className='form-control'    
                            onChange={handleChange}
                    />
                </div>
            </div> 
            <div className="divider"></div>
            <div className="filter__item">
                <h2>màu sắc</h2>
                <div className="row">
                    {typeColors}                        
                </div>
            </div>
            <div className="divider"></div>
            <div className="filter__item">
                <h2>chất liệu</h2>
                <select 
                            name="by" 
                        id="by" className='form-control'
                        value={filter.by}
                        onChange={handleChange}
                >
                    {types}
                </select>
            </div>
        </div>
    );
}

export default Filter;
