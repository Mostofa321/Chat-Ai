import React, { useRef, useState } from 'react';

const user = "user";
const AI = "ai";
const Chat = () => {
    const chatInputEl = useRef();
    const [req_And_res, setReq_And_res] = useState([]);
    console.log(req_And_res)
    const [loading, setLoading] = useState(false);

    const update_req_And_res = (from, value) => {
        setReq_And_res((req_And_res) => [...req_And_res, { from, value }]);
    };

    const handleSend = () => {
        const userRequest = chatInputEl.current.value;
        update_req_And_res(user, userRequest);
        setLoading(true);

        // 'POST REQUEST' to server to get response from 'openai'
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userRequest })
        }
        fetch('https://chat-me-server.vercel.app/chat', requestOptions)
            .then(response => response.json())
            .then(data => update_req_And_res(AI, data.Ai_response))
            .finally(() => {
                setLoading(false);
            });
    };
    const handleKeyDown = (event) => {
        event.key === 'Enter' && handleSend();
      };
    return (
        <main className="App py-5 relative h-screen">
            {/* chat message section */}
            <section className='absolute top-0 bottom-40 overflow-y-scroll  right-[2%] md:right-[25%] w-[96%] md:w-1/2'>
                {
                    req_And_res.map((reqAres, index) => {
                        if (reqAres.from === 'user') {
                            return (
                                <article className="chat chat-end" key={index}>
                                    <div className="chat-image avatar">
                                        <div className="w-10 rounded-full">
                                            <img src="https://i.ibb.co/mR5DcBv/My-project-1-1.png" alt='' />
                                        </div>
                                    </div>
                                    <div className="chat-header">
                                        YOU
                                    </div>
                                    <div className="chat-bubble">
                                        <p>
                                            {reqAres.value}
                                        </p>
                                    </div>
                                </article>
                            )
                        }
                        return (
                            <article className="chat chat-start" key={index}>
                                <div className="chat-image avatar">
                                    <div className="w-10 rounded-full">
                                        <img src="https://i.ibb.co/VSHMKTJ/My-project-1.png" alt='' />
                                    </div>
                                </div>
                                <div className="chat-header">
                                    AI
                                </div>
                                <div className="chat-bubble">
                                    <p className=''>
                                        {reqAres.value}
                                    </p>
                                </div>
                            </article>
                        )
                    })
                }

                {loading && (
                    <article className="chat chat-start">
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                                <img src="https://i.ibb.co/VSHMKTJ/My-project-1.png" alt='' />
                            </div>
                        </div>
                        <div className="chat-header">
                            AI
                        </div>
                        <div className="chat-bubble">
                            <p>
                                Typing...
                            </p>
                        </div>
                    </article>
                )}

            </section>
            {/* chat input section */}
            <section>
                
                <input type="text" ref={chatInputEl} onKeyDown={handleKeyDown} placeholder="Type here" className="input input-bordered bg-slate-700 absolute bottom-20 right-[5%] md:right-1/4 w-[90%] md:w-1/2  " />
                <button onClick={handleSend}>
                    <i className="fa-solid fa-location-arrow text-2xl absolute bottom-[5.5rem] hover:text-3xl right-[10%]  md:right-[27%]"></i>
                </button>
            </section>
        </main>
    );
};

export default Chat;