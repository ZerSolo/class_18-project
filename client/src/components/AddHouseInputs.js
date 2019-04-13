import React, { Component } from 'react';

class AddHouse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
        };
    }

    onSubmit = event => {
        event.preventDefault();
        console.log(this.priceInput);
        fetch(`/api/houses`, {
            method: 'POST',
            body: JSON.stringify({
                price: this.priceInput.value,
                desc: this.descInput.value,
            }),
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                if (data.error) {
                    this.setState({
                        error: data.error,
                    });
                } else {
                    this.setState({
                        error: null,
                    });
                }
            })
            .catch(error => {
                this.setState({
                    error: error.message,
                });
            });
        this.priceInput.value = '';
        this.descInput.value = '';
    };
    render() {
        const { error } = this.state;
        if (error) {
            return <div>{error}</div>;
        } else {
            return (
                <div>
                    <h2> Please add your House</h2>
                    <form onSubmit={this.onSubmit}>
                        PRICE:{' '}
                        <input
                            type="number "
                            ref={element => {
                                this.priceInput = element;
                            }}
                            name="price"
                            placeholder="add price for the house"
                        />
                        Description:
                        <input
                            type="text "
                            ref={element => {
                                this.descInput = element;
                            }}
                            name="desc"
                            placeholder="put Description for the house"
                        />
                        <br />
                        <button type="submit" className="submitButton">
                            {' '}
                            Submit{' '}
                        </button>
                    </form>
                </div>
            );
        }
    }
}

export default AddHouse;
