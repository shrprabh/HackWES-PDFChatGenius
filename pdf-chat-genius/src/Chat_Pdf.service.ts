import axios from "axios";

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