'use client'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { PortfolioItem } from '@/types';
import { ExternalLink, Video, Eye } from 'lucide-react';

const PortfolioCard: React.FC<{ item: PortfolioItem }> = ({ item }) => {
  const router = useRouter();
  
  return (
    <div
      onClick={() => router.push(`/blogs/edit/${item._id}`)}
      className="flex flex-col bg-black rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200 cursor-pointer"
    >
      <div className="h-48 bg-gray-100 relative">
        <Image
          src={item.image?.toString() || '/placeholder.svg'} 
          alt={item.title} 
          fill
          className="object-cover"
          onError={(e) => {
            e.currentTarget.src = '/placeholder.svg';
          }}
        />
        <div className="absolute top-2 right-2">
          <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-raydawn-purple text-white shadow-sm">
            {item.category}
          </span>
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-semibold text-white text-lg mb-2 line-clamp-2">{item.title}</h3>
        
        <p className="text-sm text-white mb-3 line-clamp-3">
          {item.excerpt || item.content}
        </p>
        
        <div className="mt-auto">
          <div className="pt-3 border-t border-gray-200">
            <p className="text-xs text-white">Client</p>
            <p className="text-sm font-medium">{item.client}</p>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <div className="flex space-x-2">
              {item.videoLink && (
                <a 
                  href={item.videoLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center px-2 py-1  text-white rounded-md transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Video size={14} className="mr-1" />
                  Video
                </a>
              )}
              
              {item.photoLink && (
                <a 
                  href={item.photoLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={14} className="mr-1" />
                  Photos
                </a>
              )}
            </div>
            
            <button 
              className="flex items-center text-xs font-medium text-raydawn-purple hover:text-raydawn-dark-purple transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/portfolio/view/${item._id}`);
              }}
            >
              <Eye size={14} className="mr-1" />
              View details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard