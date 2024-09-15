import React, { useEffect, useRef, useState } from "react";
import { storage } from "../firebase-config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ChatPdfService } from "../Chat_Pdf.service";
import { ChatContainer, MessagesContainer, MessageStyle } from "./ChatWindow.styles";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import 'katex/dist/katex.min.css';

interface Props {
    setPdfUrl: (url: string) => any;
}

interface Message {
    content: string;
    timestamp: number;
}

const MessageContent = ({ content }: { content: string }) => (
    <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
            p: ({ children }) => <p style={{ textAlign: 'left', margin: '0 0 10px 0' }}>{children}</p>,
            ul: ({ children }) => <ul style={{ marginLeft: '20px', textAlign: 'left' }}>{children}</ul>,
            ol: ({ children }) => <ol style={{ marginLeft: '20px', textAlign: 'left' }}>{children}</ol>,
            li: ({ children }) => <li style={{ marginBottom: '5px', textAlign: 'left' }}>{children}</li>,
        }}
    >
        {content}
    </ReactMarkdown>
);

export const ChatWindow = (props: Props) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [sourceId, setSourceId] = useState("");
    const [userMessagesList, setUserMessagesList] = useState<Message[]>([]);
    const [assistantMessagesList, setAssistantMessagesList] = useState<Message[]>([]);
    const [messagesList, setMessagesList] = useState<Message[]>([]);
    const [isChatStarted, setIsChatStarted] = useState(false);
    const [query, setQuery] = useState("");
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const chatPdfService = new ChatPdfService();

    useEffect(() => {
        const storedSourceId = localStorage.getItem("sourceId");
        if (storedSourceId) {
            setSourceId(storedSourceId);
        }
    }, []);

    useEffect(() => {
        const combinedMessages = [...userMessagesList, ...assistantMessagesList];
        combinedMessages.sort((a, b) => a.timestamp - b.timestamp);
        setMessagesList(combinedMessages);
    }, [userMessagesList, assistantMessagesList]);

    const handleSubmit = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedFile(event.target.files[0]);

            try {
                const storageRef = ref(storage, `hackwest/${event.target.files[0].name}`);
                const snapshot = await uploadBytes(storageRef, event.target.files[0]);
                const downloadURL = await getDownloadURL(snapshot.ref);

                setIsChatStarted(true);
                await addFileToPdfChat(downloadURL);
            } catch (error) {
                console.error("Upload failed", error);
                toast.error('File upload failed. Please try again.');
            }
        }
    };

    const addFileToPdfChat = async (downloadURL: string) => {
        try {
            const response = await chatPdfService.addUrl(downloadURL);
            localStorage.setItem("sourceId", response.sourceId);
            setSourceId(response.sourceId);
            props.setPdfUrl(downloadURL);

            toast.success('Ask questions about the PDF Document.');
        } catch (error) {
            console.error("Failed to add file to chat", error);
            toast.error('Failed to add file to chat. Please try again.');
        }
    };

    const sendQuery = async () => {
        if (!query.trim()) return;

        setUserMessagesList(prev => [...prev, { content: query, timestamp: Date.now() }]);

        const assistantResponse = await chatPdfService.sendQuery(sourceId, query);
        setAssistantMessagesList(prev => [...prev, { content: assistantResponse.content, timestamp: Date.now() }]);
        setQuery("");
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            sendQuery();
        }
    };

    const UploadJSX = () => (
        <div className="d-flex justify-content-center align-items-center">
            <input ref={fileInputRef} hidden type="file" onChange={handleSubmit} />
            <button
                onClick={() => fileInputRef.current?.click()}
                style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    backgroundColor: 'rgb(255, 102, 0)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
            >
                Upload PDF
            </button>
        </div>
    );

    return (
        <ChatContainer>
            <ToastContainer position="top-right" autoClose={5000} />
            {isChatStarted && (
                <MessagesContainer>
                    {messagesList.map((message, index) => (
                        <MessageStyle key={index} isUser={index % 2 === 0}>
                            <MessageContent content={message.content} />
                        </MessageStyle>
                    ))}
                </MessagesContainer>
            )}
            {!isChatStarted && <UploadJSX />}
            {isChatStarted && (
                <div className="input-group" style={{ marginTop: 'auto', marginBottom: 2 }}>
                    <input
                        type="text"
                        value={query}
                        onKeyDown={handleKeyPress}
                        onChange={(event) => setQuery(event.target.value)}
                        className="form-control"
                        placeholder="Ask Your Pdf Assistant"
                    />
                    <div onClick={sendQuery} className="input-group-append">
                        <span className="input-group-text">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
                            </svg>
                        </span>
                    </div>
                </div>
            )}
        </ChatContainer>
    );
};