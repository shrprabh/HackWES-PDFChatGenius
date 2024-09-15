import { useEffect, useRef, useState } from "react";
import {storage} from "../firebase-config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ChatPdfService, FAKE_MESSAGES } from "../Chat_Pdf.service";
import { ChatContainer, MessagesContainer, MessageStyle } from "./ChatWindow.styles";

interface Props {
    setPdfUrl: (url: string) => any;
}

interface Message {
    content: string;
    timestamp: number;
}

export const ChatWindow = (props: Props) => { 
    const [selectedFile, setSelectedFile] = useState(null);
    const [sourceId, setSourceId] = useState("");
    const [userMessagesList, setUserMessagesList] = useState<Message[]>([]);
    const [assistantMessagesList, setAssistantMessagesList] = useState<Message[]>([]);
    const [messagesList, setMessagesList] = useState<Message[]>([]);
    const [isChatStarted, setIsChatStarted] = useState(false);
    const [query, setQuery] = useState("");
    const fileInputRef = useRef(null);
    const chatPdfService = new ChatPdfService();

    useEffect(() => {
        const sourceId = localStorage.getItem("sourceId");
        if (sourceId) {
            setSourceId(sourceId);
        }
    }, []);

    useEffect(() => {
        console.log('in useEffect');
        let messagesList = [...userMessagesList, ...assistantMessagesList];
        messagesList = messagesList.sort((a, b) => a.timestamp - b.timestamp);
        setMessagesList(messagesList);
    }, [userMessagesList.length, assistantMessagesList.length]);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setSelectedFile(event.target.files[0]);

        try {
            const storageRef = ref(storage, `hackwest/${event.target.files[0].name}`); 
            const snapshot = await uploadBytes(storageRef, event.target.files[0]!);
            const downloadURL = await getDownloadURL(snapshot.ref);
            console.log("File available at:", downloadURL);

            setIsChatStarted(true);
            if (!sourceId)
                addFileToPdfChat(downloadURL);
        } catch (error) {
            console.error("Upload failed", error); 
        }
    }

    const addFileToPdfChat = async (downloadURL: string) => {
       const response = await chatPdfService.addUrl(downloadURL);
       console.log('response: ', response);
       localStorage.setItem("sourceId", response.sourceId);
       setSourceId(response.sourceId);
        props.setPdfUrl(downloadURL);
    }

    const sendQuery = async () => {
        if (!query.trim()?.length) {
            return ;
        }

        setUserMessagesList((prev) => [...prev, { content: query, timestamp: Date.now()}])

        const assistanctResponse = await chatPdfService.sendQuery(sourceId, query);

        setAssistantMessagesList((prev) => [...prev, { content: assistanctResponse.content, timestamp: Date.now()}])

        setQuery("");
    }

    const handleKeyPress = (event: any) => {
        if (event.key === 'Enter') {
            sendQuery();
        }
    }

    const UploadJSX = () => {
        return (
        <div className="d-flex justify-content-center align-items-center">
            <input ref={fileInputRef} hidden={true} type="file" onChange={handleSubmit} />
            <button 
                onClick={() => {(fileInputRef.current as any).click()}}
                style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: 'rgb(255, 102, 0)', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            >
            Upload PDF
          </button>
        </div> );
    }

    return (
    <ChatContainer>
        {isChatStarted && <MessagesContainer>
            {messagesList.map((message, index) => {
                return (
                    <MessageStyle isUser={index%2 == 1}>
                        {message.content}
                    </MessageStyle>
                );
            })}
        </MessagesContainer> }
        {!isChatStarted && <UploadJSX />}
        {isChatStarted && <div className="input-group" style={{marginTop: 'auto', marginBottom: 2}}>
            <input type="text" 
                 value={query} 
                 onKeyDown={handleKeyPress}
                 onChange={(event) => {setQuery(event.target.value);}}
                className="form-control" placeholder="Ask Your Pdf Assistant" 
            />
            <div onClick={sendQuery} className="input-group-append">
                <span className="input-group-text">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                        <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
                    </svg>
                </span>
            </div>
        </div>}
    </ChatContainer>
    );
}