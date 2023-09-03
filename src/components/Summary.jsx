import { useState, useEffect } from 'react';
import {copy, linkIcon, loader, tick} from '../assets';
import { useLazyGetSummaryQuery } from '../utils/article';

const Summary = () => {
const [article, setArticle] = useState({
  url: '',
  summary:'',
});

const [savedArticles, setSavedArticles] = useState([]);

const [ getSummary, {error, isFetching} ] = useLazyGetSummaryQuery();

useEffect(()=>{
  const articlesFromLocalStorage = JSON.parse(localStorage.getItem("article"));

  if(articlesFromLocalStorage){
    setSavedArticles(articlesFromLocalStorage)
  }
}, []);

const handleSubmit = async (e)=>{
  e.preventDefault();
  const {data} = await getSummary({articleUrl: article.url});

  if(data?.summary){
    const newArticle = { ...article, summary: data.summary};
    const updateSavedArticles = [newArticle, ...savedArticles]
    setArticle(newArticle);
    setSavedArticles(updateSavedArticles);
    localStorage.setItem("article", JSON.stringify(updateSavedArticles));
  }
}

const [copied, setCopied] = useState("");
const handleCopy = (copyUrl) => {
  setCopied(copyUrl);
  navigator.clipboard.writeText(copyUrl);
  setTimeout(() => setCopied(false), 3000);
};

  return (
    <section className='w-full max-w-xl mt-16'>
        <div className='w-full flex flex-col gap-2'>
          <form className='relative flex justify-center items-center' onSubmit={handleSubmit}>

            <img className='absolute left-0 my-2 ml-3 w-5 opacity-60' src={linkIcon} />
            <input 
              className='url_input peer'
              type="url" placeholder='Enter A URL'
              value={article.url}
              onChange={(e) => setArticle({...article, url: e.target.value})}
              required
              />
              <button 
              className='submit_btn'
              type='submit'>
               <img 
               className='peer hover:scale-110 hover:opacity-50'
                width="32" height="32" src="https://img.icons8.com/puffy/32/experimental-enter-2-puffy.png" alt="experimental-enter-2-puffy"/> 
              </button>
          </form>
            {/* {URL History here} */}
            <div className='flex flex-col gap-2 max-h-40 overflow-y-auto'>
                {savedArticles.reverse().map((item, index) => (
                  <div key={'link-${index}'}
                  onclick={()=> setArticle(item)}
                  className='link_card'
                  >
                    <div className='copy_btn' onClick={() => handleCopy(item.url)}>
                      <img  src={copied === item.url ? tick : copy} alt="copy_link" className='w-[40%] h-[40%] object-contain' />

                    </div>
                      <p className='flex-1 font-ubuntu text-blue-700 font-normal text-sm truncate'>
                        {item.url}
                      </p>
                  </div>
                ))}
            </div>
        </div>
        <div className='my-10 max-w-full flex justify-center items-center'>
                  { isFetching ?
                  (
                    <img src={loader} className='w-20 h-20 object-contain'/>
                  ) : error ? (
                    <p className='text-center font-ubuntu text-white text-center'>
                      Oops!, something went wrong...
                      <br />
                      <span className='font-inter font-thin text-gray-300'>
                        {error?.data?.error}
                      </span>

                    </p>
                  ) : 
                    (
                      article.summary && (
                        <div className='flex flex-col gap-4'>
                          <h2 className='font-ubuntu blue_gradient text-center text-bold text-xl'>We've summerzied your content!</h2>
                          <div className='summary_box'>
                            <p className='font-inter text-white text-thin text-sm'>
                              {article.summary}
                            </p>
                          </div>
                        </div>
                      )
                    )
                }
        </div>
    </section>
  )
}

export default Summary