import {useState} from 'react'
import {usePaymentStore} from "../../store/paymentStore"

const Khalti = () => {
      const { orders, loading, error, initializePayment, verifyKhaltiPayment } =
        usePaymentStore();
      const [amount, setAmount] = useState(0);
      const [itemId, setItemId] = useState("");
      const [websiteUrl, setWebsiteUrl] = useState("http://localhost:5000");
      const [pidx, setPidx] = useState("");

        const handleInitializePayment = async () => {
          await initializePayment(amount, itemId, websiteUrl);
        };

        const handleVerifyPayment = async () => {
          await verifyKhaltiPayment(pidx);
        };
  return (
    <div>Khalti</div>
  )
}

export default Khalti