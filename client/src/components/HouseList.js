import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import '../App.css';
class HousesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            houses: [],
            error: null,
            loading: false,
            searchCriteria: {
                price_min: 0,
                price_max: 1000000,
                city: '',
                order: 'location_country_asc',
                page: 1,
            },
        };
    }
    componentDidMount() {
        this.setState({
            error: null,
            loading: true,
        });
        this.fetchHouses();
    }

    fetchHouses = () => {
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
        console.log(queryString);

        return fetch(`/api/houses?${queryString}`)
            .then(res => res.json())
            .then(housesList => {
                console.log(housesList);
                this.setState({
                    houses: housesList,
                    error: null,
                    loading: false,
                });
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
        this.setState({
            ...this.state,
            searchCriteria: {
                ...this.state.searchCriteria,
                [name]: value,
            },
        });
        this.fetchHouses();
        console.log(name, value);
    };
    render() {
        const {
            houses,
            error,
            loading,
            searchCriteria: { price_min, price_max, city, order, page },
        } = this.state;

        if (loading) {
            return <div> loading Data ... </div>;
        }
        if (error) {
            return <div>{error}</div>;
        }
        if (houses.length === 0) {
            return <div> no houses found</div>;
        } else {
            return (
                <form>
                    <div>
                        <label>
                            Price min:
                            <br />
                            <select
                                name="price_min"
                                value={price_min}
                                onChange={this.HandleInputChange}
                            >
                                <option value="5000">5000</option>
                                <option value="10000">10000</option>
                                <option value="15000">15000</option>
                                <option value="20000">20000</option>
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
                                <option value="5000">5000</option>
                                <option value="10000">10000</option>
                                <option value="15000">15000</option>
                                <option value="20000">20000</option>
                                <option value="20000">20000</option>
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
                                <option value="Amsterdam">Amsterdam</option>
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
                                <option value="location_country_dsc">
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

                    <div>
                        {houses.map(houseObject => (
                            <div key={houseObject.id} className="list">
                                <Link to={`/houses/${houseObject.id}`}>
                                    {houseObject.price_value}
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
                        ))}
                    </div>
                </form>
            );
        }
    }
}

export default HousesList;
