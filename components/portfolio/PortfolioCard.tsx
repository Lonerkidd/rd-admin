'use client'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { PortfolioItem } from '@/types';



const PortfolioCard: React.FC<{ item: PortfolioItem }> = ({ item }) => {
  const router = useRouter();
  return (
    <div
    onClick={()=>router.push(`/blogs/edit/${item.id}`)}
    className="flex flex-col bg-transparent rounded-lg shadow-sm overflow-hidden border cursor-pointer">
      <div className="h-40 bg-gray-200 relative">
        <Image
          src={item.image || '/placeholder.svg'} 
          alt={item.title} 
          width={50}
          height={50}
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
        <p className="text-sm text-gray-500 mt-1 line-clamp-3">{item.content}</p>
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

export default PortfolioCard