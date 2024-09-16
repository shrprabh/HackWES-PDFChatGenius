# HackWES-PDFChatGenius

Unlock the power of your PDFs with **HackWES-PDFChatGenius**! Developed during the HackWES hackathon, this innovative project revolutionizes how you interact with PDF documents. By simply uploading a PDF, users can engage in natural conversations with an AI assistant to extract information, ask questions, and gain deeper insights from their documents.

## Features

- **Intelligent PDF Interaction**: Upload any PDF and ask questions to learn about the content.
- **Contextual Boundaries**: The AI assistant ensures users stay focused by answering only questions relevant to the document.
- **Exam Preparation**: Perfect for college students and researchers to quickly gather knowledge and prepare for exams.

## Tech Stack

- **Frontend**: React with TypeScript
- **Backend**: Firebase for authentication and data management
- **Storage**: Amazon S3 for secure and scalable PDF file storage
- **Libraries and Packages**: 
  - `@react-pdf/renderer`: For rendering PDF documents
  - `katex`: For rendering mathematical expressions
  - `react-toastify`: For notifications
  - `styled-components`: For dynamic styling
  - `react-pdf`, `react-markdown`: For rendering PDFs and Markdown content

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/shrprabh/HackWES-PDFChatGenius.git
   ```
2. Navigate to the project folder:
   ```bash
   cd HackWES-PDFChatGenius/pdf-chat-genius
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the app:
   ```bash
   npm start
   ```

## Project Structure

```bash
src/
  components/        # React components
  utils/             # Helper functions
  assets/            # Static assets
  services/          # API services
  App.tsx            # Main app component
  index.tsx          # Entry point
  ...
```

## Future Plans

- **Google Login Integration**: Allow users to log in with their Google accounts.
- **Unlimited Chat**: Provide seamless and unrestricted interaction with PDFs.
- **Custom LLM Integration**: Incorporate custom language models and web scraping for advanced features.
- **Educational Partnerships**: Implement the system for universities and colleges, offering free access to students in need.

## Contributors

- Shreyas Prabhakar¹
- Mahendra Kotapati¹
- Shiva Sai Pavan¹

## Acknowledgements

- **React-PDF**: For the seamless integration of PDFs in React applications.
- **Firebase**: For providing a reliable backend for authentication and database services.
- **ChatGPT API**: For powering intelligent conversations and contextual interactions.
- **Amazon S3**: For secure and scalable PDF storage.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## References

- [React-PDF Documentation](https://react-pdf.org/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Amazon S3 Documentation](https://aws.amazon.com/s3/)
- [ChatGPT API Documentation](https://platform.openai.com/docs/)
