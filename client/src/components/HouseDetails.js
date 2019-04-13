import React, { Component } from 'react';

class House extends Component {
    constructor(props) {
        super(props);
        this.state = {
            houseDetails: {},
            error: null,
            loading: false,
        };
    }
    componentDidMount() {
        const { id } = this.props.match.params;
        this.setState({
            error: null,
            loading: true,
        });
        fetch(`/api/houses/${id}`)
            .then(res => res.json())
            .then(houseData => {
                console.log('House details', houseData);
                this.setState({
                    houseDetails: houseData,
                    error: houseData.error,
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
        const { houseDetails, error, loading } = this.state;
        if (loading) {
            return <div> loading Data ... </div>;
        }
        if (error) {
            return <div>{error}</div>;
        }

        if (!houseDetails) {
            return <div> no house details</div>;
        } else {
            return (
                <div>
                    <ul className="houseDetails">
                        {Object.entries(houseDetails).map(houseInfo => {
                            return (
                                <li className="houseInfo">
                                    {houseInfo[0]}
                                    {':'} {houseInfo[1]}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            );
        }
    }
}

export default House;
