import { useState } from "react";
import {storage} from "../firebase-config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const Layout= () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setSelectedFile(event.target.files[0]);

        try {
            const storageRef = ref(storage, `hackwest/${event.target.files[0].name}`); 
            const snapshot = await uploadBytes(storageRef, event.target.files[0]!);
            const downloadURL = await getDownloadURL(snapshot.ref);
            console.log("File available at:", downloadURL);
        } catch (error) {
            console.error("Upload failed", error); 
        }
    }

    return (
    <div className="d-flex justify-content-center align-items-center" style={{marginTop: 50}}>
        <input type="file" onChange={handleSubmit} />
        {/* <form onSubmit={handleSubmit}>
            <button className="btn btn-primary" type="submit" disabled={!selectedFile} > Upload</button>
        </form> */}
    </div>
    );
}