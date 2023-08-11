import {useState} from "react";
import Logo from './Logo';
import PackingList from './PackingList';
import Form from './Form';
import Item from './Item';
import Stats from './Stats';



export default function App() {
    const [items, setItems] = useState([]);


    function handleAddItems(item) {
        setItems((items) => [...items, item])
    }

    function handleDelete(id) {
        setItems(items => items.filter(item => item.id !== id))
    }

    function handleToggleItem(id) {
        setItems((items) => items.map((item) => item.id === id ? {...item, packed: !item.packed} : item))
    }

    function handleClearAll(){
        const confirmed = window.confirm("Are you sure you want to delete?")

        if(confirmed) setItems([]);
    }

    return (
        <div className="app">
            <Logo/>
            <Form onAddItems={handleAddItems}/>
            <PackingList items={items} onDeleteItem={handleDelete} onToggleItem={handleToggleItem} onClearAll={handleClearAll}/>
            <Stats items={items}/>
        </div>
    )
}




