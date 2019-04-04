import React, { Component } from 'react';

import { Link } from 'react-router-dom';

class HousesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            houses: [],
            price: '',
            desc: '',
            error: null,
            loading: false,
        };
    }
    componentDidMount() {
        this.setState({
            error: null,
            loading: true,
        });
        fetch(`/api/houses`)
            .then(res => res.json())
            .then(housesList => {
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
    }

    render() {
        const { houses, error, loading } = this.state;
        if (loading) {
            return <div> loading Data ... </div>;
        }
        if (error) {
            return <div>{error}</div>;
        }
        if (!houses) {
            return <div> no houses found</div>;
        } else {
            return (
                <div>
                    {houses.map(housesObject => (
                        <div key={housesObject.id}>
                            <Link to={`/houses/${housesObject.id}`}>
                                {housesObject.desc}
                            </Link>
                        </div>
                    ))}
                </div>
            );
        }
    }
}
export default HousesList;
