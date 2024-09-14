import { useState } from "react";
import {storage} from "../firebase-config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ChatPdfService } from "../Chat_Pdf.service";

interface Props {
    setPdfUrl: (url: string) => any;
}

export const ChatWindow = (props: Props) => { 
    const [selectedFile, setSelectedFile] = useState(null);
    const [sourceId, setSourceId] = useState("");
    const [userMessagesList, setUserMessagesList] = useState<string[]>([]);
    const [assistantMessagesList, setAssistantMessagesList] = useState<string[]>([]);

    const chatPdfService = new ChatPdfService();

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setSelectedFile(event.target.files[0]);

        try {
            const storageRef = ref(storage, `hackwest/${event.target.files[0].name}`); 
            const snapshot = await uploadBytes(storageRef, event.target.files[0]!);
            const downloadURL = await getDownloadURL(snapshot.ref);
            console.log("File available at:", downloadURL);
            addFileToPdfChat(downloadURL);
        } catch (error) {
            console.error("Upload failed", error); 
        }
    }

    const addFileToPdfChat = async (downloadURL: string) => {
       const response = await chatPdfService.addUrl(downloadURL);
       setSourceId(response.sourceId);
    }

    const sendQuery = async (query: string) => {
        userMessagesList.push(query);

        const assistanctResponse = await chatPdfService.sendQuery(sourceId, query);
        assistantMessagesList.push(assistanctResponse.content);
    }



    return (
    <div className="d-flex justify-content-center align-items-center" style={{marginTop: 50}}>
        <input type="file" onChange={handleSubmit} />
        <input type="text"></input>
    </div>
    );
}