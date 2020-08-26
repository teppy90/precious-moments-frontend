import React, { Component } from 'react';
import { MDBIcon } from 'mdbreact';

class SearchBox extends Component {
    render() {
        return (
            <div>
                <form className="form-inline mt-4 mb-4" style={{ display:'flex', justifyContent:'center' }}>
                    <input className="form-control form-control-sm mr-3 search"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        onChange={this.props.handleChange}
                        style={{ width:'20vw' }}
                    />
                    <MDBIcon icon="search" />
                </form>
            </div>
        )
    }
}

export default SearchBox