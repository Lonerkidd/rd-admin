import { PortfolioItem } from "@/types";


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

