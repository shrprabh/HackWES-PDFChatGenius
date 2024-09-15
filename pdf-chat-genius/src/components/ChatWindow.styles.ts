import styled from 'styled-components';

export const ChatContainer = styled.div`
    border: 1px solid #8b4513; /* Saddle brown for border */
    border-radius: 4px;
    height: calc(100vh - 126px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: linear-gradient(60deg, white ,  white
); /* Warm beige to deep orange gradient */
`;

export const MessageStyle = styled.div<{ isUser: boolean }>`
    border-radius: 6.5px;
    margin-left: ${props => props.isUser ? 'auto' : ''};
    margin-right: ${props => !props.isUser ? 'auto' : ''};
    background-color: ${props => props.isUser ? '#1972F5 ' : '#4682B4 '}; /* Light green for user messages */
    padding: 8px 6px;
    max-width: 500px;
    color:white
`;

export const MessagesContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 6px;
    overflow-y: scroll;
`;