import React from 'react';
import SearchBar from './SearchBar';
import ItemList from './ItemList';
import Cart from './Cart';

class POS extends React.Component {
    state = {
        query: '',
        matchedItems: null,
        cartItems: []
    }

    filterItems = () => {
        let matches = [];
        this.props.items.forEach(item => {
            if((item.name.toUpperCase().includes(this.state.query) ||
                item.sku.toUpperCase().includes(this.state.query)) && 
                matches.length <= 10) {
                matches.push(item);
            }
        });
        this.setState({ matchedItems: matches });
    }

    handleSearchChange = e => {
        this.setState({ query: e.target.value.toUpperCase() });
        this.filterItems();
    }

    addToCart = sku => {
        let items = this.state.cartItems;

        // Finding item
        let filtered = this.state.matchedItems.filter((item) => {
            if(item.sku === sku) {
                return item;
            }
        });

        // If found - update cart
        if(filtered) {
            items.push(filtered[0]);
            // console.log(filtered[0]);
            this.setState({ cartItems: items });
        } else {
            console.log("No item found to match selected item.");
        }
    }

    removeFromCart = sku => {
        let items = this.state.cartItems;

        // Finding item
        this.state.matchedItems.filter((item) => {
            // if found
            if(item.sku === sku) {
                // console.log(item);
                items.pop(item);
                this.setState({ cartItems: items });
            }
        });
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <SearchBar currentQuery={this.state.query} handleOnChange={this.handleSearchChange} />
                    <ItemList items={this.state.matchedItems} handleAddToCart={this.addToCart} />
                </div>
                <div className="col">
                    <Cart items={this.state.cartItems} handleRemoveFromCart={this.removeFromCart} />
                </div>
            </div>
        );
    }
}

export default POS;