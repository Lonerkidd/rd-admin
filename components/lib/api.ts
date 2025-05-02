
export interface PortfolioItem {
  id?: string;
  title: string;
  description: string;
  image: string;
  category: string;
  client: string;
  videoLink?: string;
  photoLink?: string;
}

// Function to get all portfolio posts
export async function getPosts(): Promise<PortfolioItem[]> {
  try {
    const response = await fetch('/api/getPosts');
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}

// Function to add a new portfolio post
export async function addPost(postData: PortfolioItem): Promise<PortfolioItem> {
  try {
    const response = await fetch('/api/addPost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error adding post:', error);
    throw error;
  }
}

// Mock function to simulate image upload (since we're just building the frontend)
export async function uploadImage(file: File): Promise<{ url: string }> {
  // In a real implementation, this would upload to a server or cloud storage
  return new Promise((resolve) => {
    setTimeout(() => {
      // Create a fake URL for the uploaded image
      const url = `/images/${file.name}`;
      resolve({ url });
    }, 1000);
  });
}
