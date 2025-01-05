import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { url } from '../App';

const ListAlbum = () => {
  const [data, setData] = useState([]);

  const fetchAlbum = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      if (response.data.success) {
        setData(response.data.albums);
      } else {
        toast.error('Failed to fetch albums');
      }
    } catch (error) {
      toast.error(`Error fetching albums: ${error.message}`);
    }
  };

  const removeAlbum = async (id) => {
    try {
      const response = await axios.post(`${url}/api/album/remove`, { id });
      if (response.data.success) {
        toast.success('Album removed successfully');
        await fetchAlbum();
      } else {
        toast.error('Failed to remove album');
      }
    } catch (error) {
      toast.error(`Error removing album: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchAlbum();
  }, []);

  return (
    <div>
      <p>All Album List</p>
      <br />
      <div>
        <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
          <b>Image</b>
          <b>Name</b>
          <b>Description</b>
          <b>Album Colour</b>
          <b>Action</b>
        </div>
        {data.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5"
          >
            <img className="w-12" src={item.image} alt="" />
            <p>{item.name}</p>
            <p>{item.desc}</p>
            <input type="color" value={item.bgColour} readOnly />
            <p
              onClick={() => removeAlbum(item._id)}
              className="cursor-pointer text-red-600"
            >
              x
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListAlbum;
