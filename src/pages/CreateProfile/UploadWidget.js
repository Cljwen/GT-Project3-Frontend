import { useEffect, useRef, useState } from 'react';
import { Button } from 'antd';

export function UploadWidget({ setFormValues, formValues }) {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [photoName, setPhotoName] = useState('');

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: 'dwgeik14h',
        uploadPreset: 'aixnywnp'
      },
      function (error, result) {
        console.log(result);
        console.log(result.info.files[0].uploadInfo.path);
        if (photoName === '' && result.info.files[0].uploadInfo.path !== '') {
          // setPhotoName()
          console.log(
            `https://res.cloudinary.com/dwgeik14h/image/upload/${result.info.files[0].uploadInfo.path}`
          );
          setFormValues({
            ...formValues,
            profile_photo: `https://res.cloudinary.com/dwgeik14h/image/upload/${result.info.files[0].uploadInfo.path}`,
          });
        }
      }
    );
  }, []);

  return (
    <Button
      onClick={() => {
        widgetRef.current.open();
      }}>
      Upload
    </Button>
  );
}
