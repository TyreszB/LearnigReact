import { useState } from 'react';

const initialFriends = [
    {
        id: 118836,
        name: "Clark",
        image: "https://i.pravatar.cc/48?u=118836",
        balance: -7,
    },
    {
        id: 933372,
        name: "Sarah",
        image: "https://i.pravatar.cc/48?u=933372",
        balance: 20,
    },
    {
        id: 499476,
        name: "Anthony",
        image: "https://i.pravatar.cc/48?u=499476",
        balance: 0,
    },
];

export default function App() {
    const [friends,setFriends] = useState(initialFriends)
    const [showAddFreind,setShowAddFriend] = useState(false);
    const [selectedFreind,setSelectedFriend] = useState(null);

    function handleShowAddFriend(){
        setShowAddFriend(show => !show)
    }

    function handleAddFriend(friend){
        setFriends(friends => [...friends, friend]);
        setShowAddFriend(false);
    }

    function handleSelection(friend){
        setSelectedFriend((curr) => curr?.id === friend.id ? null : friend);
        setShowAddFriend(false);
    }


    function handleSplitBill(value){
        setFriends(friends => friends.map(friend => friend.id === selectedFreind.id ?
            {...friend, balance: friend.balance + value} : friend))
        setSelectedFriend(null);
    }

    return <div className='app'>
        <div className='sidebar'>
            <FriendsList friends={friends} selectedFriend={selectedFreind} onSelection={handleSelection}/>

            {showAddFreind && <FormAddFriend onAddFriend={handleAddFriend} />}
            <Button onClick={handleShowAddFriend}>
                {showAddFreind ? 'Close': "Add Friend"}
            </Button>
        </div>
        {selectedFreind && <FormSplitBill selectedFriend={selectedFreind} onSplitBill={handleSplitBill} key={selectedFreind.id}/>}

    </div>
}

function FriendsList({friends, selectedFriend ,onSelection}) {
    return (
        <ul>
            {friends.map((friend) => (
                <Friend friend={friend} key={friend.id} selectedFriend={selectedFriend} onSelection={onSelection}/>
            ))}
        </ul>
    );
}

function Friend({friend,selectedFriend,onSelection}) {
    const isSelected = selectedFriend?.id === friend.id;
    return (
        <li className={isSelected ? 'selected' : ""}>
            <img src={friend.image} alt={friend.name}/>
            <h3>{friend.name}</h3>

            {friend.balance < 0 && (
                <p className='red'>
                    You owe {friend.name} ${Math.abs(friend.balance)}
                </p>
            )}
            {friend.balance > 0 && (
                <p className="green">
                    {friend.name} owes you ${friend.balance}
                </p>
            )}

            {friend.balance === 0 && (
                <p>You and {friend.name} are even</p>
            )}
            <Button onClick={() => onSelection(friend)}>
                {isSelected ? "Close" : "Select"}
            </Button>
        </li>
    );
}

function Button({children,onClick}) {
    return <button className="button" onClick={onClick}>{children}</button>
}

function FormAddFriend({onAddFriend}) {
    const [name,setName] = useState("");
    const [image,setImage] = useState("https://i.pravatar.cc/48");

    function handleSubmit(e){
        e.preventDefault();

        if(!name || !image) return;
        const id = crypto.randomUUID();
        const newFriend = {
            name,
            image :`${image}?=${id}`,
            balance: 0,
            id
        };
        onAddFriend(newFriend);

        setName("")
        setImage("https://i.pravatar.cc/48")
    }

    return (
        <form action="" className="form-add-friend" onSubmit={handleSubmit}>
            <label>👬Friend Name</label>
            <input type='text' value={name} onChange={(e) => setName(e.target.value)}/>

            <label>🌄Image URL</label>
            <input type="text" value={image} onChange={(e) => setImage(e.target.value)}/>

            <Button>Add</Button>

        </form>
    )
}

function FormSplitBill({selectedFriend , onSplitBill}) {
    const[bill,setBill] = useState("");
    const [payedByUser, setPayedByUser] = useState("");
    const paidByFriend = bill ? bill - payedByUser : "";
    const [whoIsPaying,setWhoIsPaying] = useState("user")

    function handleSubmit(e){
        e.preventDefault();
        if (!bill || !payedByUser) return;
        onSplitBill(whoIsPaying === 'user' ? paidByFriend : -payedByUser);

    }

    return (
        <form action="" className="form-split-bill" onSubmit={handleSubmit}>
            <h2>Split a bill with {selectedFriend.name}</h2>

            <label>💰Bill Value</label>
            <input type="text" value={bill} onChange={(e) => setBill(Number(e.target.value))}/>

            <label>🧍🏻Your expense</label>
            <input type="text" value={payedByUser} onChange={(e) => setPayedByUser(Number(e.target.value) > bill ? payedByUser : Number(e.target.value) )}/>

            <label>👬 {selectedFriend.name}'s expense</label>
            <input type="text" disabled value={paidByFriend}/>

            <label>🤑Who is paying the bill?</label>
            <select value={whoIsPaying} onChange={(e) => setWhoIsPaying(e.target.value)}>
                <option value="user">You</option>
                <option value="friend">{selectedFriend.name}</option>
            </select>

            <Button>Split Bill</Button>

        </form>
    )
}