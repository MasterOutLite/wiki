import React, {memo, useEffect, useState} from 'react';
import {useLocation, useParams} from 'react-router-dom';
import styles from './ArticlesItem.module.scss';

import Layout from 'src/components/Layout';
import postStore from "../../zustand_store/postStore";
import {Post, PostFull} from "../../type";
import {Paper} from "@mui/material";

function ArticlesItem() {
  const location = useLocation();
  const params = useParams();


  // eslint-disable-next-line react-hooks/rules-of-hooks
  let [post, setPost] = useState<PostFull | null>(null);

  useEffect(() => {
    const getPost = async () => {
      const postId = (parseInt(params.articleId || '0'));
      const postRes = await postStore.getState().getPostById(postId);
      setPost(postRes);
    };
    getPost().then();

  }, [params]);

  if (!post) {
    return (
      <Layout name="ArticlesItem">
        <div className={styles.notFound}>Пост із індентифікаторм "{params.articleId}" не було знайдено</div>
      </Layout>
    );
  }

  return (
    <Layout name="ArticlesItem">

      <div className={styles.postWrapper}>
        <Paper style={{padding: '20px'}}>
          <div className={styles.title}>{post?.name}</div>
          <span><span className={styles.author}>Автор поста:</span> {post.user.firstName} {post.user.lastName}</span>
        </Paper>
        <Paper style={{padding: '20px', marginTop:'20px'}}>
          <div className={styles.description} dangerouslySetInnerHTML={{__html: post?.description}}></div>
        </Paper>
      </div>

    </Layout>
  );
}

export default memo(ArticlesItem);
