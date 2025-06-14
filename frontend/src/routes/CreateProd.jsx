import { useRef, useState } from "react";
import FormField from "../components/FormField";
import { IKContext, IKUpload } from "imagekitio-react";
import { upload } from "@imagekit/react";

const authenticator = async () => {
  try {
    // Perform the request to the upload authentication endpoint.
    const response = await fetch("http://localhost:5001/api/prods/getimgs");
    if (!response.ok) {
      // If the server response is not successful, extract the error text for debugging.
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    // Parse and destructure the response JSON for upload credentials.
    const data = await response.json();
    const { signature, expire, token, publicKey } = data;

    return { signature, expire, token, publicKey };
  } catch (error) {
    console.error("Authentication error:", error);
    throw new Error("Authentication request failed");
  }
};

function CreateProd() {
  const fileInputRef = useRef(null);
  const [progress, setProgress] = useState([]);

  const handleUpload = async () => {
    const files = fileInputRef.current?.files;
    if (!files || files.length === 0) {
      alert("請選擇至少一張圖片");
      return;
    }

    const auth = await authenticator().catch((err) => {
      console.error("Auth error:", err);
      return null;
    });
    if (!auth) return;

    const arr = Array.from(files);
    setProgress(arr.map(() => 0));

    arr.forEach((file, idx) => {
      upload({
        file,
        fileName: file.name,
        ...auth,
        onProgress: ({ loaded, total }) => {
          setProgress((prev) => {
            const copy = [...prev];
            copy[idx] = (loaded / total) * 100;
            return copy;
          });
        },
      })
        .then((res) => {
          console.log(`檔案 ${file.name} 上傳完成：`, res.url);
        })
        .catch((err) => {
          console.error(`檔案 ${file.name} 上傳失敗：`, err);
        });
    });
  };

  function handleProd(e) {
    e.preventDefault();
  }

  return (
    <>
      <form onSubmit={handleProd}>
        <FormField label="產品名稱" type="text" name="prodname" />
        <FormField label="價錢" type="text" name="price" />
        <FormField label="描述" type="text" name="description" />
        <FormField label="星星" type="text" name="rate" />

        <IKContext
          publicKey={import.meta.env.VITE_IK_PUBLIC_KEY}
          urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
          authenticator={authenticator}
        >
          <IKUpload
            useUniqueFileName
            onError={(err) => console.error("Upload error", err)}
          />
        </IKContext>

        <br />
        {/* {preview && (
        <div>
          <p>預覽：</p>
          <img
            src={preview}
            alt="cover preview"
            style={{ maxWidth: "200px", marginTop: "10px" }}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgLoaded(false)}
          />
        </div>
      )} */}

        <button type="submit">送出</button>
      </form>
      <div>
        <input type="file" multiple accept="image/*" ref={fileInputRef} />
        <button onClick={handleUpload}>上傳全部圖片</button>

        {progress.map((p, i) => (
          <div key={i}>
            <span>檔案 {i + 1}：</span>
            <progress value={p} max={100} />
            <span> {p.toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </>
  );
}
export default CreateProd;
