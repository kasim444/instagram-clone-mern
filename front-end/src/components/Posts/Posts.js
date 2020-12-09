import React, { useEffect, useState } from 'react'
import './posts.css'
import { Post } from '../../components'
import API from '../../api'
import Pusher from 'pusher-js'

function Posts() {
  const [posts, setPosts] = useState([])

  const fetchPosts = async () => {
    await API.get('/sync').then((response) => {
      setPosts(response.data)
    })
  }

  useEffect(() => {
    const pusher = new Pusher('3804a9c7c83fd5cb3e1c', {
      cluster: 'eu',
    })
    const channel = pusher.subscribe('posts')
    channel.bind('inserted', (data) => {
      fetchPosts()
    })
  }, [])

  useEffect(() => {
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
