import React, { useEffect, useState } from 'react'
import './posts.css'
import { Post } from '../../components'
import API from '../../api'

function Posts() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      await API.get('/sync').then(response => {
        setPosts(response.data)
      })
    }
    fetchPosts()
  }, [])

  return (
    <div className='posts'>
      {posts.map((post) => (
        <Post
          key={post._id}
          postId={post._id}
          username={post.user}
          caption={post.caption}
          imageUrl={post.image}
        />
      ))}
    </div>
  )
}

export default Posts
