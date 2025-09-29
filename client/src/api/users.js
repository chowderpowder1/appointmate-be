import axios from "axios";

export const users = async () => {

    const response = await axios
    .get('http://localhost:8080/auth/again', { withCredentials: true })

    return response.data

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
  
