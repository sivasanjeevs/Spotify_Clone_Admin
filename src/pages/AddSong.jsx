import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify';
import { url } from '../App';


const AddSong = () => {

    const [image, setImage] = useState(false);
    const [song, setSong] = useState(false);
    const [name,setName] = useState("");
    const [desc, setDesc] = useState("");
    const [album, setAlbum] = useState("none");
    const [loading, setLoading] = useState(false);
    const [albumData, setAlbumData] = useState([]);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try{

            const formData = new FormData();

            formData.append('name', name);
            formData.append('desc', desc);
            formData.append('album', album);
            formData.append('song', song);
            formData.append('image', image);

            const response = await axios.post(`${url}/api/song/add`, formData);

            if(response.data.success){
                toast.success('Song added successfully');
                setName('');
                setDesc('');
                setAlbum('none');
                setSong(false);
                setImage(false);
            }
            else{
                toast.error('Failed to add song');
            }

        }catch(error){
            
            toast.error('Error to add song');
        }
        setLoading(false);

    }

  return loading ? (
    <div className='grid place-item-center min-h-[80vh]'>
        <div className='w-16 h-16 place-self-center border-4 border-grey-400 border-t-green-800 rounded-full animate-spin '></div>

    </div>
  ) : (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-start gap-8 text-grey-600 '>
        <div className='flex gap-8'>
            <div className='flex flex-col gap-4'>
                <p>Upload song</p>
                <input onChange={(e) => setSong(e.target.files[0])} type='file' id='song' accept='audio/*' hidden/>
                <label htmlFor='song'>
                    <img src={song ? assets.upload_added : assets.upload_song} className='w-24 cursor-pointer ' alt=''/>
                </label>
            </div>
            <div className='flex flex-col gap-4'>
                <p>Uplodad Image</p>
                <input onChange={(e) => setImage(e.target.files[0])} type='file' id='image' accept='image/*' hidden/>
                <label htmlFor='image'>
                    <img src={image ? URL.createObjectURL(image) : assets.upload_area} className='w-24 cursor-pointer ' alt=''/>
                </label>
            </div>
        </div>
        <div className='flex flex-col gap-2.5'>
            <p>Song Name</p>
            <input onChange={(e) => setName(e.target.value)} value={name} className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw, 250px)]' placeholder='Type Here' type='text' required />
        </div>

        <div className='flex flex-col gap-2.5'>
            <p>Song Description</p>
            <input onChange={(e) => setDesc(e.target.value)} value={desc} className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw, 250px)]' placeholder='Type Here' type='text' required />
        </div>

        <div className='flex flex-col gap-2.5'>
            <p>Album</p>
            <select onChange={(e) => setAlbum(e.target.value)} defaultValue={album} className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[150px]'>
                <option value="none" >None</option>    
            </select>     
        </div>

        <button type='submit' className='text-base bg-black text-white py-2.5 px-14 cursor-pointer  '>ADD</button>
    </form>
  )
}

export default AddSong