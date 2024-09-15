import axios from "axios";


export const FAKE_MESSAGES = [
    {content: "What is this PDF about", timestamp: 1},
    {content: "Its about algorithms by MIT", timestamp: 2},
    {content: "What is an algorithm", timestamp: 3},
    {content: "Algorithm is a sequence of steps to execute a task", timestamp: 3}
];

export class ChatPdfService {

    CHAT_PDF_API_KEY  = "sec_kLcuXOB6PB6CezmIQS2JTvWQCgsVt3Am";

    constructor() {

    }

    async addUrl(url: string): Promise<{sourceId: string}> {
        const apiUrl = 'https://api.chatpdf.com/v1/sources/add-url';
        const payload = { url };
        const response = await axios.post(apiUrl, payload, {
            headers: {"x-api-key": this.CHAT_PDF_API_KEY, "Content-Type": "application/json"}
        });
        return response.data;
    }

    async sendQuery(sourceId: string, query: string): Promise<{content: string}> {
        const apiUrl = 'https://api.chatpdf.com/v1/chats/message';
        const payload = { 
            sourceId, 
            messages: [
                {   
                    "role": "user",
                    "content": query
                }
            ] 
        };
        const response = await axios.post(apiUrl, payload, {
            headers: {"x-api-key": this.CHAT_PDF_API_KEY, "Content-Type": "application/json"}
        });
        return response.data;
    }
}