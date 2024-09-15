import styled from "styled-components";

export const ChatContainer = styled.div`
    border: 1px solid #E0E0E0;
    border-radius: 4px;
    height: calc(100vh - 126px);
    /* background-color: yellow; */
    display: flex;
    flex-direction: column;
    background: linear-gradient(90deg, #1e3c72, #2a5298); /* Gradient blue */
`;

export const MessageStyle = styled.div<{isUser: boolean}>`
    border-radius: 6.5px;
    margin-left: ${props => props.isUser ? 'auto' :  ''};
    margin-right: ${props => !props.isUser ? 'auto' : ''};
    background-color: white;
    padding: 8px 6px;
    max-width: 500px;
    
    // color: white;

`;

export const MessagesContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 6px;
    overflow-y: scroll;
    
`;