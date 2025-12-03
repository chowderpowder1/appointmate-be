import axios from "axios";
import { api } from "./apiClient.js";

export const users = async () => {
    const response = await api.get('/auth/session', { withCredentials: true })
    return response.data;
}

    // .then((res)=>{
    //     setData(res.data);
    //     setLoading(false);
    // })
    // .catch((err)=>{
    //     setError(err.message);
    //     setLoading(false);
    // });

//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);


//   if (loading) return <div>Loading...</div>
//   if (error) return <div>Error: {error}</div>
  
