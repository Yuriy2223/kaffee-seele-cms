import React, { useState, useRef } from 'react';
import { X, Camera } from 'lucide-react';
import Image from 'next/image';

interface PhotoUploadProps {
  onPhotoUpload: (photoUrl: string) => void;
  currentPhoto?: string;
  disabled?: boolean;
}

export const PhotoUpload: React.FC<PhotoUploadProps> = ({
  onPhotoUpload,
  currentPhoto,
  disabled = false,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const maxSize = 5 * 1024 * 1024;
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

    if (!allowedTypes.includes(file.type)) {
      setUploadError('Підтримуються тільки JPEG, PNG та WebP формати');
      return;
    }

    if (file.size > maxSize) {
      setUploadError('Розмір файлу не повинен перевищувати 5MB');
      return;
    }

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      setUploadError('Помилка конфігурації. Зверніться до адміністратора.');
      return;
    }

    setUploadError(null);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);
      formData.append('folder', uploadPreset);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Помилка завантаження фото');
      }

      const data = await response.json();
      const optimizedUrl = data.secure_url.replace(
        '/upload/',
        '/upload/w_160,h_160,c_fill,g_auto,q_auto,f_auto/'
      );
      onPhotoUpload(optimizedUrl);
    } catch {
      setUploadError('Не вдалося завантажити фото. Спробуйте ще раз.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemovePhoto = () => {
    onPhotoUpload('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        Ваше фото (не обов&apos;язково)
      </label>

      <div className="flex items-center gap-4">
        <div className="relative">
          {currentPhoto ? (
            <div className="relative group">
              <Image
                src={currentPhoto}
                alt="Ваше фото"
                width={80}
                height={80}
                className="rounded-full object-cover border-2 border-brown-200 shadow-md aspect-square"
                style={{ objectPosition: 'center center' }}
              />
              {!disabled && !isUploading && (
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                  aria-label="Видалити фото"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
              {isUploading && (
                <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
          ) : (
            <div className="relative">
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center border-2 border-dashed transition-colors ${
                  isUploading
                    ? 'bg-blue-50 border-warm-brown/30'
                    : 'bg-gray-50 border-gray-300 hover:bg-gray-100 hover:border-gray-400'
                }`}
              >
                {isUploading ? (
                  <div className="w-6 h-6 border-2 border-warm-brown border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Camera className="w-8 h-8 text-gray-400" />
                )}
              </div>
              {!isUploading && (
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFileSelect}
                  disabled={disabled}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-full"
                  title="Клікніть для завантаження фото"
                />
              )}
            </div>
          )}
        </div>

        <div className="flex-1">
          {currentPhoto ? (
            <div className="space-y-1">
              <p className="text-sm text-green-500 font-medium">
                ✓ Фото завантажено
              </p>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={disabled || isUploading}
                className="text-sm text-brown-600 hover:text-brown-700 underline"
              >
                Змінити фото
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileSelect}
                disabled={disabled || isUploading}
                className="hidden"
              />
            </div>
          ) : (
            <div className="space-y-1">
              {isUploading ? (
                <p className="text-sm text-warm-brown">
                  Завантажуємо ваше фото...
                </p>
              ) : (
                <p className="text-sm text-gray-600">
                  Клікніть на іконку камери щоб додати фото
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {uploadError && (
        <div className="p-2 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm">{uploadError}</p>
        </div>
      )}
      <p className="text-xs text-gray-500">
        📷 JPEG, PNG або WebP • максимум 5MB • автоматично завантажується в
        хмару
      </p>
    </div>
  );
};
