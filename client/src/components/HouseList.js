import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../App.sass';
class HousesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            houses: [],
            cities: [],
            error: null,
            loading: false,
            searchCriteria: {
                price_min: 0,
                price_max: 80000,
                city: '',
                size_rooms: 3,
                order: '',
                page: 1,
                activePage: 2,
            },
        };
    }
    componentDidMount() {
        const params = this.props.location.search
            .replace(/^\?/, '')
            .split('&')
            .filter(el => el.length)
            .map(pair => pair.split('='))
            .reduce((params, [name, value]) => {
                params[name] = value;
                return params;
            }, {});

        this.setState(
            {
                error: null,
                loading: true,
                searchCriteria: {
                    ...this.state.searchCriteria,
                    ...params,
                },
            },
            this.fetchHouses
        );
    }

    fetchHouses = (updateUrl = false) => {
        const { searchCriteria } = this.state;

        const queryString = Object.keys(searchCriteria)
            .reduce((query, field) => {
                const value = searchCriteria[field];
                if (value !== null && value !== '') {
                    query.push(`${field}=${encodeURI(value)}`);
                }
                return query;
            }, [])
            .join('&');
        if (updateUrl) {
            this.props.history.push(
                this.props.location.pathname + '?' + queryString
            );
        }

        return fetch(`/api/houses?${queryString}`)
            .then(res => res.json())
            .then(({ houses, total, pageSize, cities, error }) => {
                if (error) {
                    this.setState({
                        loading: false,
                        error,
                        houses: [],
                    });
                } else {
                    this.setState({
                        houses,
                        total,
                        pageSize,
                        cities,
                        error: null,
                        loading: false,
                    });
                }

                // this.props.history.push(
                //     this.props.location.pathname + '?' + queryString
                // );
            })
            .catch(() => {
                this.setState({
                    error: 'something is wrong',
                    loading: false,
                });
            });
    };

    HandleDelete = id => {
        const response = fetch('/api/houses/:id', {
            method: 'Delete',
        });
        const filteredItems = [...this.state.houses].filter(item => {
            return item.id !== id;
        });
        response.then(data => console.log(data));

        this.setState({
            houses: filteredItems,
        });
    };

    HandleInputChange = event => {
        const { name, value } = event.target;
        this.setState(
            {
                ...this.state,
                searchCriteria: {
                    ...this.state.searchCriteria,
                    [name]: value,
                },
            },
            () => {
                this.fetchHouses(true);
            }
        );

        console.log(name, value);
    };
    HandleSearch = () => {
        this.fetchHouses();
    };

    render() {
        const {
            houses,
            total,
            pageSize,
            //activePage,
            cities,
            error,
            loading,
            searchCriteria: {
                price_min,
                price_max,
                city,
                size_rooms,
                order,
                page,
            },
        } = this.state;

        console.log(pageSize, page, total);
        const totalPages = Math.ceil(total / pageSize);
        return (
            <div className="Wrapper">
                <form className="filterSearch">
                    <div>
                        <label>
                            Price min:
                            <br />
                            <select
                                name="price_min"
                                value={price_min}
                                onChange={this.HandleInputChange}
                            >
                                {[
                                    0,
                                    1000,
                                    2000,
                                    30000,
                                    40000,
                                    50000,
                                    60000,
                                    70000,
                                    80000,
                                ].map(price_min => {
                                    return (
                                        <option value={price_min}>
                                            {price_min}
                                        </option>
                                    );
                                })}
                            </select>
                        </label>
                        <br />
                        <label>
                            Price max:
                            <br />
                            <select
                                name="price_max"
                                value={price_max}
                                onChange={this.HandleInputChange}
                            >
                                {[
                                    0,
                                    1000,
                                    2000,
                                    30000,
                                    40000,
                                    50000,
                                    60000,
                                    70000,
                                    80000,
                                ].map(price_max => {
                                    return (
                                        <option value={price_max}>
                                            {price_max}
                                        </option>
                                    );
                                })}
                            </select>
                        </label>
                        <br />
                        <label>
                            size rooms:
                            <br />
                            <select
                                name="size_rooms"
                                value={size_rooms}
                                onChange={this.HandleInputChange}
                            >
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(size_rooms => {
                                    return (
                                        <option value={size_rooms}>
                                            {size_rooms}
                                        </option>
                                    );
                                })}
                            </select>
                        </label>
                        <br />
                        <label>
                            City:
                            <br />
                            <select
                                name="city"
                                value={city}
                                onChange={this.HandleInputChange}
                            >
                                <option value="">select city</option>
                                {cities.map(city => {
                                    return <option value={city}>{city}</option>;
                                })}
                            </select>
                        </label>
                        <br />
                        <label>
                            Order:
                            <br />
                            <select
                                name="order"
                                value={order}
                                onChange={this.HandleInputChange}
                            >
                                <option value="location_country_asc">
                                    Country-ASC
                                </option>
                                <option value="location_country_desc">
                                    Country-DESC
                                </option>
                                <option value="price_value_asc">
                                    Price-Asc
                                </option>
                                <option value="price_value_desc">
                                    Price-Desc
                                </option>
                            </select>
                        </label>
                    </div>
                    <button onSubmit={this.HandleSearch}> SEARCH</button>
                </form>
                <div>
                    {loading && <div> loading Data ... </div>}
                    {error && <div>{error}</div>}
                    <div> total results : {total}</div>
                    {Array.from({ length: totalPages || 0 }, (value, index) => {
                        const _page = index + 1;
                        return (
                            <div
                                className={`${page === _page ? 'active' : ''}`}
                                onClick={() => {
                                    this.setState(
                                        {
                                            ...this.state,
                                            searchCriteria: {
                                                ...this.state.searchCriteria,
                                                page: _page,
                                            },
                                        },
                                        () => {
                                            this.fetchHouses(true);
                                        }
                                    );
                                }}
                            >
                                {_page}
                            </div>
                        );
                    })}
                    {houses.length === 0 ? (
                        <div> no houses found</div>
                    ) : (
                        houses.map(houseObject => (
                            <div key={houseObject.id} className="list">
                                <Link to={`/houses/${houseObject.id}`}>
                                    PRICE: {houseObject.price_value} <br />
                                    Country: {houseObject.location_country}
                                    <br />
                                    City: {houseObject.location_city}
                                    <br />
                                    <br />
                                </Link>
                                <button
                                    className="deleteButton"
                                    onClick={() =>
                                        this.HandleDelete(houseObject.id)
                                    }
                                >
                                    X
                                </button>
                            </div>
                        ))
                    )}
                </div>

                <br />
            </div>
        );
    }
}

export default HousesList;
