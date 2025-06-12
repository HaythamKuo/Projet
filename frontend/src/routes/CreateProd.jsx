import FormField from "../components/FormField";
import { IKContext, IKUpload } from "imagekitio-react";
function CreateProd() {
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
      //const { signature, expire, token } = data;

      return { signature, expire, token, publicKey };

      //return { signature, expire, token };
    } catch (error) {
      // Log the original error for debugging before rethrowing a new error.
      console.error("Authentication error:", error);
      throw new Error("Authentication request failed");
    }
  };

  function handleProd(e) {
    e.preventDefault();

    const data = new FormData(e.target);
    console.log(data);
  }

  return (
    <form onSubmit={handleProd}>
      <FormField label="產品名稱" type="text" name="prodname" />
      <FormField label="價錢" type="text" name="price" />
      <FormField label="描述" type="text" name="description" />
      <FormField label="星星" type="text" name="rate" />
      {/* <FormField label="照片" type="file" name="pic" /> */}

      <IKContext
        publicKey={import.meta.env.VITE_IK_PUBLIC_KEY}
        urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
        authenticator={authenticator}
      >
        <IKUpload fileName="ydddddd" />
      </IKContext>

      <button type="submit">送出</button>
    </form>
  );
}
export default CreateProd;
