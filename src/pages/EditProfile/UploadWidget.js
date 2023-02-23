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

        if (photoName === '' && result.info.files[0].uploadInfo.path !== '') {
          // setPhotoName()
          console.log(
            `https://res.cloudinary.com/dwgeik14h/image/upload/${result.info.files[0].uploadInfo.path}`
          );
          setFormValues({
            ...formValues,
            photo_url: `https://res.cloudinary.com/dwgeik14h/image/upload/${result.info.files[0].uploadInfo.path}`
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
      Upload & replace photo?
    </Button>
  );
}
