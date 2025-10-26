"use client";

import { CameraIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import Image from "next/image";
interface AvatarUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAvatar?: string;
  onSave: (imageURL: string | null) => void;
}

export default function AvatarUploadModal({
  isOpen,
  onClose,
  currentAvatar,
  onSave,
}: AvatarUploadModalProps) {
  const [preview, setPreview] = useState<string | null>(currentAvatar || null);
  const [imageURL, setImageURL] = useState<string>("");

  useEffect(() => {
    setPreview(currentAvatar || null);
    setImageURL("");

    return () => {
      setPreview(null);
      setImageURL("");
    };
  }, [currentAvatar]);

  const handleSave = () => {
    onSave(imageURL);
    onClose();
  };

  const handleClose = () => {
    setPreview(currentAvatar || null);
    setImageURL("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">
            Cập nhật ảnh đại diện
          </h3>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="text-center mb-6">
          <div className="relative inline-block">
            <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden mx-auto mb-4">
              {preview ? (
                <Image
                  src={preview}
                  alt="Preview"
                  layout="fill"
                  objectFit="cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#267452] to-[#1f5e42] flex items-center justify-center">
                  <CameraIcon className="w-12 h-12 text-white" />
                </div>
              )}
            </div>
          </div>

          <input
            type="text"
            placeholder="Nhập URL ảnh"
            value={imageURL}
            onChange={(e) => {
              setImageURL(e.target.value);
              setPreview(e.target.value || currentAvatar || null);
            }}
            className="p-2 text-gray-900 w-full border-b border-gray-300 focus:border-[#267452] outline-none"
          />
        </div>

        <div className="flex space-x-3">
          <button onClick={handleClose} className="btn-secondary flex-1">
            Hủy
          </button>
          <button
            onClick={handleSave}
            className="btn-primary flex-1 flex items-center justify-center"
          >
            <CheckIcon className="w-4 h-4 mr-2" />
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}
