"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/components/hooks/use-toast';
import { PortfolioItem, addPost, uploadImage } from '@/lib/api';
import { formSchema, FormValues } from './types';
import ImageUploadSection from './ImageUploadSection';
import FormFields from './FormFields';
import SubmitButton from './SubmitButton';

const categories = [
  'infographic', 'branding', 'illustration', 
  'web design', 'print', 'video', 'animation'
];

const UploadForm: React.FC<{ onSuccess?: () => void }> = ({ onSuccess }) => {
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      client: '',
      videoLink: '',
      photoLink: '',
    }
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  const onSubmit = async (data: FormValues) => {
    if (!selectedImage && !data.photoLink) {
      toast({
        title: "Image required",
        description: "Please upload an image or provide a photo link",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Image handling (either upload or use provided link)
      let imageUrl = data.photoLink || '';
      
      if (selectedImage) {
        // Upload image (this is mocked in our API service)
        const imageUploadResponse = await uploadImage(selectedImage);
        imageUrl = imageUploadResponse.url;
      }
      
      // Create portfolio item - ensure all required fields are provided
      const portfolioItem: PortfolioItem = {
        title: data.title,
        description: data.description,
        category: data.category,
        client: data.client,
        image: imageUrl,
        videoLink: data.videoLink || undefined,
        photoLink: data.photoLink || undefined,
      };
      
      // Submit to API
      await addPost(portfolioItem);
      
      toast({
        title: "Success!",
        description: "Portfolio item has been added successfully",
      });
      
      // Reset form
      reset();
      setSelectedImage(null);
      setImagePreview(null);
      
      // Trigger callback
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to upload portfolio item",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg shadow-md border border-[#0F9B99]/70 p-4">
      <h2 className="text-2xl font-heading font-medium mb-4 text-white">Upload New Portfolio Item</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <FormFields 
          register={register} 
          errors={errors}
          categories={categories}
        />
        
        <ImageUploadSection 
          selectedImage={selectedImage}
          imagePreview={imagePreview}
          onImageChange={handleImageChange}
          onRemoveImage={removeImage}
        />
        
        <div>
          <SubmitButton isSubmitting={isSubmitting} />
        </div>
      </form>
    </div>
  );
};

export default UploadForm;
