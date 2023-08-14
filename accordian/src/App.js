import "./styles.css";
import {useState} from 'react';

const faqs = [
    {
        title: "Where are these chairs assembled?",
        text:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus."
    },
    {
        title: "How long do I have to return my chair?",
        text:
            "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus."
    },
    {
        title: "Do you ship to countries outside the EU?",
        text:
            "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!"
    }
];

export default function App() {
    return (
        <div>
            <Accordion data={faqs}/>
        </div>
    );
}

function Accordion({data}) {
    const [currentOpen, setIsOpen] = useState(null);

    return (
        <div className='accordion'>
            {data.map((el, i) => (
                <AccordionItem currentOpen={currentOpen} onOpen={setIsOpen} title={el.title} num={i} key={i}>{el.text}</AccordionItem>
            ))}
            <AccordionItem currentOpen={currentOpen} onOpen={setIsOpen} title={'test 2'} num={22} key={'test 2'}>
                <p>Allows React Developers to:</p>
                <ul>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur cum earum labore non nulla quas. Nemo omnis rem suscipit voluptas!
                </ul>
            </AccordionItem>
        </div>
    );
}


function AccordionItem({num, title, currentOpen, onOpen, children}) {
    const isOpen = num === currentOpen;

    function handleToggle(){
       onOpen(isOpen ? null : num);
    }

    return (
        <div className={`item ${isOpen ? "open" : ''}`} onClick={handleToggle}>
            <p className='number'>{num < 9 ? `0${num + 1}` : num + 1 }</p>
            <p className="title">{title}</p>
            <p className="icon">{isOpen ? "-" : "+"}</p>
            {isOpen && <p className="content-box">{children}</p>}
        </div>
    )
}