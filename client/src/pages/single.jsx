import React from 'react'
import img from '../images/recipe1.jpg'
import user from '../images/user.jpg'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import Menu from '../components/menu'
import RelatedProjects from '../components/menu'

const single = () => {
  return <>
    <section className="single p-5">
      <div className="container-xl">
        <div className="lg:flex justify-around">
          <div className="content basis-2/3 p-3">
            <img src={postInfo.cover} alt="post-image" className='h-[300px] w-[100%] mb-5 object-cover' />

            <div className="user flex items-center gap-3">
              <img src={user} alt="" className='w-12 h-12 rounded-full object-cover' />
              <div className="info">
                <span className=' font-medium'>@{postInfo.author.username}</span>
                <p className=' opacity-60'>Updated 10 minutes ago</p>
              </div>
              <div className="edit flex space-x-8 mt-3 px-4 items-center text-2xl">
                {userInfo.id === postInfo.author._id && (
                  <div className="edit-row">
                    <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                      </svg>
                      Edit this post
                    </Link>
                  </div>
                )}

              </div>

            </div>
            <hr className='my-2' />
            <h1 className=' font-bold max-w-lg my-2'>{postInfo.title}</h1>
            <p className=' leading-8 text-justify' dangerouslySetInnerHTML={{ __html: postInfo.content }} />
          </div>
          <div className="flex">
            <RelatedProjects currentPostId={postInfo._id} />

          </div>
        </div>
      </div>
    </section>
  </>
}

export default single