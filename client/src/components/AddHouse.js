import React, { Component } from 'react';
class AddHouse extends Component {
    onSubmit = event => {
        event.preventDefault();
        console.log('submition');
        console.log(this.priceInput);

        fetch(`/api/houses`, {
            method: 'POST',
            body: this.dataInput.value,
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                console.log(data);
            });
    };
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <textarea
                    type="number "
                    ref={input => {
                        this.dataInput = input;
                    }}
                    style={{
                        width: '300px',
                        height: '500px',
                        display: 'block',
                    }}
                />
                <button type="submit"> Submit </button>
            </form>
        );
    }
}

export default AddHouse;
