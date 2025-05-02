"use client";
import React, { useState, useEffect } from 'react';
import { getPosts } from '@/components/lib/api';
import { useToast } from '@/components/hooks/use-toast';
import { PortfolioItem } from '@/types';
import PortfolioCard from '@/components/portfolio/PortfolioCard';


const PortfolioList: React.FC = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchPortfolioItems = async () => {
    try {
      setLoading(true);
      const data = await getPosts();
      if (data.length >= 1) {
        setPortfolioItems(data);
      }else { 
        setLoading(false)
        toast({
          title: "Empty",
          description: "No portfolio items found",
          variant: "destructive",
        });
      }
    
    } catch (error) {
      toast({
        title: "Error",
        description: error || "Failed to fetch portfolio items",
        variant: "destructive",
      });
      setLoading(false)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolioItems();
    //Cleanup 
    return () => {
     setLoading(false)
    }
  }, []); // Add empty dependency array here

  const refreshList = () => {
    fetchPortfolioItems();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-heading font-medium">Portfolio Items</h2>
        <button 
          onClick={refreshList}
          className="text-sm text-raydawn-purple hover:text-raydawn-dark-purple flex items-center"
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-raydawn-purple"></div>
        </div>
      ) : portfolioItems.length === 0 ? (
        <div className="bg-transparent rounded-lg shadow-sm p-12 text-center">
          <p className="text-white">No portfolio items found. Add your first item!</p>
        </div>
      ) : (
        <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item) => (
            <PortfolioCard key={item.id || item.title} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PortfolioList;
