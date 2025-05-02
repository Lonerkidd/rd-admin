'use client'

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { BlogFormProps } from '@/types';
import useBlogForm from '@/hooks/use-blog';


// UI Component separated from logic
export function BlogForm({ defaultValues, mode }: BlogFormProps) {
  const {
    formValues,
    isSubmitting,
    error,
    imagePreview,
    fileInputRef,
    handleChange,
    handleFileChange,
    handleFileSelect,
    handleSubmit,
    handleCancel,
  } = useBlogForm(defaultValues, mode);

  return (
    <Card className="p-4 md:p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
            {error}
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            value={formValues.title}
            onChange={handleChange}
            placeholder="Enter blog title"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="slug">Slug (optional)</Label>
            <Input
              id="slug"
              name="slug"
              value={formValues.slug}
              onChange={handleChange}
              placeholder="blog-post-slug"
              className="font-mono"
            />
            <p className="text-sm text-gray-500">
              Leave empty to auto-generate from title
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input
              id="tags"
              name="tags"
              value={formValues.tags}
              onChange={handleChange}
              placeholder="news, tutorial, announcement"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            name="content"
            value={formValues.content}
            onChange={handleChange}
            placeholder="Write your blog post content..."
            rows={10}
            required
            className="min-h-[200px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="excerpt">Excerpt (optional)</Label>
          <Textarea
            id="excerpt"
            name="excerpt"
            value={formValues.excerpt}
            onChange={handleChange}
            placeholder="Brief summary of your post"
            rows={3}
          />
          <p className="text-sm text-gray-500">
            Leave empty to auto-generate from content
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="video">Video URL (optional)</Label>
          <Input
            id="video"
            name="video"
            value={formValues.video || ''}
            onChange={handleChange}
            placeholder="https://youtube.com/watch?v=example"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">Featured Image</Label>
          <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-4">
            <div>
              <input
                ref={fileInputRef}
                type="file"
                id="image"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleFileChange}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleFileSelect}
              >
                Select Image
              </Button>
            </div>
            {imagePreview && (
              <div className="mt-4 sm:mt-0 relative w-full max-w-md h-48 rounded-md overflow-hidden">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  fill
                  className="object-cover rounded-md"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? 'Saving...' : mode === 'create' ? 'Create Blog Post' : 'Update Blog Post'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            className="w-full sm:w-1/3"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
}