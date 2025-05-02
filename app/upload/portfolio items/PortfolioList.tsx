"use client";
import React, { useState, useEffect } from 'react';
import { getPosts, PortfolioItem } from '@/components/lib/api';
import { useToast } from '@/components/hooks/use-toast';

const PortfolioCard: React.FC<{ item: PortfolioItem }> = ({ item }) => {
  return (
    <div className="flex flex-col bg-transparent rounded-lg shadow-sm overflow-hidden border">
      <div className="h-40 bg-gray-200 relative">
        <img 
          src={item.image || '/placeholder.svg'} 
          alt={item.title} 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = '/placeholder.svg';
          }}
        />
        <div className="absolute top-2 right-2">
          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-raydawn-purple text-white">
            {item.category}
          </span>
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-medium text-gray-800 text-lg line-clamp-2">{item.title}</h3>
        <p className="text-sm text-gray-500 mt-1 line-clamp-3">{item.description}</p>
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-500">Client:</p>
          <p className="text-sm font-medium">{item.client}</p>
        </div>
        {item.videoLink && (
          <div className="mt-2">
            <a 
              href={item.videoLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-raydawn-purple hover:text-raydawn-dark-purple"
            >
              View video link
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

const PortfolioList: React.FC = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchPortfolioItems = async () => {
    try {
      setLoading(true);
      const data = await getPosts();
      setPortfolioItems(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load portfolio items",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolioItems();
  }, []);

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item) => (
            <PortfolioCard key={item.id || item.title} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PortfolioList;
