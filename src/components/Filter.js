import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../action/index';


class Filter extends Component {

    constructor(props) {
        super(props);
        this.state =  {
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
        }
    }

    componentDidMount() {
        this.setState({
            ...this.props.filter
        })
    }

    handleChange = (e) => {
        let target = e.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        console.log(name,value);
        this.setState({
            [name]:value,
            removeFilter: true
        })
        this.props.handleFilter({[name]:value});
    }

    handleRemoveFilter = () => {
        const filterTable = {
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
        let radioChecks =document.getElementsByClassName('radioCheck');
        let radioLenght = radioChecks.length;
        for(let i = 0;i < radioLenght;i++) {
            radioChecks[i].checked = false;
        }
        this.setState({
            ...filterTable
        });
        this.props.handleResetFilter({...filterTable});
    }

    handleChangeColor = (color) => {
        this.setState({
            colorName: color,
            removeFilter: true
        });
        console.log(color);
        this.props.handleFilterByColor(color);
    } 

    render() {
        let {
            saleOff,
            onlineOnly,
            limitedEdition,
            newArrival,
            bestSeller,
            price,
            by,
            removeFilter
        } = this.state;
        let {products} = this.props;
        const getUnique = (items, value) => {
            return [...new Set(items.map(item => item[value]))];
        }
        let types = ['all', ...getUnique(products, 'by')];
        types = types.map(type => (
            <option>{type}</option>
        ));
        let typeColors = [...getUnique(products, 'typeColor')];
        typeColors = typeColors.map(colorName => (
            <button className='bg-color' style={{background: colorName}} 
                    onClick={() => this.handleChangeColor(colorName)}></button>
        ));
        return (
            <div className='products__filter'>
                <h1>lọc theo</h1>
                {removeFilter && <button type='button' className='products__filter-remove' onClick={this.handleRemoveFilter}><p>Remove Filter</p> <i class="far fa-window-close"></i></button>} 
                <div className="filter__item">
                    <p className='mb-3'>
                        <button class="btn shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="false" aria-controls="collapse1">
                            <h2>Trạng thái <i class="fas fa-chevron-down"></i></h2>
                        </button>
                    </p>
                    <div class="collapse show" id="collapse1">
                        <div className="form-group">
                            <input type="checkbox" id='limitedEdition' name='limitedEdition' 
                                   checked={limitedEdition} onChange={this.handleChange} />
                            <label htmlFor="limitedEdition">limited edition</label>
                        </div>
                        <div className="form-group">
                            <input type="checkbox" id='onlineOnly' name='onlineOnly'  
                                checked={onlineOnly} onChange={this.handleChange} />
                            <label htmlFor="onlineOnly">online only</label>
                        </div>
                        <div className="form-group">
                            <input type="checkbox" id='saleOff' name='saleOff'
                                    checked={saleOff}  onChange={this.handleChange} />
                            <label htmlFor="saleOff">sale off</label>
                        </div>
                        <div className="form-group">
                            <input type="checkbox" id='bestSeller'  name='bestSeller'
                                    checked={bestSeller}  onChange={this.handleChange} />
                            <label htmlFor="bestSeller">best seller</label>
                        </div>
                        <div className="form-group">
                            <input type="checkbox" id='newArrival' name='newArrival' 
                                    checked={newArrival} onChange={this.handleChange} />
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
                                <input type="radio" name='style' className='radioCheck' id='allStyle' value='all' onChange={this.handleChange} />
                                <label htmlFor="allStype">All</label>
                        </div>
                        <div className="form-group">
                            <input type="radio"  name='style' id='lowtop' className='radioCheck' value='low top' onChange={this.handleChange} />
                            <label htmlFor="lowtop">low top</label>
                        </div>
                        <div className="form-group">
                            <input type="radio"  name='style' id='hightop' className='radioCheck' value='high top' onChange={this.handleChange} />
                            <label htmlFor="hightop">high top</label>
                        </div>
                        <div className="form-group">
                            <input type="radio" name='style' id='slipon' className='radioCheck' value='slip-on' onChange={this.handleChange} />
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
                            <input type="radio"  name='type' id='allType' className='radioCheck' value='all'  onChange={this.handleChange} />
                            <label htmlFor="allType">all</label>
                        </div>
                        <div className="form-group">
                            <input type="radio"  name='type' id='vintas' className='radioCheck' value='vintas' onChange={this.handleChange} />
                            <label htmlFor="vintas">vintas</label>
                        </div>
                        <div className="form-group">
                            <input type="radio"  name='type' id='urbas' className='radioCheck' value='urbas' onChange={this.handleChange} />
                            <label htmlFor="urbas">urbas</label>
                        </div>
                        <div className="form-group">
                            <input type="radio"  name='type' id='pattas' className='radioCheck' value='pattas' onChange={this.handleChange} />
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
                        <p>Price: 0 to {this.state.price} VND</p>
                        <input type="range" name='price'  
                                id='price' min={0} max={990000} value={price} className='form-control'    
                                onChange={this.handleChange}
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
                            value={by}
                            onChange={this.handleChange}
                    >
                        {types}
                    </select>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products,
        filter: state.filterProduct
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        handleFilter: (filterType) => {
            dispatch(actions.filerProducts(filterType));
        },
        handleResetFilter: (filter) => {
            dispatch(actions.resetFilter(filter));
        },
        handleFilterByColor: (colorName) => {
            dispatch(actions.filterByColor(colorName));
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Filter);
