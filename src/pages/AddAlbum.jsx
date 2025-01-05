import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { url } from '../App';

const AddAlbum = () => {
  const [image, setImage] = useState(null);
  const [colour, setColour] = useState('#121212');
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (image) {
      const objectUrl = URL.createObjectURL(image);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [image]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('name', name);
      formData.append('desc', desc);
      formData.append('colour', colour);

      const response = await axios.post(`${url}/api/album/add`, formData);

      if (response.data.success) {
        toast.success('Album added successfully');
        setDesc('');
        setImage(null);
        setName('');
      } else {
        toast.error('Failed to add album');
      }
    } catch (error) {
      toast.error(`Failed to add album: ${error.message}`);
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-start gap-8 text-gray-600"
    >
      {/* Form Fields */}
    </form>
  );
};

export default AddAlbum;
