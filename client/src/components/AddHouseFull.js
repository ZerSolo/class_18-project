import React, { Component } from 'react';
import '../App.sass';
const Report = ({ report }) => (
    <div className="report">
        reporting valid houses :{report.valid} <br />
        Invalid houses : {report.invalid}
        {report.invalidData.map(data => (
            <div>
                messages:<pre> {JSON.stringify(data.errors, null, 2)}</pre>
                raw: <pre> {JSON.stringify(data.raw, null, 2)}</pre>
            </div>
        ))}
    </div>
);

class AddHouseFull extends Component {
    state = {
        error: null,
        report: null,
    };

    HandleSubmit = event => {
        event.preventDefault();
        fetch('/api/houses', {
            method: 'POST',
            body: this.dataInput.value,
            headers: {
                'content-type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    this.setState({ error: data.error });
                } else {
                    this.setState({ error: null, report: data });
                }
            })
            .catch(error => {
                console.log(error);
            });
    };
    render() {
        const { error, report } = this.state;
        return (
            <form onSubmit={this.HandleSubmit}>
                <textarea
                    ref={input => (this.dataInput = input)}
                    style={{ width: '80%', height: '300px' }}
                />
                {error && <div> {error}</div>}
                <br />
                <button type="submit"> Submit</button>
                {!!report && <Report report={report} />}
            </form>
        );
    }
}

export default AddHouseFull;
